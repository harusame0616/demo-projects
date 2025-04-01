import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { parseSearchParamsPagination } from "@/lib/pagination";
import { parseSearchParamsUserSearchQuery } from "./search-query";
import {
	SearchFormContainer,
	SearchFormPresenter,
	SearchFormSkeleton,
} from "./_search-form";
import { UsersContainer, UsersSkeleton } from "./_users";
import { parseSearchParamsUserOrder } from "./order";

export const metadata: Metadata = {
	title: "ユーザー一覧 | 人材管理システム",
	description: "人材管理システムのユーザー一覧",
};

// SearchParamsをIntersectionにする型定義
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function UsersPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	// searchParamsをawaitして取得
	const awaitedSearchParams = await searchParams;
	const searchQuery = parseSearchParamsUserSearchQuery(awaitedSearchParams);
	const pagination = parseSearchParamsPagination(awaitedSearchParams);
	const order = parseSearchParamsUserOrder(awaitedSearchParams);

	return (
		<>
			<PageHeader
				title="ユーザー一覧"
				operations={[
					<Button key="new-user" asChild variant="outline">
						<Link href="/admin/users/new">新規作成</Link>
					</Button>,
				]}
			/>

			<SearchFormPresenter searchQuery={searchQuery} />

			<Suspense fallback={<UsersSkeleton />}>
				<UsersContainer
					order={order}
					pagination={pagination}
					searchQuery={searchQuery}
				/>
			</Suspense>
		</>
	);
}
