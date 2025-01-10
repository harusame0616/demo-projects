import { Suspense } from "react";

import { CommentsContainer } from "./comments-container";
import { CommentsPresenter } from "./comments-presenter";

type Props = {
  page: number;
};
export function CommentsPage({ page }: Props) {
  return (
    <Suspense fallback={<CommentsPresenter skeleton page={page} />}>
      <CommentsContainer page={page} searchParams={{}} />
    </Suspense>
  );
}
