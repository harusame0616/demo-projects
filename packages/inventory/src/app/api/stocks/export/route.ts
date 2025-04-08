import { type NextRequest, NextResponse } from "next/server";
import { mockStocks } from "@/app/_mocks/stocks";

export const maxDuration = 300;

export async function GET(_request: NextRequest) {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	// mockStocksデータをフラット化
	const flatStockData = mockStocks.map((stock) => {
		// 履歴がある場合、最新の履歴を取得
		if (stock.stockHistories.length > 0) {
			const latestHistory = stock.stockHistories[0]; // 最新の履歴は最初の要素
			return {
				stockId: stock.stockId,
				name: stock.name,
				janCode: stock.janCode,
				date: new Date(latestHistory.date).toISOString().split("T")[0],
				quantity: latestHistory.quantity,
				fraction: latestHistory.fraction,
				setCount: latestHistory.setCount,
			};
		}

		// 履歴がない場合は基本情報のみのデータを作成
		return {
			stockId: stock.stockId,
			name: stock.name,
			janCode: stock.janCode,
			date: "",
			quantity: 0,
			fraction: 0,
			setCount: stock.setCount,
		};
	});

	// CSVデータの生成
	const headers = [
		"商品ID",
		"商品名",
		"JANコード",
		"棚卸日",
		"在庫数",
		"端数",
		"セット数",
	];

	// フラット化したデータから行データを作成
	const rows = flatStockData.map((item) => [
		item.stockId,
		item.name,
		item.janCode,
		item.date,
		item.quantity,
		item.fraction,
		item.setCount,
	]);

	const csvContent = [
		headers.join(","),
		...rows.map((row) => row.join(",")),
	].join("\n");

	// CSVファイルとしてレスポンスを返す
	const response = new NextResponse(csvContent);

	// ファイル名を現在の日時で生成
	const now = new Date();
	const fileName = `stock_export_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}.csv`;

	response.headers.set("Content-Type", "text/csv");
	response.headers.set(
		"Content-Disposition",
		`attachment; filename="${fileName}"`,
	);

	return response;
}
