import { idSchema } from "@/lib/id";
import { createPage } from "@/lib/next-file/page";

import { commentNewComment } from "./_actions/comment-new-comment";
import { CommentInputForm } from "./comment-input-form";

export default createPage(
	({ params: { postId } }) => (
		<CommentInputForm postId={postId} action={commentNewComment} />
	),
	{
		paramsSchema: {
			postId: idSchema,
		},
	},
);
