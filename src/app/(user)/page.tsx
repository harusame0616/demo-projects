import { PostsPage } from "./posts-page";

export default async function NextPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParamsAwaited = await searchParams;
  const page = searchParamsAwaited.page
    ? parseInt(searchParamsAwaited.page)
    : 1;

  return <PostsPage page={page} />;
}
