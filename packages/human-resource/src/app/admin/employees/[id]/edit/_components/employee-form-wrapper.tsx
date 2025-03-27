"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EmployeeForm } from "../../../_components/employee-form";

interface EmployeeFormWrapperProps {
	employee: {
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
	};
	departmentOptions: { value: string; label: string }[];
	positionOptions: { value: string; label: string }[];
}

export function EmployeeFormWrapper({
	employee,
	departmentOptions,
	positionOptions,
}: EmployeeFormWrapperProps) {
	const router = useRouter();

	const handleSubmit = async (values: {
		id?: string;
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
		skills: string[];
		certifications: string[];
	}) => {
		try {
			// 実際のAPIが実装されていないため、仮の成功メッセージを表示
			// MEMO: 実際の実装では以下のような関数を呼び出す
			// await updateEmployee(values);
			console.log("従業員情報を更新:", values);

			toast.success("従業員情報を更新しました");

			// 一覧ページにリダイレクト
			router.push("/admin/employees");
		} catch (error) {
			console.error("従業員情報の更新に失敗しました", error);
			toast.error("従業員情報の更新に失敗しました");
		}
	};

	return (
		<EmployeeForm
			employee={employee}
			departmentOptions={departmentOptions}
			positionOptions={positionOptions}
			onSubmit={handleSubmit}
		/>
	);
}
