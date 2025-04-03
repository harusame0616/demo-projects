import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { GradesContainer } from "./_components/grades-container";
import { GradesSkeleton } from "./_components/grades-skeleton";

import { parseSearchParamsPagination } from "@/lib/pagination";
import type { NextSearchParams } from "@/lib/search-params";
import type { Metadata } from "next";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { parseSearchParamsGradeOrder } from "./order";
import { parseSearchParamsGradeSearchQuery } from "./search-query";

export const metadata: Metadata = {
	title: "グレード管理 | 人材管理システム",
	description: "社員のグレードを管理します",
};

export default async function GradePage({
	searchParams,
}: {
	searchParams: NextSearchParams;
}) {
	const resolvedParams = await searchParams;

	const searchQuery = parseSearchParamsGradeSearchQuery(resolvedParams);
	const pagination = parseSearchParamsPagination(resolvedParams);
	const order = parseSearchParamsGradeOrder(resolvedParams);

	const searchParamsKey = JSON.stringify(resolvedParams);

	return (
		<>
			<PageHeader
				title="グレード一覧"
				operations={[
					<Button key="new-grade" asChild variant="outline">
						<Link href="/admin/grades/new">新規作成</Link>
					</Button>,
				]}
			/>

			<SearchFormPresenter
				searchQuery={searchQuery}
				key={`search-form-${searchParamsKey}`}
			/>

			<Suspense fallback={<GradesSkeleton />} key={`grades-${searchParamsKey}`}>
				<GradesContainer
					searchQuery={searchQuery}
					order={order}
					pagination={pagination}
				/>
			</Suspense>
		</>
	);
}
