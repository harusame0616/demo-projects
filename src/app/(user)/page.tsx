import * as v from "valibot";

import { PostsPage } from "./posts-page";

type Props = {
  searchParams: Promise<Record<string, string | undefined | string[]>>;
};
export default async function NextPage({ searchParams }: Props) {
  const { page } = v.parse(
    v.object({
      page: v.fallback(
        v.pipe(v.string(), v.decimal(), v.transform(Number)),
        () => 1,
      ),
    }),
    await searchParams,
  );

  return <PostsPage page={page} />;
}
