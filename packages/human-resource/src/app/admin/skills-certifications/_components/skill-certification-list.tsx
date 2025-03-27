"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { SkillCertification } from "../../skills-certifications/_data/skills-certifications-data";

// 新しい構造への移行のための互換性コンポーネント
// エラーを防止するために、このファイルは残しつつ、アクセスがあれば適切なパスにリダイレクトします

type SkillCertificationListProps = {
	skillCertifications: SkillCertification[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	searchParams?: {
		query?: string;
		type?: "skill" | "certification" | "all";
		sort?: string;
		order?: "asc" | "desc";
		page?: string;
	};
};

export function SkillCertificationList({
	skillCertifications,
	pagination,
	searchParams = {},
}: SkillCertificationListProps) {
	const router = useRouter();

	// このコンポーネントがマウントされると、タイプに応じて適切なパスにリダイレクト
	useEffect(() => {
		// パラメータを維持したままリダイレクト
		const params = new URLSearchParams();
		if (searchParams.query) params.set("query", searchParams.query);
		if (searchParams.sort) params.set("sort", searchParams.sort);
		if (searchParams.order) params.set("order", searchParams.order);
		if (searchParams.page) params.set("page", searchParams.page);

		// タイプに基づいてリダイレクト先を決定
		if (searchParams.type === "certification") {
			router.replace(`/admin/certifications?${params.toString()}`);
		} else {
			router.replace(`/admin/skills?${params.toString()}`);
		}
	}, [router, searchParams]);

	// リダイレクト中は何も表示しない
	return null;
}
