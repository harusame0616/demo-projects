"use server";

import * as v from "valibot";

import { createAction } from "@/lib/next-file/server-action";
import { getPrismaClient } from "@/lib/prisma";
import { succeed } from "@/lib/result";

export const deletePost = createAction(
  async (params) => {
    const prisma = getPrismaClient();
    await prisma.cnlPost.delete({ where: { postId: params.postId } });
    return succeed();
  },
  {
    inputSchema: { postId: v.pipe(v.string()) },
    revalidatePaths: ["/"],
  },
);
