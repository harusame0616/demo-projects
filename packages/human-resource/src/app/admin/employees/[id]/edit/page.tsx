import { getEmployeeWithDefaults, mockEmployees } from "@/app/_mocks/employees";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getDepartments, getPositions } from "../../_actions/employee-actions";
import { EmployeeFormWrapper } from "./_components/employee-form-wrapper";

export const metadata: Metadata = {
	title: "従業員編集 | 人材管理システム",
	description: "従業員情報の編集",
};

// フォーム用の型定義（EmployeeFormWrapperが期待する形式）
interface FormEmployee {
	id: string;
	name: string;
	nameKana: string;
	email: string;
	phone: string;
	address: string;
	department: string;
	position: string;
	grade: string;
	birthDate: string;
	joinDate: string;
	skills?: string[];
	certifications?: string[];
}

export default async function EmployeeEditPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	// モックデータから従業員基本情報を取得
	const employee = mockEmployees.find((emp) => emp.id === id);

	// 部署と役職のオプションを取得
	const departmentOptions = await getDepartments();
	const positionOptions = await getPositions();

	if (!employee) {
		return (
			<div className="flex flex-col items-center justify-center h-96">
				<h2 className="text-2xl font-bold mb-4">従業員が見つかりません</h2>
				<Button asChild>
					<Link href="/admin/employees">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						従業員一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	// デフォルト値を含む従業員情報を取得
	const employeeWithDefaults = getEmployeeWithDefaults(employee);

	// フォームに渡す従業員データを構築
	const formEmployee: FormEmployee = {
		id: employeeWithDefaults.id,
		name: employeeWithDefaults.name,
		nameKana: employeeWithDefaults.nameKana || "",
		email: employeeWithDefaults.email,
		phone: employeeWithDefaults.phone || "",
		address: employeeWithDefaults.address || "",
		department: employeeWithDefaults.department,
		position: employeeWithDefaults.position,
		grade: employeeWithDefaults.grade || "",
		birthDate: employeeWithDefaults.birthDate || "",
		joinDate: employeeWithDefaults.joinDate,
		skills: employeeWithDefaults.skills || [],
		certifications: employeeWithDefaults.certifications || [],
	};

	return (
		<>
			<PageHeader title="従業員編集" />
			<EmployeeFormWrapper
				employee={formEmployee}
				departmentOptions={departmentOptions}
				positionOptions={positionOptions}
			/>
		</>
	);
}
