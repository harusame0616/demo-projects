"use client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useOptimistic } from "react";

import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import type { Result } from "@/lib/result";

type Props = {
	isLiked: boolean;
	likeCount: number;
	likesHref: string;
	toggleLikeAction: () => Promise<Result>;
};
export function Like(props: Props) {
	const [optimisticLikes, setOptimisticLikes] = useOptimistic({
		likeCount: props.likeCount,
		isLiked: props.isLiked,
	});
	const router = useRouter();

	async function handleClickLike() {
		startTransition(async () => {
			setOptimisticLikes((prev) => ({
				likeCount: prev.likeCount + (prev.isLiked ? -1 : 1),
				isLiked: !prev.isLiked,
			}));
			const result = await props.toggleLikeAction();
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
			<Link href={props.likesHref} className="-ml-2 block px-1">
				{optimisticLikes.likeCount}
			</Link>
		</div>
	);
}
