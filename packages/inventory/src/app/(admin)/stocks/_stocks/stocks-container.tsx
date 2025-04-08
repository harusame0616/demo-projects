import type { Pagination } from "@/lib/pagination";
import { Suspense } from "react";
import type { StockOrder } from "../order";
import type { SearchQuery } from "../search-query";
import { getStocks } from "./data";
import { StocksPresenter } from "./stocks-presenter";
import { StocksSkeleton } from "./stocks-skeleton";

interface StocksContainerProps {
	pagination: Pagination;
	searchQuery: SearchQuery;
	order: StockOrder;
}

export async function StocksContainer({
	pagination,
	searchQuery,
	order,
}: StocksContainerProps) {
	const { items: stocks, pagination: paginationResult } = await getStocks({
		pagination,
		searchQuery,
		order,
	});

	return (
		<Suspense fallback={<StocksSkeleton />}>
			<StocksPresenter
				stocks={stocks}
				pagination={paginationResult}
				currentOrder={order}
			/>
		</Suspense>
	);
}
