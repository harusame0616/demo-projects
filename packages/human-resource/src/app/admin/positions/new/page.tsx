"use client";

import { PageHeader } from "@/components/common/page-header";
import { useRouter } from "next/navigation";
import { PositionForm } from "../_edit-form/position-form";

export default function NewPositionPage() {
	const router = useRouter();

	const handleSubmit = (_values: {
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
			<PageHeader title="役職新規作成" />
			<PositionForm onSubmit={handleSubmit} />
		</>
	);
}
