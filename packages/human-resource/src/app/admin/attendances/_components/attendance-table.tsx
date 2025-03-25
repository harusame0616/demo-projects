"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FileTextIcon, MoreHorizontalIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { PaginationNav } from "@/components/common/pagination-nav";
import {
	type Attendance,
	type AttendanceStatus,
} from "../_data/attendances-data";
import {
	getAttendanceStatusName,
	minutesToHoursMinutes,
	type AttendanceSearchParams,
} from "../_actions/attendance-actions";

// 勤怠ステータスに対応するバッジを返す
const getStatusBadge = (status: AttendanceStatus) => {
	switch (status) {
		case "normal":
			return (
				<Badge
					variant="outline"
					className="bg-green-50 text-green-700 border-green-200"
				>
					通常
				</Badge>
			);
		case "late":
			return (
				<Badge
					variant="outline"
					className="bg-yellow-50 text-yellow-700 border-yellow-200"
				>
					遅刻
				</Badge>
			);
		case "early_departure":
			return (
				<Badge
					variant="outline"
					className="bg-orange-50 text-orange-700 border-orange-200"
				>
					早退
				</Badge>
			);
		case "absent":
			return (
				<Badge
					variant="outline"
					className="bg-red-50 text-red-700 border-red-200"
				>
					欠勤
				</Badge>
			);
		case "holiday":
			return (
				<Badge
					variant="outline"
					className="bg-blue-50 text-blue-700 border-blue-200"
				>
					休日
				</Badge>
			);
		case "paid_leave":
			return (
				<Badge
					variant="outline"
					className="bg-purple-50 text-purple-700 border-purple-200"
				>
					有給休暇
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

// 日付フォーマット
const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "short",
	}).format(date);
};

// 年月表示用フォーマット
const formatYearMonth = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
	}).format(date);
};

