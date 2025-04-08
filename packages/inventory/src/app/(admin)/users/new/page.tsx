import { PageHeader } from "@/components/common/page-header";
import { UserFormWrapper } from "./_components/user-form-wrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ユーザー登録 | 人材管理システム",
	description: "新しいユーザー情報を登録します",
};

export default async function NewUserPage() {
	return (
		<>
			<PageHeader title="ユーザー新規登録" />
			<UserFormWrapper />
		</>
	);
}
