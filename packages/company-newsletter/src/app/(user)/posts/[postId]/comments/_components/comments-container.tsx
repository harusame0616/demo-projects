import { getComments } from "../_data/comments";
import { CommentsPresenter } from "./comments-presenter";

type Props = {
  page: number;
  searchParams: Record<string, string>;
};
export async function CommentsContainer({ page }: Props) {
  const getPostsResult = await getComments({ page });

  return (
    <CommentsPresenter
      comments={getPostsResult.data}
      pagination={{ ...getPostsResult.pagination, searchParams: {} }}
    />
  );
}
