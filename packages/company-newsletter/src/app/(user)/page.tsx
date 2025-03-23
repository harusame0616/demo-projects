import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import { PostsPage } from "./posts-page";

export default createPage(
	({ searchParams: { page } }) => <PostsPage page={page} />,
	{
		searchParamsSchema: {
			page: v.fallback(
				v.pipe(v.string(), v.decimal(), v.transform(Number)),
				() => 1,
			),
		},
	},
);
