"use server";

import { mockEmployees } from "@/app/_mocks/employees";
import {
	type User,
	mockUsers,
	userRoles,
	userStatuses,
} from "@/app/_mocks/users";
import { type Pagination, PaginationItemCount } from "@/lib/pagination";
import { OrderDirection } from "../../../../lib/order";
import { type UserOrder, UserOrderField } from "../order";
import type { UserSearchQuery } from "../search-query";

// ページネーション用の型定義
interface PaginationResult {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// 検索結果の型定義
interface UserSearchResult {
	items: User[];
	pagination: PaginationResult;
}

export type Condition = {
	pagination: Pagination;
	searchQuery: UserSearchQuery;
	order: UserOrder;
};
export async function getUsers(
	condition: Condition,
): Promise<UserSearchResult> {
	const { pagination, searchQuery, order } = condition;

	// クエリを安全に文字列に変換
	const safeQuery =
		typeof searchQuery.query === "string"
			? searchQuery.query.toLowerCase()
			: "";

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
		const matchesRole =
			!searchQuery.role ||
			searchQuery.role === "all" ||
			user.role === searchQuery.role;

		// ステータスでフィルタリング
		const matchesStatus =
			!searchQuery.status ||
			searchQuery.status === "all" ||
			user.status === searchQuery.status;

		return matchesQuery && matchesRole && matchesStatus;
	});

	// ソート
	if (order.field) {
		filteredUsers = filteredUsers.sort((a, b) => {
			// 各フィールドタイプに合わせた比較を行う
			switch (order.field) {
				case UserOrderField.UserCode:
					return order.direction === OrderDirection.Asc
						? a.id.localeCompare(b.id)
						: b.id.localeCompare(a.id);
				case UserOrderField.Email:
					return order.direction === OrderDirection.Asc
						? a.email.localeCompare(b.email)
						: b.email.localeCompare(a.email);
				case UserOrderField.Role:
					return order.direction === OrderDirection.Asc
						? a.role.localeCompare(b.role)
						: b.role.localeCompare(a.role);
				case UserOrderField.Status:
					return order.direction === OrderDirection.Asc
						? a.status.localeCompare(b.status)
						: b.status.localeCompare(a.status);
				case UserOrderField.Name: {
					// 名前はemployeeMapから取得する必要があるかもしれません
					const nameA = a.employeeId ? employeeMap.get(a.employeeId) || "" : "";
					const nameB = b.employeeId ? employeeMap.get(b.employeeId) || "" : "";
					return order.direction === OrderDirection.Asc
						? nameA.localeCompare(nameB)
						: nameB.localeCompare(nameA);
				}
				case UserOrderField.LastLogin: {
					const dateA = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
					const dateB = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
					return order.direction === OrderDirection.Asc
						? dateA - dateB
						: dateB - dateA;
				}
				default: {
					// デフォルトの比較
					const valueA = String(a[order.field as keyof User] || "");
					const valueB = String(b[order.field as keyof User] || "");
					return order.direction === OrderDirection.Asc
						? valueA.localeCompare(valueB)
						: valueB.localeCompare(valueA);
				}
			}
		});
	}

	// 総件数
	const total = filteredUsers.length;

	// 総ページ数の計算
	const totalPages = Math.ceil(total / PaginationItemCount);

	// ページネーション
	const start = (pagination.page - 1) * PaginationItemCount;
	const end = start + PaginationItemCount;
	const paginatedUsers = filteredUsers.slice(start, end);

	return {
		items: paginatedUsers,
		pagination: {
			total,
			page: pagination.page,
			limit: PaginationItemCount,
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
