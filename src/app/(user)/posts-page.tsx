"use client";

import { format } from "date-fns";
import {
  EditIcon,
  HeartIcon,
  MessageCircleIcon,
  TrashIcon,
} from "lucide-react";
import { startTransition, useOptimistic, useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";

import { deletePost } from "./_actions/delete-post";
import { togglePostLikeAction } from "./_actions/toggle-post-like";
import { usePosts } from "./_hooks/use-posts";
import { LikesDrawer } from "./like-drawer";
import { PostDto } from "./posts";

export function PostsPage() {
  const { data, isValidating, isLoading, setSize, size } = usePosts();
  const canLoad = !isLoading && !isValidating;
  const lastFetchData = data?.at(-1);

  return (
    <div>
      {data?.map(
        (data) =>
          data && !!data.length && <Posts posts={data} key={data[0].postId} />,
      )}
      {lastFetchData && lastFetchData.length < 10 && (
        <div className="py-4 text-center text-muted-foreground" key="reach-end">
          最後まで読み込みました
        </div>
      )}
      {((lastFetchData && lastFetchData.length >= 10) ||
        lastFetchData === null) && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setSize(size + 1)}
            disabled={!canLoad}
          >
            {canLoad ? "もっと見る" : "読込中"}
          </Button>
        </div>
      )}
    </div>
  );
}

function Posts({ posts }: { posts: PostDto[] }) {
  return posts.map((post) => <Post post={post} key={post.postId} />);
}

function Post({ post }: { post: PostDto }) {
  const [deletionDialog, setDeletionDialog] = useState(false);
  const { mutate } = usePosts();
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(post.isLiked);

  async function handleClickLike() {
    startTransition(async () => {
      setOptimisticLikes((prev) => !prev);
      const result = await togglePostLikeAction(post);
      if (!result.success) {
        return;
      }

      await mutate();
    });
  }

  return (
    <div className="grid grid-cols-[auto,1fr] border-b p-4">
      <div className="pr-2">
        <Avatar src={post.author.avatarUrl} name={post.author.name} />
      </div>
      <div className="flex flex-col gap-1 text-left">
        <div className="font-bold text-muted-foreground">
          {post.author.name}
        </div>
        <div className="flex items-center gap-1 font-bold">
          {post.title}
          <span className="text-xs text-muted-foreground">
            （{format(post.createdAt, "yyyy/MM/dd hh:mm")}）
          </span>
        </div>
        <div className="whitespace-pre-wrap break-all">{post.text}</div>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <EditIcon />
            </Button>
          </div>
          <div className="flex gap-2">
            <AlertDialog
              title="投稿削除"
              description={`「${post.title}」を削除しますがよろしいですか？`}
              primaryButtonLabel={"削除する"}
              open={deletionDialog}
              onOpenChange={setDeletionDialog}
              onPrimaryButtonClick={async () => {
                await deletePost(post);
                await mutate();
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
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleClickLike}>
              <HeartIcon fill={optimisticLikes ? "#000" : "#fff"} />
            </Button>
            <LikesDrawer likes={post.likes} />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <MessageCircleIcon /> 5
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
