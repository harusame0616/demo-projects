import { idSchema } from "@/lib/id";
import { createPage } from "@/lib/next-file/page";

import PostEditionPage from "./post-edition-page";

export default createPage(
  function ({ params: { postId, commentId } }) {
    return <PostEditionPage postId={postId} commentId={commentId} />;
  },
  {
    paramsSchema: {
      postId: idSchema,
      commentId: idSchema,
    },
  },
);
