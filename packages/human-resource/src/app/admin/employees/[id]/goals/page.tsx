import { GoalsCard } from "../_components";
import {
	mockEmployees,
	getEmployeeWithDefaults,
	type Employee,
} from "@/app/_mocks/employees";

export const metadata = {
	title: "従業員目標 | 人材管理システム",
	description: "従業員の目標情報",
};

export default async function EmployeeGoalsPage({
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
		<>
			{employeeWithDefaults.goals && employeeWithDefaults.goals.length > 0 ? (
				<GoalsCard goals={employeeWithDefaults.goals} />
			) : (
				<div className="text-center p-8 border rounded-md">
					<p>目標データがありません</p>
				</div>
			)}
		</>
	);
}
