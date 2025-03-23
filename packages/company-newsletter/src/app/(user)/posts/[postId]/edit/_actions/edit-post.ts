"use server";

import * as v from "valibot";

import { Role } from "@/app/admin/(private)/users/role";
import { createAction } from "@/lib/next-file/server-action";
import { postTextSchema, postTitleSchema } from "@/lib/post";
import { getPrismaClient } from "@/lib/prisma";
import { fail, succeed } from "@/lib/result";
import { createClientServiceRole } from "@/lib/supabase/service-role";

export const editPost = createAction(
	async (params, { user }) => {
		if (!user) {
			return fail("ログインが必要です。");
		}
		const client = createClientServiceRole();

		try {
			const prisma = getPrismaClient();
			await prisma.$transaction(async (tx) => {
				const post = await tx.cnlPost.findUnique({
					where: { postId: params.postId },
				});

				if (!post) {
					throw new Error("投稿が見つかりません");
				}

				if (post.userId !== user.userId && user.role !== Role.Admin.value) {
					throw new Error("権限がありません");
				}

				const newAttachments = [
					...post.attachments.filter(
						(attachment: string) =>
							!params.deleteAttachments.includes(attachment),
					),
					...params.attachments,
				];

				await tx.cnlPost.update({
					where: { postId: params.postId },
					data: {
						title: params.title,
						text: params.text,
						attachments: newAttachments,
						canComment: params.canComment,
					},
				});

				if (params.deleteAttachments.length) {
					const removeResult = await client.storage
						.from("attachment")
						.remove(params.deleteAttachments);
					if (removeResult.error) {
						throw new Error("添付ファイルの削除に失敗しました");
					}
				}
			});
		} catch (e: unknown) {
			if (e instanceof Error) {
				return fail(e.message);
			}

			return fail("エラーが発生しました");
		}

		return succeed();
	},
	{
		inputSchema: {
			postId: v.pipe(v.string()),
			title: postTitleSchema,
			text: postTextSchema,
			canComment: v.boolean(),
			deleteAttachments: v.array(v.string()),
			attachments: v.array(
				v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
			),
		},
		revalidatePaths: ["/"],
	},
);
