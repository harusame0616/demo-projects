import { SkillsForm } from "../_components/skills-form";
import {
	mockEmployees,
	getEmployeeWithDefaults,
	type Employee,
} from "@/app/_mocks/employees";
import { notFound } from "next/navigation";

export const metadata = {
	title: "スキル・資格編集 | 人材管理システム",
	description: "従業員のスキルと資格情報を編集します",
};

export default function EmployeeSkillsEditPage({
	params,
}: { params: { id: string } }) {
	// モックデータから従業員基本情報を取得
	const employee = mockEmployees.find((emp) => emp.id === params.id);

	if (!employee) {
		notFound();
	}

	// デフォルト値を含む従業員情報を取得
	const employeeWithDefaults = getEmployeeWithDefaults(employee);

	return (
		<SkillsForm
			employeeId={employee.id}
			employeeName={employee.name}
			initialSkills={employeeWithDefaults.skills || []}
			initialCertifications={employeeWithDefaults.certifications || []}
		/>
	);
}
