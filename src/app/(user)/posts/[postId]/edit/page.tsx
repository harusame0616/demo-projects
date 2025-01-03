import PostEditionPage from "./post-edition-page";

type Props = {
  params: Promise<{ postId: string }>;
};
export default async function NextPage({ params }: Props) {
  const { postId } = await params;
  return <PostEditionPage postId={postId} />;
}
