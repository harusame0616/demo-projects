import type { Metadata } from "next";
import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import { UsersPage } from "./user-page";

export const metadata: Metadata = {
	title: "ユーザー一覧",
};

export default createPage(
	({ searchParams: { page }, searchParamsRaw }) => (
		<UsersPage page={page} searchParams={searchParamsRaw} />
	),
	{
		searchParamsSchema: {
			page: v.optional(v.pipe(v.string(), v.transform(Number)), () => "1"),
		},
	},
);
