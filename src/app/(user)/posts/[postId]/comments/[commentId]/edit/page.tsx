import PostEditionPage from "./post-edition-page";

type Props = {
  params: Promise<{ postId: string; commentId: string }>;
};
export default async function NextPage({ params }: Props) {
  const { postId, commentId } = await params;
  return <PostEditionPage postId={postId} commentId={commentId} />;
}
