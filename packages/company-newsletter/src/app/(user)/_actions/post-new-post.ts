"use server";

import { uuidv7 } from "uuidv7";
import * as v from "valibot";

import { createAction } from "@/lib/next-file/server-action";
import { getPrismaClient } from "@/lib/prisma";
import { fail, succeed } from "@/lib/result";

export const postNewPostAction = createAction(
  async (params, { user }) => {
    if (!user) {
      return fail("ログインが必要です");
    }

    if (!user.canPost) {
      return fail("投稿権限がありません");
    }

    const prisma = getPrismaClient();
    await prisma.cnlPost.create({
      data: {
        postId: uuidv7(),
        userId: user.userId!,
        title: params.title,
        text: params.text,
        canComment: params.canComment,
        attachments: params.attachments,
        postedAt: new Date(),
      },
    });

    return succeed();
  },
  {
    inputSchema: {
      title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      text: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      canComment: v.boolean(),
      attachments: v.array(
        v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
      ),
    },
    revalidatePaths: ["/"],
    redirectTo: "/",
  },
);
