import { mockUsers } from "@/app/_mocks/users";

export async function getUserById(userId: string) {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return mockUsers.find((user) => user.userId === userId);
}
