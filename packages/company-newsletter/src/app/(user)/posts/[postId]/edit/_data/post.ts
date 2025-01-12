"use server";

import { getPrismaClient } from "@/lib/prisma";
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
  const authClient = await createClient();
  const userResult = await authClient.auth.getUser();

  const prisma = getPrismaClient();
  if (userResult.error) {
    throw new Error("test");
  }

  const post = await prisma.cnlPost.findUnique({
    where: { postId },
  });

  return {
    data: post,
  };
}
