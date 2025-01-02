"use server";

import { createClient } from "@/lib/supabase/server";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export type PostDto = {
  postId: string;
  title: string;
  text: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
};
export async function getPosts({ page }: { page: number }): Promise<PostDto[]> {
  console.log({ page });
  const client = createClientServiceRole().schema("X_DEMO");
  const authClient = await createClient();
  const userResult = await authClient.auth.getUser();
  console.log("wait");
  console.log("resume");

  if (userResult.error) {
    throw new Error("test");
  }

  const result = await client
    .from("post")
    .select(`postId, title, text, attachments, createdAt, likes:post_like(*)`)
    .order("createdAt", { ascending: false })
    .range(page * 10, (page + 1) * 10 - 1);

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
    };
  });

  return postsDto;
}
