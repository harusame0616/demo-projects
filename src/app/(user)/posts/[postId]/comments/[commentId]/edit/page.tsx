import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import PostEditionPage from "./post-edition-page";

export default createPage(
  function ({ params: { postId, commentId } }) {
    return <PostEditionPage postId={postId} commentId={commentId} />;
  },
  {
    paramsSchema: v.object({
      postId: v.string(),
      commentId: v.string(),
    }),
  },
);
