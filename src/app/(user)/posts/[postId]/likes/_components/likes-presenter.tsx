import { format } from "date-fns";

import { Avatar } from "@/components/avatar/avatar";
import { Pagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";

import { LikeDto } from "../_data/likes";

type Props =
  | {
      skeleton?: false;
      likes: LikeDto[];
      pagination: {
        totalPage: number;
        page: number;
        searchParams: Record<string, string>;
      };
    }
  | {
      skeleton: true;
      page: number;
    };
export function LikesPresenter(props: Props) {
  if (!props.skeleton && !props.likes.length) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        まだいいねはありません
      </div>
    );
  }

  return (
    <div>
      <ul>
        {props.skeleton
          ? Array.from({ length: 10 }).map((_, index) => (
              <Like skeleton key={index} />
            ))
          : props.likes.map((like) => <Like like={like} key={like.userId} />)}
      </ul>
      {props.skeleton ? (
        <Pagination
          totalPage={props.page}
          page={props.page}
          searchParams={{}}
        />
      ) : (
        <Pagination {...props.pagination} />
      )}
    </div>
  );
}

type LikeProps =
  | {
      skeleton?: false;
      like: LikeDto;
    }
  | {
      skeleton: true;
    };
function Like(props: LikeProps) {
  return (
    <li className="flex flex-col gap-1 border-b py-4 first:pt-0 last:border-b-0">
      <div className="text-xs text-muted-foreground">
        {props.skeleton ? (
          <Skeleton className="mt-1 h-3 w-20" />
        ) : (
          format(props.like.createdAt, "yyyy-MM-dd hh:MM")
        )}
      </div>
      <div className="flex items-center gap-2">
        {props.skeleton ? (
          <Skeleton className="size-8 rounded-full" />
        ) : (
          <Avatar name={props.like.name} src={props.like.avatarUrl} />
        )}

        <div>
          {props.skeleton ? <Skeleton className="h-4 w-20" /> : props.like.name}
        </div>
      </div>
    </li>
  );
}
