"use server";

import { mockEmployees } from "@/app/_mocks/employees";
import {
	type User,
	type UserRole,
	type UserStatus,
	mockUsers,
	userRoles,
	userStatuses,
} from "@/app/_mocks/users";

// ページネーション用の型定義
interface Pagination {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// 検索結果の型定義
interface UserSearchResult {
	items: User[];
	pagination: Pagination;
}

// 検索パラメータの型定義
interface UserSearchParams {
	searchQuery?: string | null;
	role?: string;
	status?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	page?: number;
	limit?: number;
}

// ユーザー一覧を取得する関数
export async function getUsers(
	params: UserSearchParams,
): Promise<UserSearchResult> {
	const {
		searchQuery,
		role,
		status,
		sortBy = "id",
		sortOrder = "asc",
		page = 1,
		limit = 20,
	} = params;

	// クエリを安全に文字列に変換
	const safeQuery =
		typeof searchQuery === "string" ? searchQuery.toLowerCase() : "";

	// 従業員IDと名前のマッピングを作成
	const employeeMap = new Map(
		mockEmployees.map((employee) => [employee.id, employee.name.toLowerCase()]),
	);

	// 検索条件に基づいてフィルタリング
	let filteredUsers = mockUsers.filter((user) => {
		// 検索クエリでフィルタリング（ID、メールアドレス、従業員ID）
		let matchesQuery = true;
		if (safeQuery) {
			// ユーザーID、メールアドレス、従業員IDで検索
			const matchesUserData =
				user.id.toLowerCase().includes(safeQuery) ||
				user.email.toLowerCase().includes(safeQuery) ||
				user.employeeId?.toLowerCase()?.includes(safeQuery);

			// 従業員名で検索
			let matchesEmployeeName = false;
			if (user.employeeId) {
				const employeeName = employeeMap.get(user.employeeId);
				if (employeeName) {
					matchesEmployeeName = employeeName.includes(safeQuery);
				}
			}

			matchesQuery = matchesUserData || matchesEmployeeName;
		}

		// 役割でフィルタリング
		const matchesRole = !role || role === "all" || user.role === role;

		// ステータスでフィルタリング
		const matchesStatus = !status || status === "all" || user.status === status;

		return matchesQuery && matchesRole && matchesStatus;
	});

	// ソート
	if (sortBy) {
		filteredUsers = filteredUsers.sort((a, b) => {
			// 型安全にアクセス
			const valueA = sortBy in a ? a[sortBy as keyof User] : "";
			const valueB = sortBy in b ? b[sortBy as keyof User] : "";

			if (typeof valueA === "string" && typeof valueB === "string") {
				return sortOrder === "asc"
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			}

			// 日付の比較（lastLogin, createdAt, updatedAt）
			if (
				sortBy === "lastLogin" ||
				sortBy === "createdAt" ||
				sortBy === "updatedAt"
			) {
				const dateA = valueA ? new Date(valueA as string).getTime() : 0;
				const dateB = valueB ? new Date(valueB as string).getTime() : 0;
				return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
			}

			// デフォルトの比較（文字列化して比較）
			const strA = String(valueA);
			const strB = String(valueB);

			return sortOrder === "asc"
				? strA.localeCompare(strB)
				: strB.localeCompare(strA);
		});
	}

	// 総件数
	const total = filteredUsers.length;

	// 総ページ数の計算
	const totalPages = Math.ceil(total / limit);

	// ページネーション
	const start = (page - 1) * limit;
	const end = start + limit;
	const paginatedUsers = filteredUsers.slice(start, end);

	return {
		items: paginatedUsers,
		pagination: {
			total,
			page,
			limit,
			totalPages,
		},
	};
}

// 指定したIDのユーザーを取得する関数
export async function getUserById(id: string): Promise<User | undefined> {
	return mockUsers.find((user) => user.id === id);
}

// 役割一覧を取得する関数
export async function getUserRoles() {
	return userRoles;
}

// ステータス一覧を取得する関数
export async function getUserStatuses() {
	return userStatuses;
}

// ユーザーを作成する関数
export async function createUser(
	user: Omit<User, "id" | "createdAt" | "updatedAt">,
): Promise<User> {
	// モックデータなので、IDは適当に生成
	const newUser: User = {
		...user,
		id: String(mockUsers.length + 1).padStart(3, "0"),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	// モックデータに追加
	mockUsers.push(newUser);

	return newUser;
}

// ユーザーを更新する関数
export async function updateUser(
	id: string,
	userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
): Promise<User | null> {
	const userIndex = mockUsers.findIndex((user) => user.id === id);

	if (userIndex === -1) {
		return null;
	}

	const updatedUser = {
		...mockUsers[userIndex],
		...userData,
		updatedAt: new Date().toISOString(),
	};

	mockUsers[userIndex] = updatedUser;

	return updatedUser;
}

// ユーザーを削除する関数
export async function deleteUser(id: string): Promise<boolean> {
	const userIndex = mockUsers.findIndex((user) => user.id === id);

	if (userIndex === -1) {
		return false;
	}

	mockUsers.splice(userIndex, 1);

	return true;
}
