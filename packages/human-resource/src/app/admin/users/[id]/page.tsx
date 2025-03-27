import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowLeftIcon,
	UserIcon,
	MailIcon,
	Calendar,
	PencilIcon,
	UserCheck,
	Shield,
} from "lucide-react";
import Link from "next/link";
import { getUserById } from "../_actions/user-actions";
import { mockEmployees } from "@/app/_mocks/employees";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ユーザー詳細 | 人材管理システム",
	description: "ユーザー情報の詳細",
};

export default async function UserDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	// モックデータからユーザー情報を取得
	const user = await getUserById(id);

	if (!user) {
		notFound();
	}

	// 紐づく従業員情報を取得
	const employee = user.employeeId
		? mockEmployees.find((emp) => emp.id === user.employeeId)
		: null;

	// 日付フォーマット用ヘルパー関数
	const formatDate = (dateString: string): string => {
		return new Date(dateString).toLocaleDateString("ja-JP", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// 最終ログイン日時のフォーマット
	const lastLoginFormatted = user.lastLogin
		? new Date(user.lastLogin).toLocaleString("ja-JP", {
				year: "numeric",
				month: "numeric",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})
		: "ログイン履歴なし";

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight mb-1">
						ユーザー詳細
					</h1>
				</div>
				<Button asChild variant="outline">
					<Link href={`/admin/users/${user.id}/edit`}>編集</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-6">
				{/* ユーザー基本情報 */}
				<Card className="shadow-sm">
					<CardContent>
						<dl className="space-y-4">
							<div className="grid grid-cols-3 gap-4">
								<dt className="font-medium text-muted-foreground">
									ユーザーID
								</dt>
								<dd className="col-span-2">{user.id}</dd>
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
								<dt className="font-medium text-muted-foreground">
									ステータス
								</dt>
								<dd className="col-span-2">
									{user.status === "active" ? "有効" : "無効"}
								</dd>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<dt className="font-medium text-muted-foreground">
									最終ログイン
								</dt>
								<dd className="col-span-2">{lastLoginFormatted}</dd>
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

				{/* 紐づく従業員情報 */}
				<Card className="shadow-sm">
					<CardHeader className="border-b bg-muted/20 pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<UserCheck className="h-5 w-5 text-primary" />
							紐づく従業員
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						{employee ? (
							<div className="space-y-4">
								<div className="flex flex-col">
									<h3 className="text-lg font-medium mb-1">{employee.name}</h3>
									<div className="text-muted-foreground text-sm">
										{employee.nameKana || "登録なし"}
									</div>
								</div>
								<dl className="space-y-4">
									<div className="grid grid-cols-3 gap-4">
										<dt className="font-medium text-muted-foreground">
											従業員コード
										</dt>
										<dd className="col-span-2">
											<Link
												href={`/admin/employees/${employee.id}`}
												className="text-primary hover:underline"
											>
												{employee.id}
											</Link>
										</dd>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<dt className="font-medium text-muted-foreground">部署</dt>
										<dd className="col-span-2">{employee.department}</dd>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<dt className="font-medium text-muted-foreground">役職</dt>
										<dd className="col-span-2">{employee.position}</dd>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<dt className="font-medium text-muted-foreground">
											メール
										</dt>
										<dd className="col-span-2">{employee.email}</dd>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<dt className="font-medium text-muted-foreground">
											入社日
										</dt>
										<dd className="col-span-2">
											{formatDate(employee.joinDate)}
										</dd>
									</div>
								</dl>
								<div className="mt-4">
									<Button variant="outline" size="sm" asChild>
										<Link href={`/admin/employees/${employee.id}`}>
											従業員詳細を表示
										</Link>
									</Button>
								</div>
							</div>
						) : (
							<div className="py-8 text-center text-muted-foreground">
								<UserIcon className="h-10 w-10 mx-auto mb-4 opacity-20" />
								<p>このユーザーに紐づく従業員はいません</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
