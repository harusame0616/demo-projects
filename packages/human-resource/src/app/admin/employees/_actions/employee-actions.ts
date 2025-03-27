"use server";

import { mockEmployees } from "@/app/_mocks/employees";
import type { Employee } from "@/app/_mocks/employees";
import { mockDepartments, mockPositions } from "@/app/_mocks/employees";

// ページネーション用の型定義
interface Pagination {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// 検索結果の型定義
interface EmployeeSearchResult {
	items: Employee[];
	pagination: Pagination;
}

// 検索パラメータの型定義
interface EmployeeSearchParams {
	searchQuery?: string | null;
	department?: string;
	position?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	page?: number;
	limit?: number;
}

// 従業員一覧を取得する関数（オブジェクトパラメータ版）
export async function getEmployees(
	params: EmployeeSearchParams,
): Promise<EmployeeSearchResult> {
	const {
		searchQuery,
		department,
		position,
		sortBy = "id",
		sortOrder = "asc",
		page = 1,
		limit = 20,
	} = params;

	// クエリを安全に文字列に変換
	const safeQuery =
		typeof searchQuery === "string" ? searchQuery.toLowerCase() : "";

	// 検索条件に基づいてフィルタリング
	let filteredEmployees = mockEmployees.filter((employee) => {
		// 検索クエリでフィルタリング（名前、メールアドレス）
		const matchesQuery =
			!searchQuery ||
			employee.name.toLowerCase().includes(safeQuery) ||
			employee.email.toLowerCase().includes(safeQuery);

		// 部署でフィルタリング
		const matchesDepartment =
			!department || department === "all" || employee.department === department;

		// 役職でフィルタリング
		const matchesPosition =
			!position || position === "all" || employee.position === position;

		return matchesQuery && matchesDepartment && matchesPosition;
	});

	// ソート
	if (sortBy) {
		filteredEmployees = filteredEmployees.sort((a, b) => {
			// 型安全にアクセス
			const valueA = sortBy in a ? a[sortBy as keyof Employee] : "";
			const valueB = sortBy in b ? b[sortBy as keyof Employee] : "";

			if (typeof valueA === "string" && typeof valueB === "string") {
				return sortOrder === "asc"
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			}

			// 数値型の場合
			if (typeof valueA === "number" && typeof valueB === "number") {
				return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
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
	const total = filteredEmployees.length;

	// 総ページ数の計算
	const totalPages = Math.ceil(total / limit);

	// ページネーション
	const start = (page - 1) * limit;
	const end = start + limit;
	const paginatedEmployees = filteredEmployees.slice(start, end);

	return {
		items: paginatedEmployees,
		pagination: {
			total,
			page,
			limit,
			totalPages,
		},
	};
}

// 従業員一覧を取得する関数（互換性のための元のバージョンを維持）
export async function getEmployeesList(
	query?: string | null,
	department?: string,
	position?: string,
): Promise<Employee[]> {
	// クエリを安全に文字列に変換
	const safeQuery = typeof query === "string" ? query.toLowerCase() : "";

	// 検索条件に基づいてフィルタリング
	return mockEmployees.filter((employee) => {
		// 検索クエリでフィルタリング（名前、メールアドレス）
		const matchesQuery =
			!query ||
			employee.name.toLowerCase().includes(safeQuery) ||
			employee.email.toLowerCase().includes(safeQuery);

		// 部署でフィルタリング
		const matchesDepartment =
			!department || department === "all" || employee.department === department;

		// 役職でフィルタリング
		const matchesPosition =
			!position || position === "all" || employee.position === position;

		return matchesQuery && matchesDepartment && matchesPosition;
	});
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
