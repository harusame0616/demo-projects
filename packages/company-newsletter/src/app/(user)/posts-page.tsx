import { Suspense } from "react";

import { PostsContainer } from "./_components/post/posts-container";
import { PostsPresenter } from "./_components/post/posts-presenter";

type Props = {
	page: number;
};
export async function PostsPage({ page }: Props) {
	return (
		<Suspense fallback={<PostsPresenter skeleton page={page} />}>
			<PostsContainer page={page} searchParams={{}} />
		</Suspense>
	);
}
