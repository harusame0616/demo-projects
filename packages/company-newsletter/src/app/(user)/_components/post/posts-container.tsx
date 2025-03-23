import { getPosts } from "../../_data/posts";
import { PostsPresenter } from "./posts-presenter";

type Props = {
	page: number;
	searchParams: Record<string, string>;
};
export async function PostsContainer({ page }: Props) {
	const getPostsResult = await getPosts({ page });

	return (
		<PostsPresenter
			posts={getPostsResult.data}
			pagination={{ ...getPostsResult.pagination, searchParams: {} }}
		/>
	);
}
