import {
	type Employee,
	getEmployeeWithDefaults,
	mockEmployees,
} from "@/app/_mocks/employees";
import { ContactInfoCard } from "./_components";

export const metadata = {
	title: "従業員詳細 | 人材管理システム",
	description: "従業員の基本情報",
};

export default async function EmployeeInfoPage({
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
		<ContactInfoCard
			employeeId={employee.id}
			contactInfo={{
				email: employeeWithDefaults.email,
				phone: employeeWithDefaults.phone || "",
				address: employeeWithDefaults.address || "",
				birthDate: employeeWithDefaults.birthDate || "",
			}}
		/>
	);
}
