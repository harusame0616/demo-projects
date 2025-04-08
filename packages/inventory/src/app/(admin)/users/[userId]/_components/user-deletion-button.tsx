"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteUser } from "../_actions/delete-user";

type Props = {
	userId: string;
};

export function UserDeletionButton({ userId }: Props) {
	const router = useRouter();

	const handleDelete = async () => {
		await deleteUser(userId);
		router.push("/users");
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">
					<Trash2 className="h-4 w-4" />
					削除
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>ユーザーを削除しますか？</AlertDialogTitle>
					<AlertDialogDescription>
						この操作は取り消せません。
						<br />
						※デモ環境では実際に削除されません
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>キャンセル</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>削除</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
