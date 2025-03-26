import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getEmployeeAttendanceSummary } from "./_actions/employee-attendance-actions";
import { EmployeeAttendanceSummary } from "./_components/employee-attendance-summary";
import { notFound } from "next/navigation";
import { mockEmployees, type Employee } from "@/app/_mocks/employees";

export const metadata: Metadata = {
	title: "従業員勤怠情報",
	description: "従業員の勤怠情報を表示します",
};

interface EmployeeAttendancePageProps {
	params: {
		id: string;
	};
}

export default async function EmployeeAttendancePage({
	params,
}: EmployeeAttendancePageProps) {
	// 従業員情報を取得
	const employeeId = params.id;
	const employee = mockEmployees.find((emp) => emp.id === employeeId);

	if (!employee) {
		notFound();
	}

	// 勤怠情報を取得
	const attendanceSummary = await getEmployeeAttendanceSummary(employeeId);

	// 勤怠情報がない場合の処理
	if (!attendanceSummary) {
		return (
			<div className="p-6 text-center">
				<h2 className="text-xl font-semibold mb-4">勤怠データなし</h2>
				<p className="text-gray-600">
					{employee.name}さんの勤怠データが見つかりませんでした。
				</p>
			</div>
		);
	}

	return (
		<Suspense fallback={<div>読み込み中...</div>}>
			<EmployeeAttendanceSummary data={attendanceSummary} employee={employee} />
		</Suspense>
	);
}
