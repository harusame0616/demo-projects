import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { SkillCertificationSearchParams } from "../skills-certifications/_actions/skill-certification-actions";
import { SearchFormContainer } from "./_components/search-form-container";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { SkillsContainer } from "./_components/skills-container";
import { SkillsSkeleton } from "./_components/skills-skeleton";

export const metadata: Metadata = {
	title: "スキル管理 | 人材管理システム",
	description: "社員のスキルを管理します",
};

export default async function SkillsPage({
	searchParams,
}: {
	searchParams: Promise<SkillCertificationSearchParams>;
}) {
	// searchParamsをawaitして取得
	const resolvedParams = await searchParams;

	// 検索パラメータを安全に取得
	const query = resolvedParams.query || "";

	return (
		<>
			<PageHeader
				title="スキル一覧"
				operations={[
					<Button key="new-skill" asChild variant="outline">
						<Link href="/admin/skills/new">新規作成</Link>
					</Button>,
				]}
			/>

			<SearchFormPresenter defaultQuery={query} />

			<Suspense fallback={<SkillsSkeleton />}>
				<SkillsContainer searchParams={resolvedParams} />
			</Suspense>
		</>
	);
}
