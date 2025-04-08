"use server";

export async function deleteUser(_userId: string) {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return true;
}
