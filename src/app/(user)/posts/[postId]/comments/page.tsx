import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import { CommentsPage } from "./_components/comments-page";

export default createPage(
  function ({ searchParams: { page } }) {
    return <CommentsPage page={page} />;
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
