"use server";

import { fail } from "assert";
import { uuidv7 } from "uuidv7";

import { idSchema } from "@/lib/id";
import { createAction } from "@/lib/next-file/server-action";
import { attachmentsSchema, postTextSchema } from "@/lib/post";
import { getPrismaClient } from "@/lib/prisma";
import { succeed } from "@/lib/result";

export const commentNewComment = createAction(
  async (params, { user }) => {
    if (!user) {
      return fail("ログインしてください");
    }

    const prisma = getPrismaClient();
    await prisma.cnlPostComment.create({
      data: {
        commentId: uuidv7(),
        postId: params.postId,
        userId: user.userId,
        text: params.text,
        attachments: params.attachments,
        commentedAt: new Date(),
      },
    });

    return succeed();
  },
  {
    inputSchema: {
      postId: idSchema,
      text: postTextSchema,
      attachments: attachmentsSchema,
    },
    revalidatePaths: ["/posts/[postId]/comments"],
    redirectTo: (params) => `/posts/${params.postId}/comments`,
  },
);
