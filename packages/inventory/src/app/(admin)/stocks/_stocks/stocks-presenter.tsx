"use client";

import type { Stock } from "@/app/(admin)/stocks/type";
import { PaginationNav } from "@/components/common/pagination-nav";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { ClipboardListIcon, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { StockOrderField } from "../order";
import { OrderDirection } from "@/lib/order";
import { DialogDescription } from "@radix-ui/react-dialog";
import { CheckIcon } from "lucide-react";

interface StocksPresenterProps {
	stocks: Stock[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	currentOrder?: {
		field: StockOrderField;
		direction: typeof OrderDirection.Asc | typeof OrderDirection.Desc;
	};
}

export function StocksPresenter({
	stocks,
	pagination,
	currentOrder,
}: StocksPresenterProps) {
	const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
	const [inventoryCount, setInventoryCount] = useState<string>("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleOpenInventoryDialog = (stock: Stock) => {
		setSelectedStock(stock);
		setInventoryCount(
			stock.stockHistories.length > 0
				? String(stock.stockHistories[0].quantity)
				: "0",
		);
		setIsDialogOpen(true);
	};

	const handleSaveInventory = () => {
		// 実際の実装では、ここで棚卸しデータを保存するAPIを呼び出します
		console.log("棚卸し保存:", selectedStock?.stockId, inventoryCount);
		setIsDialogOpen(false);
		// 成功メッセージなどを表示
	};

	// 今月すでに棚卸し済みかどうかをチェック
	const isAlreadyInventoriedThisMonth = (stock: Stock): boolean => {
		if (stock.stockHistories.length === 0) {
			return false;
		}

		const today = new Date();
		const latestInventoryDate = new Date(stock.stockHistories[0].date);

		return (
			today.getFullYear() === latestInventoryDate.getFullYear() &&
			today.getMonth() === latestInventoryDate.getMonth()
		);
	};

	// URLパラメータでソート
	const handleSort = (field: StockOrderField) => {
		const params = new URLSearchParams(searchParams);

		// 同じフィールドをクリックした場合は昇順/降順を切り替え
		if (currentOrder && currentOrder.field === field) {
			params.set(
				"direction",
				currentOrder.direction === OrderDirection.Asc
					? OrderDirection.Desc
					: OrderDirection.Asc,
			);
		} else {
			// 異なるフィールドをクリックした場合は、そのフィールドで昇順ソート
			params.set("field", field);
			params.set("direction", OrderDirection.Asc);
		}

		// ページを1に戻す
		params.set("page", "1");

		router.push(`${pathname}?${params.toString()}`);
	};

	// ソートアイコンのコンポーネント
	const SortIcon = ({ field }: { field: StockOrderField }) => {
		if (!currentOrder || currentOrder.field !== field) {
			return null;
		}
		return currentOrder.direction === OrderDirection.Asc ? (
			<ArrowUp className="ml-1 h-4 w-4" />
		) : (
			<ArrowDown className="ml-1 h-4 w-4" />
		);
	};

	return (
		<div className="space-y-4 w-full">
			<div className="w-full overflow-auto">
				<div className="min-w-full rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[40px] text-right">棚卸し</TableHead>
								<TableHead className="w-[100px]">
									<button
										type="button"
										onClick={() => handleSort("lastInventoryDate")}
										className="flex items-center hover:text-primary"
									>
										最終棚卸し
										<SortIcon field="lastInventoryDate" />
									</button>
								</TableHead>
								<TableHead className="">
									<button
										type="button"
										onClick={() => handleSort("name")}
										className="flex items-center hover:text-primary hover:cursor-pointer"
									>
										商品名
										<SortIcon field="name" />
									</button>
								</TableHead>
								<TableHead className="w-[120px]">
									<button
										type="button"
										onClick={() => handleSort("janCode")}
										className="flex items-center hover:text-primary hover:cursor-pointer"
									>
										JANコード
										<SortIcon field="janCode" />
									</button>
								</TableHead>
								<TableHead className="w-[80px]">
									<button
										type="button"
										onClick={() => handleSort("quantity")}
										className="flex items-center hover:text-primary hover:cursor-pointer"
									>
										在庫数
										<SortIcon field="quantity" />
									</button>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{stocks.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="h-24 text-center">
										該当する商品はありません
									</TableCell>
								</TableRow>
							) : (
								stocks.map((stock) => {
									const alreadyInventoried =
										isAlreadyInventoriedThisMonth(stock);
									return (
										<TableRow key={stock.stockId}>
											<TableCell className="text-right">
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<span>
																<Button
																	variant="outline"
																	size="icon"
																	onClick={() =>
																		!alreadyInventoried &&
																		handleOpenInventoryDialog(stock)
																	}
																	disabled={alreadyInventoried}
																>
																	{alreadyInventoried ? (
																		<CheckIcon className="h-4 w-4" />
																	) : (
																		<ClipboardListIcon className="h-4 w-4" />
																	)}
																</Button>
															</span>
														</TooltipTrigger>
														{alreadyInventoried && (
															<TooltipContent>
																<p>今月はすでに棚卸し済みです</p>
															</TooltipContent>
														)}
													</Tooltip>
												</TooltipProvider>
											</TableCell>
											<TableCell>
												{stock.stockHistories.length > 0
													? new Date(
															stock.stockHistories[0].date,
														).toLocaleDateString("ja-JP")
													: "-"}
											</TableCell>
											<TableCell>
												<Link
													href={`/stocks/${stock.stockId}`}
													className="underline"
												>
													{stock.name}
												</Link>
											</TableCell>
											<TableCell>{stock.janCode}</TableCell>
											<TableCell>
												{stock.stockHistories.length > 0
													? stock.stockHistories[0].quantity
													: "-"}
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			{pagination && pagination.totalPages > 1 && (
				<div className="mt-4 flex justify-center">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
					/>
				</div>
			)}

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>棚卸し登録</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						<span className="text-xs text-destructive block">
							DEMO 環境では実際には保存されません
						</span>
					</DialogDescription>
					{selectedStock && (
						<div className="space-y-4 py-2">
							<div className="space-y-3">
								<div>
									<Label className="text-sm font-semibold text-gray-700">
										商品名
									</Label>
									<div className="mt-1 p-2 bg-gray-50 border rounded-md">
										{selectedStock.name}
									</div>
								</div>
								<div>
									<Label className="text-sm font-semibold text-gray-700">
										JANコード
									</Label>
									<div className="mt-1 p-2 bg-gray-50 border rounded-md">
										{selectedStock.janCode}
									</div>
								</div>
								<div>
									<Label className="text-sm font-semibold text-gray-700">
										セット数
									</Label>
									<div className="mt-1 p-2 bg-gray-50 border rounded-md">
										{selectedStock.setCount}
									</div>
								</div>
							</div>

							<div className="space-y-2 pt-2 border-t">
								<Label
									htmlFor="inventory-count"
									className="text-sm font-semibold text-gray-700"
								>
									在庫数量
								</Label>
								<Input
									id="inventory-count"
									type="number"
									min="0"
									value={inventoryCount}
									onChange={(e) => setInventoryCount(e.target.value)}
									className="max-w-40"
								/>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							キャンセル
						</Button>
						<Button onClick={handleSaveInventory}>保存</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
