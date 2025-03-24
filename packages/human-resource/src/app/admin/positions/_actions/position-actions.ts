"use server";

import { positionData, type Position } from "../_data/positions-data";

export type PositionSearchParams = {
	query?: string;
	level?: string;
	sort?: keyof Position;
	order?: "asc" | "desc";
};

/**
 * 役職データを検索・ソートするサーバーアクション
 */
export async function getPositions(searchParams: PositionSearchParams = {}) {
	const {
		query = "",
		level = "all",
		sort = "level",
		order = "desc",
	} = searchParams;

	// フィルター処理
	let filteredData = [...positionData];

	// 検索クエリでフィルタリング
	if (query) {
		filteredData = filteredData.filter(
			(item) =>
				item.name.toLowerCase().includes(query.toLowerCase()) ||
				item.description.toLowerCase().includes(query.toLowerCase()),
		);
	}

	// レベルでフィルタリング
	if (level && level !== "all") {
		filteredData = filteredData.filter(
			(item) => item.level.toString() === level,
		);
	}

	// ソート処理
	filteredData.sort((a, b) => {
		const aValue = a[sort as keyof Position];
		const bValue = b[sort as keyof Position];

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

	return filteredData;
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
