import { StockDetailPresenter } from "./stock-detail-presenter";
import { Button } from "@/components/ui/button";
import { getStockById } from "../data";
import type { Pagination } from "@/lib/pagination";
import Link from "next/link";
interface Props {
	itemId: string;
	pagination: Pagination;
}

export async function StockDetailContainer({ itemId, pagination }: Props) {
	const getStockByIdResult = await getStockById(itemId, pagination);

	if (!getStockByIdResult) {
		return (
			<div className="flex flex-col gap-4">
				<p>DEMO 環境では実際に追加はできません。</p>
				<Button asChild variant="outline">
					<Link href="/stocks">在庫一覧へ戻る</Link>
				</Button>
			</div>
		);
	}

	return (
		<StockDetailPresenter
			stock={getStockByIdResult.stock}
			pagination={getStockByIdResult.pagination}
		/>
	);
}
