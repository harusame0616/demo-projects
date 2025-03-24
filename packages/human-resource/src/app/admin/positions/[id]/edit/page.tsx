"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { PositionForm } from "../../_components/position-form";
import { positionData } from "../../_data/positions-data";

interface PositionEditPageProps {
	params: {
		id: string;
	};
}

export default function PositionEditPage({ params }: PositionEditPageProps) {
	const router = useRouter();
	const position = positionData.find((p) => p.id === params.id);

	if (!position) {
		notFound();
	}

	const handleSubmit = (values: {
		name: string;
		level: number;
		description: string;
	}) => {
		// 実際の実装ではAPIリクエストを送信して更新

		// 成功メッセージの表示
		toast({
			title: "役職を更新しました",
			description: `「${values.name}」の情報が更新されました。`,
		});

		// 詳細ページにリダイレクト
		router.push(`/admin/positions/${params.id}`);
	};

	return (
		<>
			<div className="mb-6">
				<h2 className="text-3xl font-bold tracking-tight">役職の編集</h2>
				<p className="text-muted-foreground">
					役職情報を更新します。必要な情報を入力してください。
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{position.name} の編集</CardTitle>
				</CardHeader>
				<CardContent>
					<PositionForm position={position} onSubmit={handleSubmit} />
				</CardContent>
			</Card>
		</>
	);
}
