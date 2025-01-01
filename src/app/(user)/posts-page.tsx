"use client";

import { format } from "date-fns";
import {
  EditIcon,
  HeartIcon,
  MessageCircleIcon,
  TrashIcon,
} from "lucide-react";

import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";

import { usePosts } from "./_hooks/use-posts";
import { PostDto } from "./posts";

export function PostsPage() {
  const { data, isLoading, isValidating, setSize, size } = usePosts();

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
  return (
    <div className="grid grid-cols-[auto,1fr] border-b p-4">
      <div className="pr-2">
        {/* <Avatar src={post.user.icon} alt={post.user.name} name={""} /> */}
        <Avatar src={"/user.png"} alt={"test"} name={""} />
      </div>
      <div className="flex flex-col gap-1 text-left">
        {/* <div className="font-bold">{post.user.name}</div> */}
        <div className="font-bold text-muted-foreground">user</div>
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
