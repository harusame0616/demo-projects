"use server";

import {
	type SkillCertification,
	type SkillCertificationType,
	skillCertificationData,
} from "../_data/skills-certifications-data";

export interface SkillCertificationSearchParams {
	query?: string;
	type?: SkillCertificationType | "all";
	sort?: keyof SkillCertification;
	order?: "asc" | "desc";
	page?: string;
}

/**
 * スキル・資格データの検索、フィルタリング、ソートを行うサーバーアクション
 */
export async function getSkillCertifications(
	searchParams: SkillCertificationSearchParams = {},
) {
	await new Promise((resolve) => setTimeout(resolve, 200));
	const {
		query = "",
		type = "all",
		sort = "code",
		order = "asc",
	} = searchParams;

	// フィルター処理
	let filteredData = [...skillCertificationData];

	// 検索クエリでフィルタリング
	if (query) {
		filteredData = filteredData.filter(
			(item) =>
				item.name.toLowerCase().includes(query.toLowerCase()) ||
				item.description.toLowerCase().includes(query.toLowerCase()) ||
				item.levelOrAuthority.toLowerCase().includes(query.toLowerCase()),
		);
	}

	// タイプでフィルタリング
	if (type !== "all") {
		filteredData = filteredData.filter((item) => item.type === type);
	}

	// ソート処理
	filteredData.sort((a, b) => {
		const sortKey = sort as keyof SkillCertification;

		// null/undefinedチェックをして安全に比較
		const aValue = a[sortKey];
		const bValue = b[sortKey];

		if (aValue !== undefined && bValue !== undefined) {
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
 * IDに基づいてスキル・資格を取得
 */
export async function getSkillCertificationById(
	id: string,
): Promise<SkillCertification | null> {
	return skillCertificationData.find((item) => item.id === id) || null;
}

/**
 * 新しいスキル・資格を作成
 */
export async function createSkillCertification(
	data: Omit<SkillCertification, "id" | "createdAt" | "holdersCount">,
): Promise<SkillCertification> {
	const newItem: SkillCertification = {
		...data,
		id: `skill-${Date.now()}`,
		createdAt: new Date().toISOString(),
		holdersCount: 0,
	};

	skillCertificationData.push(newItem);
	return newItem;
}

/**
 * 既存のスキル・資格を更新
 */
export async function updateSkillCertification(
	id: string,
	data: Partial<Omit<SkillCertification, "id" | "createdAt" | "holdersCount">>,
): Promise<SkillCertification | null> {
	const index = skillCertificationData.findIndex((item) => item.id === id);
	if (index === -1) return null;

	const updatedItem = { ...skillCertificationData[index], ...data };
	skillCertificationData[index] = updatedItem;

	return updatedItem;
}

/**
 * スキル・資格を削除
 */
export async function deleteSkillCertification(id: string): Promise<boolean> {
	const index = skillCertificationData.findIndex((item) => item.id === id);
	if (index === -1) return false;

	skillCertificationData.splice(index, 1);
	return true;
}
