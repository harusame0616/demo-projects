"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useTransition } from "react";
import { deleteStock } from "../actions";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 削除ボタンコンポーネント
export function DeleteButton({ stockId }: { stockId: string }) {
	const [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleDelete = () => {
		startTransition(async () => {
			// サーバーアクションを呼び出し
			const result = await deleteStock(stockId);

			if (result.success) {
				// 削除成功時の処理
				router.push("/stocks");
			}
		});
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">
					<TrashIcon className="h-4 w-4" />
					削除
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>在庫データの削除</AlertDialogTitle>
					<AlertDialogDescription>
						この在庫データを削除してもよろしいですか？
						<span className="text-destructive block">
							DEMO 環境のため、実際には削除されません
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>キャンセル</AlertDialogCancel>
					<Button
						onClick={handleDelete}
						disabled={isPending}
						variant="destructive"
					>
						{isPending ? "削除中..." : "削除する"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
