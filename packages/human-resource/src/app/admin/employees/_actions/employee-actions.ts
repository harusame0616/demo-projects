"use server";

import { mockEmployees } from "@/app/_mocks/employees";
import type { Employee } from "@/app/_mocks/employees";
import { mockDepartments, mockPositions } from "@/app/_mocks/employees";
import {
	type Pagination,
	PaginationItemCount,
	type PaginationResult,
} from "@/lib/pagination";
import type { EmployeeOrder } from "../order";
import type { EmployeeSearchQuery } from "../search-query";

// 検索結果の型定義
interface EmployeeSearchResult {
	items: Employee[];
	pagination: PaginationResult;
}

// 検索パラメータの型定義
interface Condition {
	searchQuery: EmployeeSearchQuery;
	order: EmployeeOrder;
	pagination: Pagination;
}

// 従業員一覧を取得する関数（オブジェクトパラメータ版）
export async function getEmployees(
	condition: Condition,
): Promise<EmployeeSearchResult> {
	const { searchQuery, order, pagination } = condition;

	// クエリを安全に文字列に変換
	const safeQuery =
		typeof searchQuery.query === "string"
			? searchQuery.query.toLowerCase()
			: "";

	// 検索条件に基づいてフィルタリング
	let filteredEmployees = mockEmployees.filter((employee) => {
		// 検索クエリでフィルタリング（名前、メールアドレス）
		const matchesQuery =
			!searchQuery.query ||
			employee.name.toLowerCase().includes(safeQuery) ||
			employee.email.toLowerCase().includes(safeQuery);

		// 部署でフィルタリング
		const matchesDepartment =
			!searchQuery.department ||
			searchQuery.department === "all" ||
			employee.department === searchQuery.department;

		// 役職でフィルタリング
		const matchesPosition =
			!searchQuery.position ||
			searchQuery.position === "all" ||
			employee.position === searchQuery.position;

		return matchesQuery && matchesDepartment && matchesPosition;
	});

	// ソート
	if (order.field) {
		filteredEmployees = filteredEmployees.sort((a, b) => {
			// 型安全にアクセス
			const valueA = order.field in a ? a[order.field as keyof Employee] : "";
			const valueB = order.field in b ? b[order.field as keyof Employee] : "";

			if (typeof valueA === "string" && typeof valueB === "string") {
				return order.direction === "asc"
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			}

			// 数値型の場合
			if (typeof valueA === "number" && typeof valueB === "number") {
				return order.direction === "asc" ? valueA - valueB : valueB - valueA;
			}

			// デフォルトの比較（文字列化して比較）
			const strA = String(valueA);
			const strB = String(valueB);

			return order.direction === "asc"
				? strA.localeCompare(strB)
				: strB.localeCompare(strA);
		});
	}

	// 総件数

	// 総ページ数の計算
	const totalPages = Math.ceil(filteredEmployees.length / PaginationItemCount);

	// ページネーション
	const start = (pagination.page - 1) * PaginationItemCount;
	const end = start + PaginationItemCount;
	const paginatedEmployees = filteredEmployees.slice(start, end);

	return {
		items: paginatedEmployees,
		pagination: {
			total: filteredEmployees.length,
			page: pagination.page,
			limit: PaginationItemCount,
			totalPages,
		},
	};
}

// 指定したIDの従業員を取得する関数
export async function getEmployeeById(
	id: string,
): Promise<Employee | undefined> {
	return mockEmployees.find((employee) => employee.id === id);
}

// 部署一覧を取得する関数
export async function getDepartments() {
	return mockDepartments;
}

// 役職一覧を取得する関数
export async function getPositions() {
	return mockPositions;
}

// 従業員を作成する関数
export async function createEmployee(
	employee: Omit<Employee, "id">,
): Promise<Employee> {
	// モックデータなので、IDは適当に生成
	const newEmployee: Employee = {
		...employee,
		id: `EMP${String(mockEmployees.length + 1).padStart(3, "0")}`,
	};

	// モックデータに追加
	mockEmployees.push(newEmployee);

	return newEmployee;
}