interface AttendanceTableProps {
	attendances: Attendance[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	searchParams: AttendanceSearchParams;
}

// 月次集計データの型定義
interface MonthlyAttendanceSummary {
	employeeId: string;
	employeeName: string;
	yearMonth: string; // YYYY-MM
	yearMonthDisplay: string; // 表示用の年月
	workdays: number; // 出勤日数
	totalWorkingHours: number; // 合計勤務時間（分）
	totalOvertimeHours: number; // 合計残業時間（分）
	absences: number; // 欠勤回数
	lateCount: number; // 遅刻回数
	earlyDepartureCount: number; // 早退回数
	paidLeaveCount: number; // 有給休暇回数
}

export function AttendanceTable({
	attendances,
	pagination,
	searchParams,
}: AttendanceTableProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	// 月次集計データを生成
	const monthlySummaries = useMemo(() => {
		// 月ごとに従業員ごとにデータをグループ化
		type GroupedDataType = {
			employeeId: string;
			employeeName: string;
			yearMonth: string;
			attendances: Attendance[];
		};

		const groupedData: Record<string, GroupedDataType> = {};

		// 勤怠データを月ごと、従業員ごとにグループ化
		for (const attendance of attendances) {
			// YYYY-MM-DD から YYYY-MM を抽出
			const yearMonth = attendance.date.substring(0, 7);
			const key = `${attendance.employeeId}_${yearMonth}`;

			if (!groupedData[key]) {
				groupedData[key] = {
					employeeId: attendance.employeeId,
					employeeName: attendance.employeeName,
					yearMonth: yearMonth,
					attendances: [],
				};
			}

			groupedData[key].attendances.push(attendance);
		}

		// グループ化されたデータから月次集計を計算
		return Object.values(groupedData)
			.map((group) => {
				const yearMonth = group.yearMonth;
				const employeeId = group.employeeId;
				const employeeName = group.employeeName;
				const attendanceList = group.attendances;

				let workdays = 0;
				let totalWorkingHours = 0;
				let totalOvertimeHours = 0;
				let absences = 0;
				let lateCount = 0;
				let earlyDepartureCount = 0;
				let paidLeaveCount = 0;

				// 各勤怠データを集計
				for (const attendance of attendanceList) {
					// 休日以外の場合にカウント
					if (attendance.status !== "holiday") {
						if (attendance.status === "normal") {
							workdays++;
						} else if (attendance.status === "late") {
							workdays++;
							lateCount++;
						} else if (attendance.status === "early_departure") {
							workdays++;
							earlyDepartureCount++;
						} else if (attendance.status === "absent") {
							absences++;
						} else if (attendance.status === "paid_leave") {
							paidLeaveCount++;
						}

						totalWorkingHours += attendance.workingHours;
						totalOvertimeHours += attendance.overtimeHours;
					}
				}

				// 月次集計データを返す
				return {
					employeeId,
					employeeName,
					yearMonth,
					yearMonthDisplay: formatYearMonth(`${yearMonth}-01`),
					workdays,
					totalWorkingHours,
					totalOvertimeHours,
					absences,
					lateCount,
					earlyDepartureCount,
					paidLeaveCount,
				};
			})
			.sort((a, b) => b.yearMonth.localeCompare(a.yearMonth)); // 新しい月順にソート
	}, [attendances]);

	// ページ切り替え
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(
			searchParams as unknown as Record<string, string>,
		);
		params.set("page", page.toString());
		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// 従業員詳細ページへ移動
	const navigateToEmployeeDetail = (employeeId: string) => {
		router.push(`/admin/employees/${employeeId}`);
	};

	return (
		<div className="space-y-4 w-full">
			{/* 月次集計情報リスト */}
			<div className="w-full overflow-auto">
				<div className="min-w-full rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">年月</TableHead>
								<TableHead className="w-[150px]">従業員</TableHead>
								<TableHead className="w-[80px]">出勤日数</TableHead>
								<TableHead className="w-[100px]">総勤務時間</TableHead>
								<TableHead className="w-[80px]">総残業時間</TableHead>
								<TableHead className="w-[60px]">欠勤</TableHead>
								<TableHead className="w-[60px]">遅刻</TableHead>
								<TableHead className="w-[60px]">早退</TableHead>
								<TableHead className="w-[80px]">有給休暇</TableHead>
								<TableHead className="w-[80px] text-right">操作</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{monthlySummaries.length === 0 ? (
								<TableRow>
									<TableCell colSpan={10} className="h-24 text-center">
										該当する月次勤怠情報はありません
									</TableCell>
								</TableRow>
							) : (
								monthlySummaries.map((summary, index) => (
									<TableRow key={`${summary.employeeId}_${summary.yearMonth}`}>
										<TableCell className="font-medium whitespace-nowrap">
											{summary.yearMonthDisplay}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{summary.employeeName}
											<br />
											<span className="text-xs text-gray-500">
												ID: {summary.employeeId}
											</span>
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{summary.workdays}日
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{minutesToHoursMinutes(summary.totalWorkingHours)}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{minutesToHoursMinutes(summary.totalOvertimeHours)}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{summary.absences > 0 ? (
												<Badge variant="destructive">
													{summary.absences}回
												</Badge>
											) : (
												"0回"
											)}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{summary.lateCount > 0 ? (
												<Badge
													variant="outline"
													className="bg-yellow-50 text-yellow-700 border-yellow-200"
												>
													{summary.lateCount}回
												</Badge>
											) : (
												"0回"
											)}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{summary.earlyDepartureCount > 0 ? (
												<Badge
													variant="outline"
													className="bg-orange-50 text-orange-700 border-orange-200"
												>
													{summary.earlyDepartureCount}回
												</Badge>
											) : (
												"0回"
											)}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{summary.paidLeaveCount > 0 ? (
												<Badge
													variant="outline"
													className="bg-purple-50 text-purple-700 border-purple-200"
												>
													{summary.paidLeaveCount}回
												</Badge>
											) : (
												"0回"
											)}
										</TableCell>
										<TableCell className="text-right whitespace-nowrap">
											<Button
												variant="ghost"
												size="icon"
												onClick={() =>
													navigateToEmployeeDetail(summary.employeeId)
												}
											>
												<FileTextIcon className="h-4 w-4" />
												<span className="sr-only">従業員詳細</span>
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* ページネーション */}
			{monthlySummaries.length > 0 && pagination.totalPages > 1 && (
				<div className="flex justify-center mt-6">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}
