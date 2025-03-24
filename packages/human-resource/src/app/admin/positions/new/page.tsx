"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { PositionForm } from "../_components/position-form";

export default function NewPositionPage() {
	const router = useRouter();

	const handleSubmit = (values: {
		name: string;
		level: number;
		description: string;
	}) => {
		// 実際の実装ではAPIリクエストで保存処理

		// 一覧ページにリダイレクト
		router.push("/admin/positions");
	};

	return (
		<>
			<div className="mb-6">
				<h2 className="text-3xl font-bold tracking-tight">役職の新規作成</h2>
				<p className="text-muted-foreground">
					新しい役職を作成します。必要な情報を入力してください。
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>役職情報</CardTitle>
				</CardHeader>
				<CardContent>
					<PositionForm onSubmit={handleSubmit} />
				</CardContent>
			</Card>
		</>
	);
}
