import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, User, CalendarDays } from "lucide-react";
import Link from "next/link";
import {
	ContactInfoCard,
	EvaluationHistoryCard,
	GoalsCard,
	SkillsAndCertificationsCard,
} from "./_components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { getEmployeeAttendanceSummary } from "./attendances/_actions/employee-attendance-actions";
import { EmployeeAttendanceSummary } from "./attendances/_components/employee-attendance-summary";
import {
	mockEmployees,
	getEmployeeWithDefaults,
	type Employee,
} from "@/app/_mocks/employees";

export const metadata = {
	title: "従業員詳細 | 人材管理システム",
	description: "従業員の詳細情報",
};

// 従業員情報タブの内容を表示するコンポーネント
function EmployeeInfoTab({ employee }: { employee: Employee }) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
				<ContactInfoCard
					contactInfo={{
						email: employee.email,
						phone: employee.phone || "",
						address: employee.address || "",
						birthDate: employee.birthDate || "",
					}}
				/>

				<SkillsAndCertificationsCard
					skills={employee.skills || []}
					certifications={employee.certifications || []}
				/>
			</div>

			<div className="space-y-6">
				{employee.evaluations && employee.evaluations.length > 0 && (
					<EvaluationHistoryCard evaluations={employee.evaluations} />
				)}

				{employee.goals && employee.goals.length > 0 && (
					<GoalsCard goals={employee.goals} />
				)}
			</div>
		</div>
	);
}

// 勤怠情報タブの内容を表示するコンポーネント
async function AttendanceInfoTab({ employee }: { employee: Employee }) {
	// 勤怠データを取得
	const attendanceSummary = await getEmployeeAttendanceSummary(employee.id);

	return (
		<div className="space-y-6">
			<Suspense fallback={<div>読み込み中...</div>}>
				{attendanceSummary ? (
					<EmployeeAttendanceSummary
						data={attendanceSummary}
						employee={employee}
					/>
				) : (
					<div className="text-center p-8">
						<p>勤怠データが見つかりません</p>
					</div>
				)}
			</Suspense>
		</div>
	);
}

export default function EmployeeInfoPage({
	params,
}: { params: { id: string } }) {
	// モックデータから従業員基本情報を取得
	const employee = mockEmployees.find((emp) => emp.id === params.id);

	if (!employee) {
		return null; // レイアウトで処理するので、ここではnullを返す
	}

	// デフォルト値を含む従業員情報を取得
	const employeeWithDefaults = getEmployeeWithDefaults(employee);

	return <EmployeeInfoTab employee={employeeWithDefaults} />;
}
