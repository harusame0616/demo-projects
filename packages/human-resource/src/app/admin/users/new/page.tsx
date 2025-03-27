import { mockEmployees } from "@/app/_mocks/employees";
import { getUserRoles, getUserStatuses } from "../_actions/user-actions";
import { UserFormWrapper } from "./_components/user-form-wrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ユーザー登録 | 人材管理システム",
	description: "新しいユーザー情報を登録します",
};

export default async function NewUserPage() {
	// サーバーサイドでロールとステータスのオプションを取得
	const roleOptions = await getUserRoles();
	const statusOptions = await getUserStatuses();

	// 従業員オプションを作成
	const employeeOptions = mockEmployees.map((employee) => ({
		id: employee.id,
		name: employee.name,
	}));

	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">ユーザー新規登録</h1>
			</div>

			<UserFormWrapper
				roleOptions={roleOptions}
				statusOptions={statusOptions}
				employeeOptions={employeeOptions}
			/>
		</>
	);
}
