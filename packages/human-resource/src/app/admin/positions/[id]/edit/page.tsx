"use client";

import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { use } from "react";
import { PositionForm } from "../../_components/position-form";
import { positionData } from "../../_data/positions-data";

interface PositionEditPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function PositionEditPage({ params }: PositionEditPageProps) {
	const router = useRouter();
	const { id } = use(params);
	const position = positionData.find((p) => p.id === id);

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
		router.push(`/admin/positions/${id}`);
	};

	return (
		<>
			<PageHeader title="役職の編集" />

			<PositionForm position={position} onSubmit={handleSubmit} />
		</>
	);
}
