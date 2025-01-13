import { format } from "date-fns";
import { EditIcon } from "lucide-react";
import { Suspense } from "react";

import { AttachmentContainer } from "@/app/(user)/_components/post/attachment-container";
import { Avatar } from "@/components/avatar/avatar";
import { Link } from "@/components/link";
import { Skeleton } from "@/components/ui/skeleton";

import { CommentDto } from "../_data/comments";
import { DeleteButton } from "./delete-button/delete-button";

type Props =
  | {
      skeleton?: boolean;
      comment: CommentDto;
    }
  | {
      skeleton: true;
    };
export function Comment(props: Props) {
  return (
    <div className="grid grid-cols-[auto,1fr] border-b p-4">
      <div className="pr-2">
        {props.skeleton ? (
          <Skeleton className="size-8 rounded-full" />
        ) : (
          <Avatar
            src={props.comment.author.avatarUrl}
            name={props.comment.author.name}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 text-left">
        {props.skeleton ? (
          <Skeleton className="mt-1 h-4 w-20" />
        ) : (
          <div className="font-bold text-muted-foreground">
            {props.comment.author.name}
          </div>
        )}
        {props.skeleton ? (
          <Skeleton className="mt-2 h-4 w-40" />
        ) : (
          <div className="flex items-center gap-1 font-bold">
            <span className="text-xs text-muted-foreground">
              {format(props.comment.createdAt, "yyyy/MM/dd hh:mm")}
            </span>
          </div>
        )}
        {props.skeleton ? (
          <div className="mt-1">
            <Skeleton className="mt-1 h-5 w-full max-w-[240px]" />
            <Skeleton className="mt-1 h-5 w-full max-w-[280px]" />
            <Skeleton className="mt-1 h-5 w-full max-w-[180px]" />
          </div>
        ) : (
          <div className="whitespace-pre-wrap break-all">
            {props.comment.text}
          </div>
        )}
        <div className="rounded-md border p-4 empty:hidden">
          {props.skeleton
            ? null
            : props.comment.attachments.map((attachment) => (
                <Suspense fallback={"loading"} key={attachment}>
                  <AttachmentContainer path={attachment} key={attachment} />
                </Suspense>
              ))}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-4">
          {props.skeleton ? (
            <Skeleton className="m-1 h-7 w-[200px]" />
          ) : (
            props.comment.isEditable && (
              <>
                <div className="flex gap-2">
                  <Link
                    href={`/posts/${props.comment.postId}/comments/${props.comment.commentId}/edit`}
                  >
                    <EditIcon className="m-3 size-4" />
                  </Link>
                </div>
                <div className="flex gap-2">
                  <DeleteButton commentId={props.comment.commentId} />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
