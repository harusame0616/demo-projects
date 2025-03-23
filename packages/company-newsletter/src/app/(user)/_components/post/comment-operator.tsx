"use client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, startTransition, useOptimistic } from "react";

import { Drawer } from "@/components/drawer";
import { Button } from "@/components/ui/button";

import { togglePostLikeAction } from "../../_actions/toggle-post-like";
import type { LikeDto } from "../../_data/posts";

type Props = {
	isLiked: boolean;
	likes: LikeDto[];
	postId: string;
	LikesPresenter: ReactNode;
};
export function LikeOperator(props: Props) {
	const [optimisticLikes, setOptimisticLikes] = useOptimistic({
		likeCount: props.likes.length,
		isLiked: props.isLiked,
	});
	const router = useRouter();

	async function handleClickLike() {
		startTransition(async () => {
			setOptimisticLikes((prev) => ({
				likeCount: prev.likeCount + (prev.isLiked ? -1 : 1),
				isLiked: !prev.isLiked,
			}));
			const result = await togglePostLikeAction({ postId: props.postId });
			if (!result.success) {
				return;
			}
			router.refresh();
		});
	}

	return (
		<div className="flex items-center">
			<Button variant="ghost" size="icon" onClick={handleClickLike}>
				<HeartIcon fill={optimisticLikes.isLiked ? "#000" : "#fff"} />
			</Button>
			<Drawer
				likes={props.likes}
				triggerLabel={`${optimisticLikes.likeCount}`}
				title="いいね一覧"
			>
				{props.LikesPresenter}
			</Drawer>
		</div>
	);
}
