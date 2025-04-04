import { PageHeader } from "@/components/common/page-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SkillForm } from "../_edit-form/skill-form";
import { SkillFormSkeleton } from "../_edit-form/skill-form-skeleton";

export const metadata: Metadata = {
	title: "スキル登録 | 人材管理システム",
	description: "新しいスキルを登録します。",
};

export default function NewSkillPage() {
	return (
		<>
			<PageHeader title="スキル新規登録" />

			<Suspense fallback={<SkillFormSkeleton />}>
				<SkillForm isNew={true} />
			</Suspense>
		</>
	);
}
