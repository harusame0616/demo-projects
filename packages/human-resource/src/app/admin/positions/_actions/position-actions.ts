"use server";

import type { Pagination } from "@/lib/pagination";
import { type Position, positionData } from "../_data/positions-data";
import type { PositionOrder } from "../order";
import type { PositionSearchQuery } from "../search-query";

type Condition = {
	searchQuery: PositionSearchQuery;
	order: PositionOrder;
	pagination: Pagination;
};

export async function getPositions({
	searchQuery,
	order,
	pagination,
}: Condition) {
	// 検索とフィルタリング
	let filteredData = [...positionData];
	if (searchQuery.query) {
		const query = searchQuery.query.toLowerCase();
		filteredData = filteredData.filter(
			(position) =>
				position.name.toLowerCase().includes(query) ||
				position.description.toLowerCase().includes(query),
		);
	}

	if (searchQuery.level && searchQuery.level !== "all") {
		filteredData = filteredData.filter(
			(position) => position.level.toString() === searchQuery.level,
		);
	}

	// ソート
	const sortField = order.field || "level";
	const sortOrder = order.direction || "desc";

	filteredData.sort((a, b) => {
		const aValue = a[sortField];
		const bValue = b[sortField];

		if (typeof aValue === "string" && typeof bValue === "string") {
			return sortOrder === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		if (typeof aValue === "number" && typeof bValue === "number") {
			return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});

	// ページネーション
	const page = pagination.page;
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
 * レベル一覧を取得（フィルター用）
 */
export async function getPositionLevels(): Promise<
	{
		value: string;
		label: string;
	}[]
> {
	const levels = [
		...new Set(positionData.map((position) => position.level.toString())),
	];
	return levels
		.sort((a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10))
		.map((level) => ({
			value: level,
			label: level,
		}));
}

/**
 * IDに基づいて役職を取得
 */
export async function getPositionById(id: string): Promise<Position | null> {
	return positionData.find((item) => item.id === id) || null;
}
