import * as v from "valibot";

import { getPrismaClient } from "@/lib/prisma";

import { Role, roleSchema } from "../role";

export type User = {
	userId: string;
	name: string;
	canPost: boolean;
	email: string;
	role: Role;
};
export async function getUsers(page: number) {
	const prisma = getPrismaClient();
	const perPage = 10;
	const [users, count] = await prisma.$transaction([
		prisma.cnlUser.findMany({
			orderBy: { registeredAt: "desc" },
			skip: (page - 1) * perPage,
			take: perPage,
		}),
		prisma.cnlUser.count(),
	]);

	return {
		users: users.map(({ userId, name, email, role, canPost }) => ({
			userId,
			email,
			name,
			canPost,
			role: v.parse(
				v.fallback(roleSchema, () => Role.Viewer.value),
				role,
			),
		})),
		totalPage: Math.ceil(count / perPage),
	};
}
