import * as v from "valibot";

import { LikesPage } from "./_components/likes-page";

type Props = {
  searchParams: Promise<Record<string, string | undefined | string[]>>;
  params: Promise<{ postId: string }>;
};
export default async function NextPage({ searchParams, params }: Props) {
  const { page, postId } = v.parse(
    v.object({
      page: v.fallback(
        v.pipe(v.string(), v.decimal(), v.transform(Number)),
        () => 1,
      ),
      postId: v.pipe(v.string(), v.uuid()),
    }),
    { ...(await searchParams), ...(await params) },
  );

  return <LikesPage page={page} postId={postId} />;
}
