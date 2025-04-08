import { mockStocks } from "@/app/_mocks/stocks";
import { notFound } from "next/navigation";
import { StockEditPresenter } from "./stock-edit-presenter";

interface StockEditContainerProps {
	itemId: string;
}

export async function StockEditContainer({ itemId }: StockEditContainerProps) {
	// データ取得を模擬する遅延
	await new Promise((resolve) => setTimeout(resolve, 300));

	// モックデータから該当の商品を検索
	const stock = mockStocks.find((stock) => stock.stockId === itemId);

	// 該当する商品がない場合は404ページに遷移
	if (!stock) {
		notFound();
	}

	return <StockEditPresenter stock={stock} />;
}
