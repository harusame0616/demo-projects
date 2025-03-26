import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import {
	getUserById,
	getUserRoles,
	getUserStatuses,
} from "../../_actions/user-actions";
import { UserFormWrapper } from "./_components/user-form-wrapper";
import { mockEmployees } from "@/app/_mocks/employees";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ユーザー編集 | 人材管理システム",
	description: "ユーザー情報を編集します",
};

export default async function EditUserPage({
	params,
}: {
	params: { id: string };
}) {
	// モックデータからユーザー情報を取得
	const user = await getUserById(params.id);

	// サーバーサイドでロールとステータスのオプションを取得
	const roleOptions = await getUserRoles();
	const statusOptions = await getUserStatuses();

	// 従業員オプションを作成
	const employeeOptions = mockEmployees.map((employee) => ({
		id: employee.id,
		name: employee.name,
	}));

	if (!user) {
		return (
			<div className="flex flex-col items-center justify-center h-96">
				<h2 className="text-2xl font-bold mb-4">ユーザーが見つかりません</h2>
				<Button asChild>
					<Link href="/admin/users">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						ユーザー一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">ユーザー編集</h1>
				<p className="text-muted-foreground mt-1">{user.email}</p>
			</div>

			<UserFormWrapper
				user={{
					id: user.id,
					email: user.email,
					role: user.role,
					status: user.status,
					employeeId: user.employeeId,
				}}
				roleOptions={roleOptions}
				statusOptions={statusOptions}
				employeeOptions={employeeOptions}
			/>
		</>
	);
}
