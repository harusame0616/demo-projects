import { mockStocks } from "@/app/_mocks/stocks";
import {
	type Pagination,
	PaginationItemCount,
	type PaginationResult,
} from "@/lib/pagination";
import type { Stock } from "../type";

export async function getStockById(
	itemId: string,
	pagination: Pagination,
): Promise<{ stock: Stock; pagination: PaginationResult } | null> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	const stock = mockStocks.find((stock) => stock.stockId === itemId);

	if (!stock) {
		return null;
	}

	const histories = stock.stockHistories.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	const { page } = pagination;
	const limit = PaginationItemCount;
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	const _paginatedHistories = histories.slice(startIndex, endIndex);

	return {
		stock: {
			...stock,
			stockHistories: _paginatedHistories,
		},
		pagination: {
			total: histories.length,
			page,
			limit,
			totalPages: Math.ceil(histories.length / limit),
		},
	};
}
