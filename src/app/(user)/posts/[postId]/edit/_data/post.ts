"use server";

import { createClient } from "@/lib/supabase/server";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export type PostDto = {
  postId: string;
  title: string;
  text: string;
  createdAt: string;
  commentCount: number;
  author: {
    userId: string;
    name: string;
    avatarUrl: string;
  };
  attachments: string[];
};
export async function getPost(postId: string) {
  const client = createClientServiceRole().schema("X_DEMO");
  const authClient = await createClient();
  const userResult = await authClient.auth.getUser();

  if (userResult.error) {
    throw new Error("test");
  }

  const result = await client
    .from("post")
    .select(`*`)
    .eq("postId", postId)
    .single();

  if (result.error) {
    throw new Error("error");
  }

  return {
    data: result.data,
  };
}
