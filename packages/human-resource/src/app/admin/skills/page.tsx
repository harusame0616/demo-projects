import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { parseSearchParamsPagination } from "@/lib/pagination";
import type { NextSearchParams } from "@/lib/search-params";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SearchFormPresenter } from "./_search-form/search-form-presenter";
import { SkillsContainer } from "./_skills/skills-container";
import { SkillsSkeleton } from "./_skills/skills-skeleton";
import { parseSearchParamsSkillOrder } from "./order";
import { parseSearchParamsSkillSearchQuery } from "./search-query";

export const metadata: Metadata = {
	title: "スキル管理 | 人材管理システム",
	description: "社員のスキルを管理します",
};

export default async function SkillsPage({
	searchParams,
}: {
	searchParams: NextSearchParams;
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
