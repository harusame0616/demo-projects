"use server";

import type { Stock } from "../type";

export async function updateStock(stockId: string, data: Partial<Stock>) {
	// 保存処理を模擬する遅延（500ms）
	await new Promise((resolve) => setTimeout(resolve, 300));

	// モック処理のため、実際には何も更新せず単にリダイレクトする
	console.log("Stock updated:", { stockId, data });
}

// 削除アクション関数
export async function deleteStock(_: string) {
	// 実際の削除処理の代わりに500msウェイト
	await new Promise((resolve) => setTimeout(resolve, 300));

	// 削除成功時のリダイレクト等の処理が入る想定
	return { success: true };
}
