import { PageHeader } from "@/components/common/page-header";
import type { Metadata } from "next";
import { v4 as uuidv4 } from "uuid";
import type { Stock } from "../type";
import { StockForm } from "../_components/stock-form";

// メタデータ
export const metadata: Metadata = {
	title: "商品追加",
	description: "在庫管理システムに新しい商品を追加します。",
};

// 商品追加ページ
export default function StockCreatePage() {
	// 商品追加用のサーバーアクション
	async function createStock(data: {
		name: string;
		janCode: string;
		setCount: number;
	}) {
		"use server";

		// 実際の実装ではデータベースに保存する処理を行う
		// このデモでは仮のStockオブジェクトを返す
		const newStock: Stock = {
			stockId: uuidv4(),
			name: data.name,
			janCode: data.janCode,
			setCount: data.setCount,
			stockHistories: [],
		};

		// 作成処理を実行したあとに少し待機（デモ用）
		await new Promise((resolve) => setTimeout(resolve, 300));

		return newStock;
	}

	return (
		<>
			<PageHeader title="商品追加" />
			<div className="mt-6">
				<StockForm mode="create" onSubmit={createStock} />
			</div>
		</>
	);
}
