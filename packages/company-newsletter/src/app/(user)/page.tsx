import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import { PostsPage } from "./posts-page";

export default createPage(
  function ({ searchParams: { page } }) {
    return <PostsPage page={page} />;
  },
  {
    searchParamsSchema: {
      page: v.fallback(
        v.pipe(v.string(), v.decimal(), v.transform(Number)),
        () => 1,
      ),
    },
  },
);
