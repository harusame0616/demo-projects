"use server";

import { OrderDirection } from "@/lib/order";
import type { Pagination } from "@/lib/pagination";
import type { CertificationOrder } from "../../certifications/order";
import type { CertificationSearchQuery } from "../../certifications/search-query";
import {
	type SkillCertification,
	skillCertificationData,
} from "../../skills-certifications/_data/skills-certifications-data";
import { type Skill, skills } from "@/app/_mocks/skills";
import type { SkillOrder, SkillOrderField } from "../order";
import type { SkillSearchQuery } from "../search-query";

export type Condition = {
	searchQuery: SkillSearchQuery;
	order: SkillOrder;
	pagination: Pagination;
};

export async function getSkills({ searchQuery, order, pagination }: Condition) {
	// フィルター処理
	let filteredData = [...skills];

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
		const sortKey = order.field;

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
export async function getSkillById(id: string): Promise<Skill | null> {
	return skills.find((item) => item.code === id) || null;
}

/**
 * 新しいスキル・資格を作成
 */
export async function createSkill(
	data: Omit<Skill, "id" | "createdAt">,
): Promise<Skill> {
	const newItem: Skill = {
		...data,
		code: `skill-${Date.now()}`,
	};

	skills.push(newItem);
	return newItem;
}

/**
 * 既存のスキル・資格を更新
 */
export async function updateSkill(
	id: string,
	data: Partial<Omit<Skill, "id" | "createdAt">>,
): Promise<Skill | null> {
	const index = skills.findIndex((item) => item.code === id);
	if (index === -1) return null;

	const updatedItem = { ...skills[index], ...data };
	skills[index] = updatedItem;

	return updatedItem;
}
