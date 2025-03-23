import { uuidv7 } from "uuidv7";

import { getPrismaClient } from "@/lib/prisma";
import { type Result, fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

import type { Role } from "../role";

type AddUserParams = {
	name: string;
	email: string;
	canPost: boolean;
	password: string;
	role: Role;
};
export async function addUser({
	name,
	email,
	canPost,
	password,
	role,
}: AddUserParams): Promise<Result<undefined>> {
	const supabase = await createClient();

	const prisma = getPrismaClient();
	try {
		await prisma.$transaction(async (tx) => {
			const user = await tx.cnlUser.create({
				data: {
					userId: uuidv7(),
					email,
					canPost,
					name,
					role,
				},
			});

			const result = await supabase.auth.admin.createUser({
				id: user.userId,
				user_metadata: { name, role, canPost },
				password,
				email,
				email_confirm: true,
			});

			if (result.error) {
				throw result.error;
			}
		});
	} catch (e) {
		console.log(e);
		return fail("ユーザーの作成に失敗しました");
	}

	return succeed();
}
