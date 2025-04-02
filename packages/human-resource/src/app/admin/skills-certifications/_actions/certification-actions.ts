"use server";

import { OrderDirection } from "@/lib/order";
import type { Pagination } from "@/lib/pagination";
import type { CertificationOrder } from "../../certifications/order";
import type { CertificationSearchQuery } from "../../certifications/search-query";
import {
	type SkillCertification,
	skillCertificationData,
} from "../_data/skills-certifications-data";

export type Condition = {
	searchQuery: CertificationSearchQuery;
	order: CertificationOrder;
	pagination: Pagination;
};

export async function getCertifications({
	searchQuery,
	order,
	pagination,
}: Condition) {
	// フィルター処理
	let filteredData = [...skillCertificationData];

	// 検索クエリでフィルタリング
	if (searchQuery.query) {
		filteredData = filteredData.filter(
			(item) =>
				item.name.toLowerCase().includes(searchQuery.query.toLowerCase()) ||
				item.description
					.toLowerCase()
					.includes(searchQuery.query.toLowerCase()) ||
				item.levelOrAuthority
					.toLowerCase()
					.includes(searchQuery.query.toLowerCase()),
		);
	}

	// ソート処理
	filteredData.sort((a, b) => {
		const sortKey = order.field as keyof SkillCertification;

		// null/undefinedチェックをして安全に比較
		const aValue = a[sortKey];
		const bValue = b[sortKey];

		if (aValue !== undefined && bValue !== undefined) {
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
