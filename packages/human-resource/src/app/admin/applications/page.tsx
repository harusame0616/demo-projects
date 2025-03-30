import { PageHeader } from "@/components/common/page-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import type { ApplicationSearchParams } from "./_actions/application-actions";
import { ApplicationsContainer } from "./_components/applications-container";
import { ApplicationsSkeleton } from "./_components/applications-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

// メタデータ
export const metadata: Metadata = {
	title: "申請一覧",
	description: "従業員からの各種申請を確認、承認、却下することができます。",
};

// SearchParamsをIntersectionにする型定義
type SearchParams = Promise<ApplicationSearchParams>;

// 申請一覧ページ
export default async function ApplicationsPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const searchParamsResolved = await searchParams;

	return (
		<>
			<PageHeader title="申請一覧" />
			<SearchFormPresenter defaultQuery={searchParamsResolved} />
			<Suspense fallback={<ApplicationsSkeleton />}>
				<ApplicationsContainer searchParams={searchParamsResolved} />
			</Suspense>
		</>
	);
}
