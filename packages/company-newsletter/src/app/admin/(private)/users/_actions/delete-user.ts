import { getPrismaClient } from "@/lib/prisma";
import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

type DeleteUserParams = { userId: string };
export async function deleteUser({ userId }: DeleteUserParams) {
	const supabase = await createClient();

	const prisma = getPrismaClient();
	try {
		await prisma.$transaction(async (tx) => {
			await tx.cnlUser.delete({ where: { userId } });
			const result = await supabase.auth.admin.deleteUser(userId);
			if (result.error) {
				throw result.error;
			}
		});
	} catch {
		return fail("ユーザーの削除に失敗しました");
	}

	return succeed();
}
