"use client";

import type { Stock } from "@/app/(admin)/stocks/type";
import { mockUsers } from "@/app/_mocks/users";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PaginationNav } from "@/components/common/pagination-nav";
import type { PaginationResult } from "@/lib/pagination";

interface StockDetailPresenterProps {
	stock: Stock;
	pagination: PaginationResult;
}

export function StockDetailPresenter({
	stock,
	pagination,
}: StockDetailPresenterProps) {
	const [editingHistory, setEditingHistory] = useState<
		(typeof stock.stockHistories)[number] | null
	>(null);
	const [deletingHistory, setDeletingHistory] = useState<
		(typeof stock.stockHistories)[number] | null
	>(null);

	const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		// モック: 実際はここでAPIを呼び出して更新
		console.log("編集内容:", {
			date: formData.get("date"),
			quantity: formData.get("quantity"),
			fraction: formData.get("fraction"),
			setCount: formData.get("setCount"),
		});

		setEditingHistory(null);
	};

	const handleDelete = () => {
		// モック: 実際はここでAPIを呼び出して削除
		console.log("削除対象:", deletingHistory);
		setDeletingHistory(null);
	};

	return (
		<div className="space-y-4">
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
				<div className="mb-1 text-sm font-medium text-blue-600">商品名</div>
				<h1 className="text-3xl font-bold text-gray-900">{stock.name}</h1>
			</div>

			<div className="border rounded-lg p-4">
				<h2 className="text-lg font-semibold mb-4">基本情報</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="text-sm text-muted-foreground mb-1">
							バーコード番号（JAN）
						</p>
						<p className="text-lg font-medium">{stock.janCode}</p>
					</div>
					<div>
						<p className="text-sm text-muted-foreground mb-1">セット数</p>
						<p className="text-lg font-medium">{stock.setCount}</p>
					</div>
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h2 className="text-lg font-semibold mb-4">棚卸し履歴</h2>
				{stock.stockHistories.length > 0 ? (
					<div className="space-y-4">
						<div className="border rounded-md overflow-hidden">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[150px]">日付</TableHead>
										<TableHead className="w-[100px]">在庫数</TableHead>
										<TableHead className="w-[100px]">端数</TableHead>
										<TableHead className="w-[100px]">セット数</TableHead>
										<TableHead className="w-[150px]">担当者</TableHead>
										<TableHead className="w-[150px]">操作</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{stock.stockHistories.map((history, index) => (
										<TableRow
											key={`${history.date}-${history.userId}-${index}`}
										>
											<TableCell>
												{new Date(history.date).toLocaleDateString("ja-JP")}
											</TableCell>
											<TableCell>{history.quantity}</TableCell>
											<TableCell>{history.fraction}</TableCell>
											<TableCell>{history.setCount}</TableCell>
											<TableCell>
												{
													mockUsers.find(
														(user) => user.userId === history.userId,
													)?.name
												}
											</TableCell>
											<TableCell>
												<div className="flex gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => setEditingHistory(history)}
													>
														編集
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => setDeletingHistory(history)}
													>
														削除
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
						{pagination.totalPages > 1 && (
							<div className="flex justify-center">
								<PaginationNav
									currentPage={pagination.page}
									totalPages={pagination.totalPages}
								/>
							</div>
						)}
					</div>
				) : (
					<p className="text-center py-4 text-muted-foreground border rounded-md">
						棚卸し履歴はありません
					</p>
				)}
			</div>

			<Dialog
				open={!!editingHistory}
				onOpenChange={() => setEditingHistory(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>棚卸し履歴の編集</DialogTitle>
						<DialogDescription>
							棚卸し履歴の内容を編集できます
							<span className="text-xs text-destructive block">
								DEMO 環境では実際には保存されません
							</span>
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={handleEditSubmit}>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="date">日付</Label>
								<Input
									id="date"
									name="date"
									type="date"
									defaultValue={editingHistory?.date.split("T")[0]}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="quantity">在庫数</Label>
								<Input
									id="quantity"
									name="quantity"
									type="number"
									defaultValue={editingHistory?.quantity}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="fraction">端数</Label>
								<Input
									id="fraction"
									name="fraction"
									type="number"
									defaultValue={editingHistory?.fraction}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="setCount">セット数</Label>
								<Input
									id="setCount"
									name="setCount"
									type="number"
									defaultValue={editingHistory?.setCount}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">保存</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<AlertDialog
				open={!!deletingHistory}
				onOpenChange={() => setDeletingHistory(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>棚卸し履歴の削除</AlertDialogTitle>
						<AlertDialogDescription>
							この操作は取り消せません。本当に削除しますか？
							<span className="text-xs text-destructive block">
								DEMO 環境では実際には保存されません
							</span>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>キャンセル</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>削除</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
