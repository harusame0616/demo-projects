"use client";

import { format } from "date-fns";
import { EditIcon, MessageCircleIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { deletePost } from "../../_actions/delete-post";
import { PostDto } from "../../_data/posts";
import { LikeOperator } from "./like-operator";

type Props =
  | {
      skeleton?: boolean;
      post: PostDto;
    }
  | {
      skeleton: true;
    };
export function Post(props: Props) {
  const [deletionDialog, setDeletionDialog] = useState(false);
  const router = useRouter();

  return (
    <div className="grid grid-cols-[auto,1fr] border-b p-4">
      <div className="pr-2">
        {props.skeleton ? (
          <Skeleton className="size-8 rounded-full" />
        ) : (
          <Avatar
            src={props.post.author.avatarUrl}
            name={props.post.author.name}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 text-left">
        {props.skeleton ? (
          <Skeleton className="mt-1 h-4 w-20" />
        ) : (
          <div className="font-bold text-muted-foreground">
            {props.post.author.name}
          </div>
        )}
        {props.skeleton ? (
          <Skeleton className="mt-2 h-4 w-40" />
        ) : (
          <div className="flex items-center gap-1 font-bold">
            {props.post.title}
            <span className="text-xs text-muted-foreground">
              （{format(props.post.createdAt, "yyyy/MM/dd hh:mm")}）
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
          <div className="whitespace-pre-wrap break-all">{props.post.text}</div>
        )}
        <div className="flex flex-wrap items-center justify-end gap-4">
          {props.skeleton ? (
            <Skeleton className="m-1 h-7 w-[200px]" />
          ) : (
            <>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <EditIcon />
                </Button>
              </div>
              <div className="flex gap-2">
                <AlertDialog
                  title="投稿削除"
                  description={
                    props.skeleton
                      ? ""
                      : `「${props.post.title}」を削除しますがよろしいですか？`
                  }
                  primaryButtonLabel={"削除する"}
                  open={deletionDialog}
                  onOpenChange={setDeletionDialog}
                  onPrimaryButtonClick={async () => {
                    if (props.skeleton) {
                      return;
                    }
                    await deletePost(props.post);
                    router.refresh();
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeletionDialog(true)}
                  type="button"
                >
                  <TrashIcon />
                </Button>
              </div>
              <LikeOperator
                isLiked={props.post.isLiked}
                likes={props.post.likes}
                postId={props.post.postId}
              />
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <MessageCircleIcon /> 5
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
