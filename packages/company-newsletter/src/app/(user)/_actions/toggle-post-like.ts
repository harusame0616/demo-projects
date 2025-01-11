"use server";

import { fail } from "assert";
import * as v from "valibot";

import { createAction } from "@/lib/next-file/server-action";
import { getPrismaClient } from "@/lib/prisma";
import { succeed } from "@/lib/result";

export const togglePostLikeAction = createAction(
  async (params, { user }) => {
    if (!user) {
      return fail("ログインが必要です");
    }

    const prisma = getPrismaClient();
    const id = { postId: params.postId, userId: user.userId };
    const like = await prisma.cnlPostLike.findUnique({
      where: { postId_userId: id },
    });

    if (like) {
      await prisma.cnlPostLike.delete({ where: { postId_userId: id } });
    } else {
      await prisma.cnlPostLike.create({ data: id });
    }

    return succeed();
  },
  {
    inputSchema: { postId: v.pipe(v.string()) },
    // revalidatePaths: ["/"],
  },
);
