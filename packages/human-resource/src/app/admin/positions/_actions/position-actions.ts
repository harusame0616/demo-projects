"use server";

import { revalidatePath } from "next/cache";
import { type Position, positionData } from "../_data/positions-data";

export interface PositionSearchParams {
	query?: string;
	level?: string;
	sort?: keyof Position;
	order?: "asc" | "desc";
	page?: string;
}

/**
 * 役職データを検索・ソートするサーバーアクション
 */
export async function getPositions(params: PositionSearchParams = {}) {
	// 検索とフィルタリング
	let filteredData = [...positionData];
	if (params.query) {
		const query = params.query.toLowerCase();
		filteredData = filteredData.filter(
			(position) =>
				position.name.toLowerCase().includes(query) ||
				position.description.toLowerCase().includes(query),
		);
	}

	if (params.level) {
		filteredData = filteredData.filter(
			(position) => position.level.toString() === params.level,
		);
	}

	// ソート
	const sortField = params.sort || "level";
	const sortOrder = params.order || "desc";

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
	const page = params.page ? Number.parseInt(params.page, 10) : 1;
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
export async function getPositionLevels(): Promise<string[]> {
	const levels = [
		...new Set(positionData.map((position) => position.level.toString())),
	];
	return levels.sort((a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10));
}

/**
 * IDに基づいて役職を取得
 */
export async function getPositionById(id: string): Promise<Position | null> {
	return positionData.find((item) => item.id === id) || null;
}

/**
 * 新しい役職を作成
 */
export async function createPosition(
	data: Omit<Position, "id" | "createdAt" | "memberCount">,
): Promise<Position> {
	const newItem: Position = {
		...data,
		id: `pos-${Date.now()}`,
		createdAt: new Date().toISOString().split("T")[0],
		memberCount: 0,
	};

	positionData.push(newItem);
	return newItem;
}

/**
 * 既存の役職を更新
 */
export async function updatePosition(
	id: string,
	data: Partial<Omit<Position, "id" | "createdAt" | "memberCount">>,
): Promise<Position | null> {
	const index = positionData.findIndex((item) => item.id === id);
	if (index === -1) return null;

	const updatedItem = { ...positionData[index], ...data };
	positionData[index] = updatedItem;

	return updatedItem;
}

/**
 * 役職を削除
 */
export async function deletePosition(id: string): Promise<boolean> {
	const index = positionData.findIndex((item) => item.id === id);
	if (index === -1) return false;

	positionData.splice(index, 1);
	return true;
}
