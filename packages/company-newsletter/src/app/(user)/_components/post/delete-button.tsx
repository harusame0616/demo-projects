"use client";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";

import { deletePost } from "../../_actions/delete-post";

type Props = {
	post: {
		title: string;
		postId: string;
	};
};
export function DeleteButton(props: Props) {
	const [deletionDialog, setDeletionDialog] = useState(false);
	const router = useRouter();

	return (
		<>
			<AlertDialog
				title="投稿削除"
				description={`「${props.post.title}」を削除しますがよろしいですか？`}
				primaryButtonLabel={"削除する"}
				open={deletionDialog}
				onOpenChange={setDeletionDialog}
				onPrimaryButtonClick={async () => {
					await deletePost(props.post);
					router.refresh();
				}}
			/>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setDeletionDialog(true)}
				type="button"
			>
				<TrashIcon />
			</Button>
		</>
	);
}
