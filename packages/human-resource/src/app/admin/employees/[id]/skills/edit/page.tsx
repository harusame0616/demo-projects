import {
	type Employee,
	getEmployeeWithDefaults,
	mockEmployees,
} from "@/app/_mocks/employees";
import { notFound } from "next/navigation";
import { SkillsForm } from "../_components/skills-form";

export const metadata = {
	title: "スキル・資格編集 | 人材管理システム",
	description: "従業員のスキルと資格情報を編集します",
};

export default async function EmployeeSkillsEditPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	// モックデータから従業員基本情報を取得
	const employee = mockEmployees.find((emp) => emp.id === id);

	if (!employee) {
		notFound();
	}

	// デフォルト値を含む従業員情報を取得
	const employeeWithDefaults = getEmployeeWithDefaults(employee);

	return (
		<SkillsForm
			employeeId={employee.id}
			initialSkills={employeeWithDefaults.skills || []}
			initialCertifications={employeeWithDefaults.certifications || []}
		/>
	);
}
