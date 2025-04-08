import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { UserDeletionButton } from "./_components/user-deletion-button";
import { getUserById } from "./data";

export const metadata: Metadata = {
	title: "ユーザー詳細 | 人材管理システム",
	description: "ユーザー情報の詳細",
};

export default async function UserDetailPage({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;
	// モックデータからユーザー情報を取得
	const user = await getUserById(userId);

	if (!user) {
		notFound();
	}

	// 日付フォーマット用ヘルパー関数
	const formatDate = (dateString: string): string => {
		return new Date(dateString).toLocaleDateString("ja-JP", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<>
			<PageHeader
				title="ユーザー詳細"
				operations={[
					<Button key="edit-user" asChild variant="outline">
						<Link href={`/users/${user.userId}/edit`}>
							<Pencil className="h-4 w-4" />
							編集
						</Link>
					</Button>,
					<UserDeletionButton key="delete-user" userId={user.userId} />,
				]}
			/>

			<div className="grid grid-cols-1 gap-6">
				{/* ユーザー基本情報 */}
				<Card className="shadow-sm">
					<CardContent>
						<dl className="space-y-4">
							<div className="grid grid-cols-3 gap-4">
								<dt className="font-medium text-muted-foreground">名前</dt>
								<dd className="col-span-2">{user.name}</dd>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<dt className="font-medium text-muted-foreground">
									メールアドレス
								</dt>
								<dd className="col-span-2">{user.email}</dd>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<dt className="font-medium text-muted-foreground">権限</dt>
								<dd className="col-span-2">
									<div className="flex items-center gap-2">
										<Shield className="h-4 w-4 text-purple-500" />
										{user.role === "admin" ? "管理者" : "一般ユーザー"}
									</div>
								</dd>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<dt className="font-medium text-muted-foreground">登録日</dt>
								<dd className="col-span-2">{formatDate(user.createdAt)}</dd>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<dt className="font-medium text-muted-foreground">更新日</dt>
								<dd className="col-span-2">{formatDate(user.updatedAt)}</dd>
							</div>
						</dl>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
