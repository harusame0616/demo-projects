"use server";

import { idSchema } from "@/lib/id";
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
    inputSchema: { commentId: idSchema },
    revalidatePaths: ["/"],
  },
);
