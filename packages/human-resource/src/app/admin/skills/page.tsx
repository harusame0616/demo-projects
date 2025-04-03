import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { SkillCertificationSearchParams } from "../skills-certifications/_actions/certification-actions";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { SkillsContainer } from "./_components/skills-container";
import { SkillsSkeleton } from "./_components/skills-skeleton";
import { parseSearchParamsSkillSearchQuery } from "./search-query";
import { parseSearchParamsSkillOrder } from "./order";
import { parseSearchParamsPagination } from "@/lib/pagination";

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
	const searchQuery = parseSearchParamsSkillSearchQuery(resolvedParams);
	const order = parseSearchParamsSkillOrder(resolvedParams);
	const pagination = parseSearchParamsPagination(resolvedParams);

	const searchParamsKey = JSON.stringify(resolvedParams);

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

			<SearchFormPresenter
				key={`search-form-${searchParamsKey}`}
				searchQuery={searchQuery}
			/>

			<Suspense fallback={<SkillsSkeleton />} key={`skills-${searchParamsKey}`}>
				<SkillsContainer
					searchQuery={searchQuery}
					order={order}
					pagination={pagination}
				/>
			</Suspense>
		</>
	);
}
