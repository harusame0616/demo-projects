"use client";

import { StockForm } from "@/app/(admin)/stocks/_components/stock-form";
import type { Stock } from "@/app/(admin)/stocks/type";
import { updateStock } from "../../actions";

interface StockEditPresenterProps {
	stock: Stock;
}

export function StockEditPresenter({ stock }: StockEditPresenterProps) {
	// 編集用のサーバーアクション
	const handleSubmit = async (data: {
		name: string;
		janCode: string;
		setCount: number;
	}) => {
		await updateStock(stock.stockId, data);
		return stock; // デモ用に既存のstock情報を返す
	};
	return <StockForm mode="edit" stock={stock} onSubmit={handleSubmit} />;
}
