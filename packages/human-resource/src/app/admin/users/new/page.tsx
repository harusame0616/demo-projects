import { mockEmployees } from "@/app/_mocks/employees";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
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
			<PageHeader title="ユーザー新規登録" />

			<UserFormWrapper
				roleOptions={roleOptions}
				statusOptions={statusOptions}
				employeeOptions={employeeOptions}
			/>
		</>
	);
}
