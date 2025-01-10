"use server";

import { createClient } from "@/lib/supabase/server";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export type LikeDto = {
  createdAt: string;
  userId: string;
  name: string;
  avatarUrl: string;
  postId: string;
};
export async function getLikes({
  page,
  postId,
}: {
  page: number;
  postId: string;
}): Promise<{
  data: LikeDto[];
  pagination: {
    totalPage: number;
    page: number;
  };
}> {
  const client = createClientServiceRole().schema("X_DEMO");
  const authClient = await createClient();
  const userResult = await authClient.auth.getUser();

  if (userResult.error) {
    throw new Error("test");
  }

  const result = await client
    .from("post_like")
    .select(`postId, userId, createdAt, profile(*)`, {
      count: "exact",
    })
    .eq("postId", postId)
    .order("createdAt", { ascending: false })
    .range((page - 1) * 10, page * 10);

  if (result.error) {
    throw new Error("error");
  }

  const likesDto = result.data.map(
    (like) =>
      ({
        ...like.profile,
        ...like,
      }) as unknown as LikeDto,
  );

  return {
    data: likesDto,
    pagination: {
      totalPage: result.count ? Math.ceil(result.count / 10) : 1,
      page,
    },
  };
}
