"use server";

import * as v from "valibot";

import { createClient } from "@/lib/supabase/server";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export type PostDto = {
  postId: string;
  title: string;
  text: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  author: {
    userId: string;
    name: string;
    avatarUrl: string;
  };
};

export async function getPosts({ page }: { page: number }): Promise<PostDto[]> {
  const client = createClientServiceRole().schema("X_DEMO");
  const authClient = await createClient();
  const userResult = await authClient.auth.getUser();

  if (userResult.error) {
    throw new Error("test");
  }

  const result = await client
    .from("post")
    .select(
      `postId, title, text, attachments, createdAt, userId, profile!post_userId_fkey1(*), likes:post_like(*)`,
    )
    // .select(`postId, title, text, attachments, createdAt, likes:post_like(*)`)
    .order("createdAt", { ascending: false })
    .range(page * 10, (page + 1) * 10 - 1);
  console.log(result, result.error);

  if (result.error) {
    throw new Error("error");
  }

  const postsDto = result.data.map((post) => {
    const likeCount = post.likes.length || 0;
    const isLiked = post.likes.some(
      (like) => like.userId === userResult.data.user.id,
    );
    return {
      postId: post.postId,
      title: post.title,
      text: post.text,
      createdAt: post.createdAt,
      likeCount,
      isLiked,
      author: v.parse(
        v.object({
          userId: v.string(),
          name: v.string(),
          avatarUrl: v.string(),
        }),
        post.profile,
      ),
    };
  });

  return postsDto;
}
