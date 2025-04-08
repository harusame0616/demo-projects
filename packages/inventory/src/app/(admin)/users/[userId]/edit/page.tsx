import { PageHeader } from "@/components/common/page-header";
import { UserFormWrapper } from "./_components/user-form-wrapper";

import type { Metadata } from "next";
import { getUserById } from "../data";

export const metadata: Metadata = {
	title: "ユーザー編集 | 人材管理システム",
	description: "ユーザー情報を編集します",
};

export default async function EditUserPage({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;
	// モックデータからユーザー情報を取得

	return (
		<>
			<PageHeader title="ユーザー編集" />

			<UserEditContainer userId={userId} />
		</>
	);
}

async function UserEditContainer(props: { userId: string }) {
	const user = await getUserById(props.userId);

	if (!user) {
		return <div>ユーザーが見つかりません</div>;
	}

	return (
		<UserFormWrapper
			user={{
				userId: user.userId,
				name: user.name,
				email: user.email,
				role: user.role,
			}}
		/>
	);
}
