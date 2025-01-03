import { commentNewComment } from "./_actions/comment-new-comment";
import { CommentInputForm } from "./comment-input-form";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ postId: string }>;
};
export default async function NextPage({ searchParams, params }: Props) {
  const { postId } = await params;
  return (
    <div>
      <CommentInputForm postId={postId} action={commentNewComment} />
    </div>
  );
}
