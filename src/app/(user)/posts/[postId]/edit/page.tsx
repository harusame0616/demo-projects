import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import PostEditionPage from "./post-edition-page";

export default createPage(
  function ({ params: { postId } }) {
    return <PostEditionPage postId={postId} />;
  },
  {
    paramsSchema: v.object({
      postId: v.string(),
    }),
  },
);
