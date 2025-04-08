import type { Pagination, PaginationResult } from "@/lib/pagination";
import type { UserOrder } from "../order";
import type { UserSearchQuery } from "../search-query";
import { mockUsers, type User } from "@/app/_mocks/users";
import { PaginationItemCount } from "@/lib/pagination";
import { OrderDirection } from "@/lib/order";

export type GetUsersCondition = {
	pagination: Pagination;
	searchQuery: UserSearchQuery;
	order: UserOrder;
};
export async function getUsers(condition: GetUsersCondition): Promise<{
	users: User[];
	pagination: PaginationResult;
}> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	// 検索条件に基づいてフィルタリング
	let filteredUsers = [...mockUsers];

	// クエリでフィルタリング
	if (condition.searchQuery.query) {
		const query = condition.searchQuery.query.toLowerCase();
		filteredUsers = filteredUsers.filter(
			(user) =>
				user.email.toLowerCase().includes(query) ||
				user.userId.toLowerCase().includes(query),
		);
	}

	// ロールでフィルタリング
	if (condition.searchQuery.role !== "all") {
		filteredUsers = filteredUsers.filter(
			(user) => user.role === condition.searchQuery.role,
		);
	}

	// 並び順の適用
	filteredUsers.sort((a, b) => {
		const field = condition.order.field;
		const direction = condition.order.direction === OrderDirection.Asc ? 1 : -1;

		if (field === "id") {
			return a.userId.localeCompare(b.userId) * direction;
		}

		if (field === "email") {
			return a.email.localeCompare(b.email) * direction;
		}

		if (field === "role") {
			return a.role.localeCompare(b.role) * direction;
		}

		if (field === "lastLogin") {
			// lastLoginがないためcreatedAtを代用
			return (
				(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
				direction
			);
		}

		// デフォルトはユーザーID
		return a.userId.localeCompare(b.userId) * direction;
	});

	// ページネーション用の計算
	const total = filteredUsers.length;
	const page = condition.pagination.page;
	const limit = PaginationItemCount;
	const start = (page - 1) * limit;
	const end = start + limit;

	// ページングを適用
	const paginatedUsers = filteredUsers.slice(start, end);

	// 結果を返す
	return {
		users: paginatedUsers,
		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}
