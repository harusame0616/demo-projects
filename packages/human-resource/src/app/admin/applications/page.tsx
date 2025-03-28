import { PageHeader } from "@/components/common/page-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import type { ApplicationSearchParams } from "./_actions/application-actions";
import { ApplicationsContainer } from "./_components/applications-container";
import { ApplicationsSkeleton } from "./_components/applications-skeleton";
import { SearchFormContainer } from "./_components/search-form-container";

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
		<div className="space-y-4">
			<PageHeader heading="申請一覧" />
			<SearchFormContainer defaultQuery={searchParamsResolved} />
			<Suspense fallback={<ApplicationsSkeleton />}>
				<ApplicationsContainer searchParams={searchParamsResolved} />
			</Suspense>
		</div>
	);
}
