"use client";

import { format } from "date-fns";
import {
  EditIcon,
  HeartIcon,
  MessageCircleIcon,
  TrashIcon,
} from "lucide-react";
import useSWRInfinite from "swr/infinite";

import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";

import { getPosts, Post } from "./posts";

export function PostsPage() {
  // const [lastPostIds, setLastPostIds] = useState<(string | null)[]>([]);
  const { data, size, isLoading, isValidating, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // 最後に到達した
      if (previousPageData && !previousPageData.data) return null;

      // 最初のページでは、`previousPageData` がありません
      if (pageIndex === 0) return { cursor: null };

      // API のエンドポイントにカーソルを追加します
      return { cursor: previousPageData.next };
    },
    (params) => getPosts(params),
  );

  const canLoad = !isLoading && !isValidating;

  return (
    <div>
      {data?.map(({ data }, i) => <Posts posts={data} key={i} />)}
      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          onClick={() => setSize(size + 1)}
          disabled={!canLoad}
        >
          {canLoad ? "もっと見る" : "読込中"}
        </Button>
      </div>
    </div>
  );
}

function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

function Post({ post }: { post: Post }) {
  return (
    <div key={post.id} className="grid grid-cols-[auto,1fr] border-b p-4">
      <div className="pr-2">
        <Avatar src={post.user.icon} alt={post.user.name} name={""} />
      </div>
      <div className="flex flex-col gap-1 text-left">
        <div className="font-bold">{post.user.name}</div>
        <div className="text-xs text-muted-foreground">
          {format(post.postedAt, "yyyy/MM/dd hh:mm")}
        </div>
        <div> {post.comment}</div>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <EditIcon />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <TrashIcon />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <HeartIcon />5
            </Button>
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
