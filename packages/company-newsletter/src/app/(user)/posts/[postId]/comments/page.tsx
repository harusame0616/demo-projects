import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import { CommentsPage } from "./_components/comments-page";

export default createPage(
	({ searchParams: { page } }) => <CommentsPage page={page} />,
	{
		searchParamsSchema: {
			page: v.fallback(
				v.pipe(v.string(), v.decimal(), v.transform(Number)),
				() => 1,
			),
		},
	},
);
