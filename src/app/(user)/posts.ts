"use server";

import { createClient } from "@/lib/supabase/server";

export type PostDto = {
  postId: string;
  title: string;
  text: string;
  createdAt: string;
};
export async function getPosts({ page }: { page: number }): Promise<PostDto[]> {
  const client = (await createClient()).schema("X_DEMO");

  const result = await client
    .from("post")
    .select("*")
    .order("createdAt", { ascending: false })
    .range(page * 10, (page + 1) * 10 - 1);

  return result.data || [];
}
