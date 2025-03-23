import * as v from "valibot";

import { createPage } from "@/lib/next-file/page";

import PostEditionPage from "./post-edition-page";

export default createPage(
	({ params: { postId } }) => <PostEditionPage postId={postId} />,
	{
		paramsSchema: { postId: v.string() },
	},
);
