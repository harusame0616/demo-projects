"use server";

import * as v from "valibot";

import { createAction } from "@/lib/next-file/server-action";
import { getPrismaClient } from "@/lib/prisma";
import { succeed } from "@/lib/result";

export const deleteCommentAction = createAction(
  async (params) => {
    const prisma = getPrismaClient();
    await prisma.cnlPostComment.delete({
      where: { commentId: params.commentId },
    });

    return succeed();
  },
  {
    inputSchema: { commentId: v.pipe(v.string()) },
    revalidatePaths: ["/"],
  },
);
