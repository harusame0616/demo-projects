"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { SkillCertification } from "../_data/skills-certifications-data";

export function SkillCertificationListContainer() {
	const router = useRouter();

	// スキルと資格が分離されたので、適切なページにリダイレクト
	useEffect(() => {
		// デフォルトはスキル一覧へリダイレクト
		router.replace("/admin/skills");
	}, [router]);

	// リダイレクト中は何も表示しない
	return null;
}
