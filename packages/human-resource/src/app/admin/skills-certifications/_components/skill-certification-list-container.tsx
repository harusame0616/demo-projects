"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { SkillCertification } from "../_data/skills-certifications-data";

// 互換性のあるリダイレクトコンポーネント
interface SkillCertificationListContainerProps {
	skillCertifications: SkillCertification[];
}

export function SkillCertificationListContainer({
	skillCertifications,
}: SkillCertificationListContainerProps) {
	const router = useRouter();

	// スキルと資格が分離されたので、適切なページにリダイレクト
	useEffect(() => {
		// デフォルトはスキル一覧へリダイレクト
		router.replace("/admin/skills");
	}, [router]);

	// リダイレクト中は何も表示しない
	return null;
}
