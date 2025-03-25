"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AttendanceStatus } from "../../../../attendances/_data/attendances-data";
import {
	formatWorkingHours,
	type EmployeeAttendanceSummary as EmployeeAttendanceSummaryType,
	type MonthlyAttendanceSummary,
} from "../_actions/employee-attendance-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Employeeインターフェースをローカルで定義
interface Employee {
	id: string;
	name: string;
	department: string;
	position: string;
	email?: string;
	joinDate?: string;
}

// 月名を取得する関数
function getMonthName(month: number): string {
	return new Intl.DateTimeFormat("ja-JP", { month: "long" }).format(
		new Date(2000, month - 1, 1),
	);
}

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

interface EmployeeAttendanceSummaryProps {
	data: EmployeeAttendanceSummaryType;
	employee: Employee;
}

export function EmployeeAttendanceSummary({
	data,
	employee,
}: EmployeeAttendanceSummaryProps) {
	const router = useRouter();
	const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

	if (data.monthlyData.length === 0) {
		return (
			<div className="text-center p-8">
				<p>勤怠データが見つかりません</p>
			</div>
		);
	}

	const selectedMonth = data.monthlyData[selectedMonthIndex];

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-muted/50 rounded-lg">
				<div className="flex-1">
					<Select
						value={selectedMonthIndex.toString()}
						onValueChange={(value) => setSelectedMonthIndex(Number(value))}
					>
						<SelectTrigger className="w-full md:w-[250px]">
							<SelectValue placeholder="月を選択" />
						</SelectTrigger>
						<SelectContent>
							{data.monthlyData.map((month, index) => (
								<SelectItem
									key={`month-${month.year}-${month.month}`}
									value={index.toString()}
								>
									{month.year}年{getMonthName(month.month)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">出勤日数</CardTitle>
						<CardDescription>当月の出勤状況</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold mb-4">
							{selectedMonth.totalWorkDays}日
						</div>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>通常: {selectedMonth.normalDays}日</div>
							<div>遅刻: {selectedMonth.lateDays}日</div>
							<div>早退: {selectedMonth.earlyDepartureDays}日</div>
							<div>休日: {selectedMonth.holidayDays}日</div>
							<div>有給: {selectedMonth.paidLeaveDays}日</div>
							<div>欠勤: {selectedMonth.absentDays}日</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">総労働時間</CardTitle>
						<CardDescription>当月の勤務時間</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold mb-4">
							{formatWorkingHours(selectedMonth.totalWorkingHours)}
						</div>
						<div className="text-sm">
							1日平均:{" "}
							{selectedMonth.totalWorkDays > 0
								? formatWorkingHours(
										Math.round(
											selectedMonth.totalWorkingHours /
												selectedMonth.totalWorkDays,
										),
									)
								: "0分"}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-lg">残業時間</CardTitle>
						<CardDescription>当月の超過勤務</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-4xl font-bold mb-4">
							{formatWorkingHours(selectedMonth.totalOvertimeHours)}
						</div>
						<div className="text-sm">
							1日平均:{" "}
							{selectedMonth.normalDays > 0
								? formatWorkingHours(
										Math.round(
											selectedMonth.totalOvertimeHours /
												selectedMonth.normalDays,
										),
									)
								: "0分"}
						</div>
					</CardContent>
				</Card>
			</div>

			{selectedMonth.attendances.length > 0 && (
				<div className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>当月の勤怠詳細</CardTitle>
							<CardDescription>
								{selectedMonth.year}年{getMonthName(selectedMonth.month)}
								の勤怠記録
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-[120px]">日付</TableHead>
											<TableHead className="w-[100px]">状態</TableHead>
											<TableHead className="w-[90px]">出勤</TableHead>
											<TableHead className="w-[90px]">退勤</TableHead>
											<TableHead className="w-[100px]">勤務時間</TableHead>
											<TableHead className="w-[80px]">残業</TableHead>
											<TableHead className="min-w-[150px]">備考</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{selectedMonth.attendances.map((attendance) => (
											<TableRow key={attendance.id}>
												<TableCell className="font-medium">
													{new Intl.DateTimeFormat("ja-JP", {
														month: "numeric",
														day: "numeric",
														weekday: "short",
													}).format(new Date(attendance.date))}
												</TableCell>
												<TableCell>
													{getStatusBadge(attendance.status)}
												</TableCell>
												<TableCell>{attendance.clockIn || "-"}</TableCell>
												<TableCell>{attendance.clockOut || "-"}</TableCell>
												<TableCell>
													{attendance.workingHours > 0
														? formatWorkingHours(attendance.workingHours)
														: "-"}
												</TableCell>
												<TableCell>
													{attendance.overtimeHours > 0
														? formatWorkingHours(attendance.overtimeHours)
														: "-"}
												</TableCell>
												<TableCell className="max-w-[200px]">
													<div className="truncate">
														{attendance.remarks || "-"}
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
