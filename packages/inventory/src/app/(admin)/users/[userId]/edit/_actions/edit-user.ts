import type { User } from "@/app/_mocks/users";

export async function editUser(
	_userId: string,
	_user: Omit<User, "userId" | "createdAt" | "updatedAt">,
) {
	await new Promise((resolve) => setTimeout(resolve, 300));
}
