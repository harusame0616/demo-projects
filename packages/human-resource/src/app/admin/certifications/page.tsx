import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { parseSearchParamsPagination } from "@/lib/pagination";
import type { NextSearchParams } from "@/lib/search-params";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CertificationsContainer } from "./_components/certifications-container";
import { CertificationsSkeleton } from "./_components/certifications-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { parseSearchParamsCertificationOrder } from "./order";
import { parseSearchParamsCertificationSearchQuery } from "./search-query";

export const metadata: Metadata = {
	title: "資格管理 | 人材管理システム",
	description: "社員の資格を管理します",
};

export default async function CertificationsPage({
	searchParams,
}: {
	searchParams: NextSearchParams;
}) {
	const resolvedParams = await searchParams;

	const searchQuery = parseSearchParamsCertificationSearchQuery(resolvedParams);
	const pagination = parseSearchParamsPagination(resolvedParams);
	const order = parseSearchParamsCertificationOrder(resolvedParams);

	const searchParamsKey = JSON.stringify(resolvedParams);

	return (
		<div className="space-y-4">
			<PageHeader
				title="資格一覧"
				operations={[
					<Button key="new-certification" asChild variant="outline">
						<Link href="/admin/certifications/new">新規作成</Link>
					</Button>,
				]}
			/>

			<SearchFormPresenter
				searchQuery={searchQuery}
				key={`search-form-${searchParamsKey}`}
			/>

			<Suspense
				key={`certifications-${searchParamsKey}`}
				fallback={<CertificationsSkeleton />}
			>
				<CertificationsContainer
					searchQuery={searchQuery}
					pagination={pagination}
					order={order}
				/>
			</Suspense>
		</div>
	);
}
