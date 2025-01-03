import { Pagination } from "@/components/pagination";

import { CommentDto } from "../_data/comments";
import { Comment } from "./comment";

type Props =
  | {
      skeleton?: false;
      comments: CommentDto[];
      pagination: {
        totalPage: number;
        page: number;
        searchParams: Record<string, string>;
      };
    }
  | { skeleton: true; page: number };
export async function CommentsPresenter(props: Props) {
  if (!props.skeleton && props.comments.length === 0) {
    return (
      <div className="text-muted-foreground text-sm py-2 text-center">
        まだコメントはありません
      </div>
    );
  }

  return (
    <div>
      <ul className="mb-4">
        {props.skeleton
          ? Array.from({ length: 5 }).map((_, index) => (
              <Comment key={index} skeleton />
            ))
          : props.comments.map((post) => (
              <Comment comment={post} key={post.commentId} />
            ))}
      </ul>
      {props.skeleton ? (
        <Pagination
          page={props.page}
          totalPage={props.page}
          searchParams={{}}
        />
      ) : (
        <Pagination {...props.pagination} />
      )}
    </div>
  );
}
