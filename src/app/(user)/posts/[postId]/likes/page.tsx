import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import { LikesPage } from "./_components/likes-page";

export default createPage(
  function ({ searchParams: { page }, params: { postId } }) {
    return <LikesPage page={page} postId={postId} />;
  },
  {
    searchParamsSchema: v.object({
      page: v.fallback(
        v.pipe(v.string(), v.decimal(), v.transform(Number)),
        () => 1,
      ),
    }),
    paramsSchema: v.object({
      postId: v.string(),
    }),
  },
);
