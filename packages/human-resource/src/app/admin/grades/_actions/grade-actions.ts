"use server";

import { type Grade, gradeData } from "../_data/grades-data";

export interface GradeSearchParams {
	query?: string;
	sort?: keyof Grade | "salaryMin" | "salaryMax";
	order?: "asc" | "desc";
	page?: string;
}

/**
 * グレードデータを検索・ソートするサーバーアクション
 */
export async function getGrades(searchParams: GradeSearchParams = {}) {
	const { query = "", sort = "id", order = "asc" } = searchParams;

	// フィルター処理
	let filteredData = [...gradeData];

	// 検索クエリでフィルタリング
	if (query) {
		filteredData = filteredData.filter(
			(item) =>
				item.name.toLowerCase().includes(query.toLowerCase()) ||
				item.description.toLowerCase().includes(query.toLowerCase()),
		);
	}

	// ソート処理
	filteredData.sort((a, b) => {
		let aValue: unknown = a[sort as keyof Grade];
		let bValue: unknown = b[sort as keyof Grade];

		// 給与最小・最大値でのソート対応
		if (sort === "salaryMin") {
			aValue = a.salaryRange.min;
			bValue = b.salaryRange.min;
		} else if (sort === "salaryMax") {
			aValue = a.salaryRange.max;
			bValue = b.salaryRange.max;
		}

		// 比較のための型変換
		if (
			(typeof aValue === "number" && typeof bValue === "number") ||
			(typeof aValue === "string" && typeof bValue === "string")
		) {
			if (aValue < bValue) {
				return order === "asc" ? -1 : 1;
			}
			if (aValue > bValue) {
				return order === "asc" ? 1 : -1;
			}
		}
		return 0;
	});

	// ページネーション
	const page = searchParams.page ? Number.parseInt(searchParams.page, 10) : 1;
	const limit = 20; // 1ページあたりの表示数
	const total = filteredData.length;
	const totalPages = Math.ceil(total / limit);
	const start = (page - 1) * limit;
	const end = start + limit;
	const paginatedData = filteredData.slice(start, end);

	return {
		items: paginatedData,
		pagination: {
			total,
			page,
			limit,
			totalPages,
		},
	};
}

/**
 * IDに基づいてグレードを取得
 */
export async function getGradeById(id: string): Promise<Grade | null> {
	return gradeData.find((item) => item.id === id) || null;
}

/**
 * 新しいグレードを作成
 */
export async function createGrade(
	data: Omit<Grade, "id" | "createdAt" | "employeeCount">,
): Promise<Grade> {
	const newItem: Grade = {
		...data,
		id: `grade-${Date.now()}`,
		createdAt: new Date().toISOString().split("T")[0],
		employeeCount: 0,
	};

	gradeData.push(newItem);
	return newItem;
}

/**
 * 既存のグレードを更新
 */
export async function updateGrade(
	id: string,
	data: Partial<Omit<Grade, "id" | "createdAt" | "employeeCount">>,
): Promise<Grade | null> {
	const index = gradeData.findIndex((item) => item.id === id);
	if (index === -1) return null;

	const updatedItem = { ...gradeData[index], ...data };
	gradeData[index] = updatedItem;

	return updatedItem;
}

/**
 * グレードを削除
 */
export async function deleteGrade(id: string): Promise<boolean> {
	const index = gradeData.findIndex((item) => item.id === id);
	if (index === -1) return false;

	gradeData.splice(index, 1);
	return true;
}
