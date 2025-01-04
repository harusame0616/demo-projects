import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import { commentNewComment } from "./_actions/comment-new-comment";
import { CommentInputForm } from "./comment-input-form";

export default createPage(
  function ({ params: { postId } }) {
    return <CommentInputForm postId={postId} action={commentNewComment} />;
  },
  {
    paramsSchema: v.object({
      postId: v.string(),
    }),
  },
);
