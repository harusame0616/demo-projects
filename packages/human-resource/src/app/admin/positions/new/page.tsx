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
				<h2 className="text-3xl font-bold tracking-tight">役職新規作成</h2>
			</div>

			<PositionForm onSubmit={handleSubmit} />
		</>
	);
}
