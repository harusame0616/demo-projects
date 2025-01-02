import { format } from "date-fns";

import { LikeDto } from "@/app/(user)/posts";
import { Avatar } from "@/components/avatar/avatar";

type Props = {
  likes: LikeDto[];
};
export function Likes({ likes }: Props) {
  if (!likes.length) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        まだいいねはありません
      </div>
    );
  }
  return (
    <ul>
      {likes.map((like) => (
        <li
          key={like.likeId}
          className="flex flex-col gap-1 border-b py-4 first:pt-0 last:border-b-0"
        >
          <div className="text-xs text-muted-foreground">
            {format(like.createdAt, "yyyy-MM-dd hh:MM")}
          </div>
          <div className="flex items-center gap-2">
            <Avatar name={like.profile.name} src={like.profile.avatarUrl} />
            <div>{like.profile.name}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
