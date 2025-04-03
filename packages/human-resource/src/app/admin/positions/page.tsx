import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { parseSearchParamsPagination } from "@/lib/pagination";
import type { NextSearchParams } from "@/lib/search-params";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PositionsContainer } from "./_components/positions-container";
import { PositionsSkeleton } from "./_components/positions-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { parseSearchParamsPositionOrder } from "./order";
import { parseSearchParamsPositionSearchQuery } from "./search-query";

export const metadata: Metadata = {
	title: "役職管理 | 人材管理システム",
	description: "役職の一覧と管理",
};

interface Props {
	searchParams: NextSearchParams;
}

export default async function PositionsPage({ searchParams }: Props) {
	const resolvedParams = await searchParams;

	const searchQuery = parseSearchParamsPositionSearchQuery(resolvedParams);
	const order = parseSearchParamsPositionOrder(resolvedParams);
	const pagination = parseSearchParamsPagination(resolvedParams);

	const searchParamsKey = JSON.stringify(resolvedParams);

	return (
		<>
			<PageHeader
				title="役職一覧"
				operations={[
					<Button key="new-position" asChild variant="outline">
						<Link href="/admin/positions/new">新規作成</Link>
					</Button>,
				]}
			/>

			<SearchFormPresenter
				key={`search-form-${searchParamsKey}`}
				searchQuery={searchQuery}
			/>

			<Suspense
				fallback={<PositionsSkeleton />}
				key={`positions-${searchParamsKey}`}
			>
				<PositionsContainer
					searchQuery={searchQuery}
					order={order}
					pagination={pagination}
				/>
			</Suspense>
		</>
	);
}
