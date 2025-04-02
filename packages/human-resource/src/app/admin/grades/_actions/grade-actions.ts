"use server";

import { OrderDirection } from "@/lib/order";
import type { Pagination } from "@/lib/pagination";
import { type Grade, gradeData } from "../_data/grades-data";
import type { GradeSearchQuery } from "../search-query";
import type { GradeOrder } from "../order";

export interface GradeSearchParams {
	searchQuery: GradeSearchQuery;
	order: GradeOrder;
	pagination: Pagination;
}

/**
 * グレードデータを検索・ソートするサーバーアクション
 */
export async function getGrades(searchParams: GradeSearchParams) {
	const { searchQuery, order, pagination } = searchParams;

	// フィルター処理
	let filteredData = [...gradeData];

	// 検索クエリでフィルタリング
	if (searchQuery.query) {
		filteredData = filteredData.filter(
			(item) =>
				item.name.toLowerCase().includes(searchQuery.query.toLowerCase()) ||
				item.description
					.toLowerCase()
					.includes(searchQuery.query.toLowerCase()),
		);
	}

	// ソート処理
	filteredData.sort((a, b) => {
		const aValue = a[order.field as keyof Grade];
		const bValue = b[order.field as keyof Grade];

		// 比較のための型変換
		if (
			(typeof aValue === "number" && typeof bValue === "number") ||
			(typeof aValue === "string" && typeof bValue === "string")
		) {
			if (aValue < bValue) {
				return order.direction === OrderDirection.Asc ? -1 : 1;
			}
			if (aValue > bValue) {
				return order.direction === OrderDirection.Asc ? 1 : -1;
			}
		}
		return 0;
	});

	// ページネーション
	const page = pagination.page;
	const limit = 20;
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
