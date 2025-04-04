import { getEmployeeWithDefaults, mockEmployees } from "@/app/_mocks/employees";
import { SkillsAndCertificationsCard } from "../_components";

export const metadata = {
	title: "従業員スキル・資格 | 人材管理システム",
	description: "従業員のスキルと資格情報",
};

export default async function EmployeeSkillsPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	// モックデータから従業員基本情報を取得
	const employee = mockEmployees.find((emp) => emp.id === id);

	if (!employee) {
		return null; // レイアウトで処理するので、ここではnullを返す
	}

	// デフォルト値を含む従業員情報を取得
	const employeeWithDefaults = getEmployeeWithDefaults(employee);

	return (
		<SkillsAndCertificationsCard
			employeeId={employee.id}
			skills={employeeWithDefaults.skills || []}
			certifications={employeeWithDefaults.certifications || []}
		/>
	);
}
