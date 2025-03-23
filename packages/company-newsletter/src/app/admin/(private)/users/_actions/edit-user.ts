import { getPrismaClient } from "@/lib/prisma";
import { type Result, fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

import type { Role } from "../role";

type EditUserParams = {
	userId: string;
	name: string;
	email: string;
	canPost: boolean;
	password: string;
	role: Role;
};
export async function editUser({
	userId,
	name,
	email,
	canPost,
	password,
	role,
}: EditUserParams): Promise<Result<undefined>> {
	const supabase = await createClient();

	const prisma = getPrismaClient();
	try {
		await prisma.$transaction(async (tx) => {
			await tx.cnlUser.update({
				where: { userId },
				data: { name, email, role, canPost },
			});
			const result = await supabase.auth.admin.updateUserById(userId, {
				user_metadata: { name, role, canPost },
				password: password || undefined,
				email,
				email_confirm: true,
			});

			if (result.error) {
				throw result.error;
			}
		});
	} catch {
		return fail("ユーザーの更新に失敗しました。");
	}

	return succeed();
}
