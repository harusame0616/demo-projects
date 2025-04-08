import type { User } from "../../types";

export async function createUser(
	_: Omit<User, "userId" | "createdAt" | "updatedAt">,
) {
	await new Promise((resolve) => setTimeout(resolve, 500));
}
