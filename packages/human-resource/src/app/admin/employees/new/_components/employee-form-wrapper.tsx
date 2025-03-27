"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createEmployee } from "../../_actions/employee-actions";
import { EmployeeForm } from "../../_components/employee-form";

interface EmployeeFormWrapperProps {
	departmentOptions: { value: string; label: string }[];
	positionOptions: { value: string; label: string }[];
}

export function EmployeeFormWrapper({
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
			// APIは一部のフィールドのみ対応しているため、必要なフィールドだけ渡す
			await createEmployee({
				id: values.id,
				name: values.name,
				email: values.email,
				department: values.department,
				position: values.position,
				joinDate: values.joinDate,
			});

			toast.success("従業員を登録しました");

			// 一覧ページにリダイレクト
			router.push("/admin/employees");
		} catch (error) {
			console.error("従業員の登録に失敗しました", error);
			toast.error("従業員の登録に失敗しました");
		}
	};

	return (
		<EmployeeForm
			departmentOptions={departmentOptions}
			positionOptions={positionOptions}
			onSubmit={handleSubmit}
		/>
	);
}
