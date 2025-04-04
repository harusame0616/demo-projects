"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
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
import {
	ArrowDownIcon,
	ArrowUpIcon,
	FileTextIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { MonthlyAttendanceSummary } from "../_actions/attendance-actions";
import {
	type SortField,
	minutesToHoursMinutes,
} from "../_actions/attendance-actions";

// AttendanceStatusを型として定義
type AttendanceStatus =
	| "normal"
	| "late"
	| "early_departure"
	| "absent"
	| "paid_leave"
	| "holiday";

// 勤怠ステータスに対応するバッジを返す
const _getStatusBadge = (status: AttendanceStatus) => {
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
const _formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "short",
	}).format(date);
};

// 年月表示用フォーマット
const _formatYearMonth = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
	}).format(date);
};

interface AttendanceTableProps {
	attendances: MonthlyAttendanceSummary[];
	totalPages: number;
	page: number;
}

export function AttendanceTable({
	attendances,
	totalPages,
	page,
}: AttendanceTableProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	// 現在のソート状態
	const currentSort = (searchParams.get("sort") as SortField) || "yearMonth";
	const currentOrder = searchParams.get("order") || "desc";

	// 従業員詳細ページへ移動
	const navigateToEmployeeDetail = (employeeId: string) => {
		router.push(`/admin/employees/${employeeId}`);
	};

	// ソート処理
	const handleSort = (column: SortField) => {
		const params = new URLSearchParams(searchParams.toString());

		// 同じカラムをクリックした場合は、昇順・降順を切り替え
		if (currentSort === column) {
			params.set("order", currentOrder === "asc" ? "desc" : "asc");
		} else {
			// 異なるカラムの場合は、そのカラムの昇順でソート
			params.set("sort", String(column));
			params.set("order", "asc");
		}

		// ページを1に戻す
		params.set("page", "1");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// ソートアイコンを取得
	const getSortIcon = (column: SortField) => {
		if (currentSort !== column) return null;

		return currentOrder === "asc" ? (
			<ArrowUpIcon className="ml-1 h-4 w-4" />
		) : (
			<ArrowDownIcon className="ml-1 h-4 w-4" />
		);
	};

	return (
		<div className="space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap"
								onClick={() => handleSort("employeeId")}
							>
								<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
									従業員コード {getSortIcon("employeeId")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap"
								onClick={() => handleSort("employeeName")}
							>
								<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
									名前 {getSortIcon("employeeName")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap"
								onClick={() => handleSort("departmentName")}
							>
								<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
									部署 {getSortIcon("departmentName")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap"
								onClick={() => handleSort("yearMonth")}
							>
								<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
									年月 {getSortIcon("yearMonth")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap text-right"
								onClick={() => handleSort("workdays")}
							>
								<div className="flex items-center justify-end whitespace-nowrap text-xs font-medium gap-1">
									出勤日数 {getSortIcon("workdays")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap text-right"
								onClick={() => handleSort("totalWorkingHours")}
							>
								<div className="flex items-center justify-end whitespace-nowrap text-xs font-medium gap-1">
									合計勤務時間 {getSortIcon("totalWorkingHours")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap text-right"
								onClick={() => handleSort("totalOvertimeHours")}
							>
								<div className="flex items-center justify-end whitespace-nowrap text-xs font-medium gap-1">
									合計残業時間 {getSortIcon("totalOvertimeHours")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap text-right"
								onClick={() => handleSort("absences")}
							>
								<div className="flex items-center justify-end whitespace-nowrap text-xs font-medium gap-1">
									欠勤 {getSortIcon("absences")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap text-right"
								onClick={() => handleSort("lateCount")}
							>
								<div className="flex items-center justify-end whitespace-nowrap text-xs font-medium gap-1">
									遅刻 {getSortIcon("lateCount")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap text-right"
								onClick={() => handleSort("earlyDepartureCount")}
							>
								<div className="flex items-center justify-end whitespace-nowrap text-xs font-medium gap-1">
									早退 {getSortIcon("earlyDepartureCount")}
								</div>
							</TableHead>
							<TableHead
								className="cursor-pointer hover:bg-gray-50 whitespace-nowrap text-right"
								onClick={() => handleSort("paidLeaveCount")}
							>
								<div className="flex items-center justify-end whitespace-nowrap text-xs font-medium gap-1">
									有給 {getSortIcon("paidLeaveCount")}
								</div>
							</TableHead>
							<TableHead className="text-center whitespace-nowrap">
								<div className="flex items-center justify-center whitespace-nowrap text-xs font-medium">
									アクション
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{attendances.length > 0 ? (
							attendances.map((summary) => (
								<TableRow key={`${summary.employeeId}_${summary.yearMonth}`}>
									<TableCell>
										<Link
											href={`/admin/employees/${summary.employeeId}/attendances`}
											className="underline"
										>
											{summary.employeeId}
										</Link>
									</TableCell>
									<TableCell>{summary.employeeName}</TableCell>
									<TableCell>{summary.departmentName}</TableCell>
									<TableCell>{summary.yearMonthDisplay}</TableCell>
									<TableCell className="text-right">
										{summary.workdays}日
									</TableCell>
									<TableCell className="text-right">
										{minutesToHoursMinutes(summary.totalWorkingHours)}
									</TableCell>
									<TableCell className="text-right">
										{minutesToHoursMinutes(summary.totalOvertimeHours)}
									</TableCell>
									<TableCell className="text-right">
										{summary.absences}回
									</TableCell>
									<TableCell className="text-right">
										{summary.lateCount}回
									</TableCell>
									<TableCell className="text-right">
										{summary.earlyDepartureCount}回
									</TableCell>
									<TableCell className="text-right">
										{summary.paidLeaveCount}回
									</TableCell>
									<TableCell className="text-center">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="h-8 w-8 p-0"
													aria-label="操作メニュー"
												>
													<MoreHorizontalIcon className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() => {
														setSelectedEmployee(
															`${summary.employeeId}-${summary.yearMonth}`,
														);
														setIsDetailsOpen(true);
													}}
												>
													<FileTextIcon className="mr-2 h-4 w-4" />
													詳細を表示
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														navigateToEmployeeDetail(summary.employeeId)
													}
												>
													従業員情報を表示
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={12} className="text-center py-4">
									該当するデータがありません
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* ページネーション */}
			{totalPages > 1 && (
				<div className="flex justify-center mt-4">
					<PaginationNav currentPage={page} totalPages={totalPages} />
				</div>
			)}

			{/* 詳細ダイアログ */}
			<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>勤怠詳細</DialogTitle>
						<DialogDescription>勤怠情報の詳細データです。</DialogDescription>
					</DialogHeader>
					{selectedEmployee && (
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>従業員ID</Label>
								<p className="text-sm">{selectedEmployee.split("-")[0]}</p>
							</div>
							<div>
								<Label>従業員名</Label>
								<p className="text-sm">
									{
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.employeeName
									}
								</p>
							</div>
							<div>
								<Label>部署</Label>
								<p className="text-sm">
									{
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.departmentName
									}
								</p>
							</div>
							<div>
								<Label>出勤日数</Label>
								<p className="text-sm">
									{
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.workdays
									}
									日
								</p>
							</div>
							<div>
								<Label>合計勤務時間</Label>
								<p className="text-sm">
									{minutesToHoursMinutes(
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.totalWorkingHours || 0,
									)}
								</p>
							</div>
							<div>
								<Label>合計残業時間</Label>
								<p className="text-sm">
									{minutesToHoursMinutes(
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.totalOvertimeHours || 0,
									)}
								</p>
							</div>
							<div>
								<Label>欠勤回数</Label>
								<p className="text-sm">
									{
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.absences
									}
									回
								</p>
							</div>
							<div>
								<Label>遅刻回数</Label>
								<p className="text-sm">
									{
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.lateCount
									}
									回
								</p>
							</div>
							<div>
								<Label>早退回数</Label>
								<p className="text-sm">
									{
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.earlyDepartureCount
									}
									回
								</p>
							</div>
							<div>
								<Label>有給休暇取得回数</Label>
								<p className="text-sm">
									{
										attendances.find(
											(summary) =>
												`${summary.employeeId}-${summary.yearMonth}` ===
												selectedEmployee,
										)?.paidLeaveCount
									}
									回
								</p>
							</div>
						</div>
					)}
					<DialogFooter className="sm:justify-end">
						<Button
							type="button"
							variant="secondary"
							onClick={() => setIsDetailsOpen(false)}
						>
							閉じる
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
