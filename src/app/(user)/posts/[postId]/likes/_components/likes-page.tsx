import { Suspense } from "react";

import { LikesContainer } from "./likes-container";
import { LikesPresenter } from "./likes-presenter";

type Props = {
  page: number;
  postId: string;
};

export function LikesPage(props: Props) {
  return (
    <Suspense fallback={<LikesPresenter skeleton page={props.page} />}>
      <LikesContainer
        page={props.page}
        postId={props.postId}
        searchParams={{}}
      />
    </Suspense>
  );
}
