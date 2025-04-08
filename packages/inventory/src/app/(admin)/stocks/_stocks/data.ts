import { mockStocks } from "@/app/_mocks/stocks";
import { OrderDirection } from "@/lib/order";
import type { Pagination, PaginationResult } from "@/lib/pagination";
import { PaginationItemCount } from "@/lib/pagination";
import type { StockOrder } from "../order";
import { StockOrderField } from "../order";
import type { Stock } from "../type";

export type Condition = {
	searchQuery: {
		keyword?: string;
		notInventoried?: string; // 'YYYY-MM' 形式
	};
	pagination: Pagination;
	order: StockOrder;
};

export async function getStocks({
	searchQuery: { keyword, notInventoried },
	pagination,
	order,
}: Condition): Promise<{ items: Stock[]; pagination: PaginationResult }> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	let filteredStocks = [...mockStocks];

	// キーワード検索（部分一致）
	if (keyword) {
		const lowerKeyword = keyword.toLowerCase();
		filteredStocks = filteredStocks.filter(
			(stock) =>
				stock.janCode.includes(keyword) ||
				stock.name.toLowerCase().includes(lowerKeyword),
		);
	}

	// 指定した年月の棚卸し履歴が存在しない在庫を検索
	if (notInventoried) {
		// 'YYYY-MM' 形式から年と月を取得
		const [year, month] = notInventoried.split("-").map(Number);

		filteredStocks = filteredStocks.filter((stock) => {
			// その月の棚卸し履歴があるかチェック
			return !stock.stockHistories.some((history) => {
				const historyDate = new Date(history.date);
				return (
					historyDate.getFullYear() === year &&
					historyDate.getMonth() + 1 === month
				);
			});
		});
	}

	console.log(order);
	filteredStocks.sort((a, b) => {
		let aValue: string | number | Date | null;
		let bValue: string | number | Date | null;

		switch (order.field) {
			case StockOrderField.Name:
				aValue = a.name;
				bValue = b.name;
				break;
			case StockOrderField.JanCode:
				aValue = a.janCode;
				bValue = b.janCode;
				break;
			case StockOrderField.SetCount:
				aValue = a.setCount;
				bValue = b.setCount;
				break;
			case StockOrderField.Quantity:
				aValue =
					a.stockHistories.length > 0 ? a.stockHistories[0].quantity : -1;
				bValue =
					b.stockHistories.length > 0 ? b.stockHistories[0].quantity : -1;
				break;
			case StockOrderField.LastInventoryDate:
				aValue =
					a.stockHistories.length > 0
						? new Date(a.stockHistories[0].date)
						: null;
				bValue =
					b.stockHistories.length > 0
						? new Date(b.stockHistories[0].date)
						: null;
				break;
			default:
				return 0;
		}

		if (aValue === bValue) return 0;
		if (aValue === null) return 1;
		if (bValue === null) return -1;

		const compareResult = aValue < bValue ? -1 : 1;
		return order.direction === OrderDirection.Asc
			? compareResult
			: -compareResult;
	});

	// 総件数
	const total = filteredStocks.length;

	// ページネーション適用
	const { page } = pagination;
	const limit = PaginationItemCount;
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	const paginatedStocks = filteredStocks.slice(startIndex, endIndex);

	return {
		items: paginatedStocks.map((stock) => ({
			...stock,
			stockHistories: stock.stockHistories.sort((a, b) => {
				const aDate = new Date(a.date);
				const bDate = new Date(b.date);
				return aDate.getTime() - bDate.getTime();
			}),
		})),
		pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
	};
}
