import {
	type Employee,
	getEmployeeWithDefaults,
	mockEmployees,
} from "@/app/_mocks/employees";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getEmployeeAttendanceSummary } from "./_actions/employee-attendance-actions";
import { EmployeeAttendanceSummary } from "./_components/employee-attendance-summary";

export const metadata: Metadata = {
	title: "従業員勤怠情報 | 人材管理システム",
	description: "従業員の勤怠情報を表示します",
};

export default async function EmployeeAttendancePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	// 従業員情報を取得
	const employee = mockEmployees.find((emp) => emp.id === id);

	if (!employee) {
		notFound();
	}

	// デフォルト値を含む従業員情報を取得
	const employeeWithDefaults = getEmployeeWithDefaults(employee);

	// 勤怠情報を取得
	const attendanceSummary = await getEmployeeAttendanceSummary(id);

	// 勤怠情報がない場合の処理
	if (!attendanceSummary) {
		return (
			<div className="p-6 text-center border rounded-md">
				<p className="text-muted-foreground">
					{employee.name}さんの勤怠データが見つかりませんでした。
				</p>
			</div>
		);
	}

	return (
		<Suspense fallback={<div>読み込み中...</div>}>
			<EmployeeAttendanceSummary
				data={attendanceSummary}
				employee={employeeWithDefaults}
			/>
		</Suspense>
	);
}
