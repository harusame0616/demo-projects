import { PageHeader } from "@/components/common/page-header";
import { parseSearchParamsPagination } from "@/lib/pagination";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplicationsContainer, ApplicationsSkeleton } from "./_applications";
import { SearchFormPresenter } from "./_search-form";
import { parseSearchParamsSearchQuery } from "./search-query";

// メタデータ
export const metadata: Metadata = {
	title: "申請一覧",
	description: "従業員からの各種申請を確認、承認、却下することができます。",
};

// SearchParamsをIntersectionにする型定義
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// 申請一覧ページ
export default async function ApplicationsPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const awaitedSearchParams = await searchParams;
	const searchQuery = parseSearchParamsSearchQuery(awaitedSearchParams);
	const pagination = parseSearchParamsPagination(awaitedSearchParams);

	return (
		<>
			<PageHeader title="申請一覧" />
			<SearchFormPresenter searchQuery={searchQuery} />
			<Suspense
				fallback={<ApplicationsSkeleton />}
				key={JSON.stringify(searchQuery)}
			>
				<ApplicationsContainer
					pagination={pagination}
					searchQuery={searchQuery}
				/>
			</Suspense>
		</>
	);
}
