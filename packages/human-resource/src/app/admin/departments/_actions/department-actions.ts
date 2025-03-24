"use server";

import { departmentData, type Department } from "../_data/departments-data";

export type DepartmentSearchParams = {
	query?: string;
	sort?: keyof Department;
	order?: "asc" | "desc";
	page?: string;
};

/**
 * 部署データを検索・ソートするサーバーアクション
 */
export async function getDepartments(
	searchParams: DepartmentSearchParams = {},
) {
	const { query = "", sort = "name", order = "asc" } = searchParams;

	// フィルター処理
	let filteredData = [...departmentData];

	// 検索クエリでフィルタリング
	if (query) {
		filteredData = filteredData.filter((item) =>
			item.name.toLowerCase().includes(query.toLowerCase()),
		);
	}

	// ソート処理
	filteredData.sort((a, b) => {
		const sortKey = sort as keyof Department;

		// null/undefinedチェックをして安全に比較
		const aValue = a[sortKey];
		const bValue = b[sortKey];

		if (aValue !== undefined && bValue !== undefined) {
			if (aValue === null && bValue !== null) {
				return order === "asc" ? -1 : 1;
			}
			if (aValue !== null && bValue === null) {
				return order === "asc" ? 1 : -1;
			}
			if (aValue === null && bValue === null) {
				return 0;
			}

			// ここで両方nullでないことが確定しているので安全に比較できる
			const nonNullAValue = aValue as Exclude<typeof aValue, null>;
			const nonNullBValue = bValue as Exclude<typeof bValue, null>;

			if (nonNullAValue < nonNullBValue) {
				return order === "asc" ? -1 : 1;
			}
			if (nonNullAValue > nonNullBValue) {
				return order === "asc" ? 1 : -1;
			}
		}
		return 0;
	});

	// ページネーションのために合計件数を取得
	const totalItems = filteredData.length;

	// ページネーションの適用
	const page = searchParams.page ? Number.parseInt(searchParams.page, 10) : 1;
	const limit = 20; // 1ページあたり20件
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	// ページに表示するデータを抽出
	const paginatedData = filteredData.slice(startIndex, endIndex);

	// ページネーション情報を含めて返す
	return {
		items: paginatedData,
		pagination: {
			total: totalItems,
			page,
			limit,
			totalPages: Math.ceil(totalItems / limit),
		},
	};
}

/**
 * IDに基づいて部署を取得
 */
export async function getDepartmentById(
	id: string,
): Promise<Department | null> {
	return departmentData.find((item) => item.id === id) || null;
}

/**
 * 新しい部署を作成
 */
export async function createDepartment(
	data: Omit<Department, "id" | "createdAt">,
): Promise<Department> {
	const newItem: Department = {
		...data,
		id: `dept-${Date.now()}`,
		createdAt: new Date().toISOString().split("T")[0],
	};

	departmentData.push(newItem);
	return newItem;
}

/**
 * 既存の部署を更新
 */
export async function updateDepartment(
	id: string,
	data: Partial<Omit<Department, "id" | "createdAt">>,
): Promise<Department | null> {
	const index = departmentData.findIndex((item) => item.id === id);
	if (index === -1) return null;

	const updatedItem = { ...departmentData[index], ...data };
	departmentData[index] = updatedItem;

	return updatedItem;
}

/**
 * 部署を削除
 */
export async function deleteDepartment(id: string): Promise<boolean> {
	const index = departmentData.findIndex((item) => item.id === id);
	if (index === -1) return false;

	departmentData.splice(index, 1);
	return true;
}
