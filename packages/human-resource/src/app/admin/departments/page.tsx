import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { DepartmentsContainer } from "./_departments/departments-container";
import { DepartmentsSkeleton } from "./_departments/departments-skeleton";
import { SearchFormPresenter } from "./_search-form/search-form-presenter";

import { parseSearchParamsPagination } from "@/lib/pagination";
import type { NextSearchParams } from "@/lib/search-params";
import type { Metadata } from "next";
import { parseSearchParamsDepartmentOrder } from "./order";
import { parseSearchParamsDepartmentSearchQuery } from "./search-query";

export const metadata: Metadata = {
	title: "部署管理 | 人材管理システム",
	description: "部署の一覧と管理",
};

type Props = {
	searchParams: NextSearchParams;
};

export default async function DepartmentsPage({ searchParams }: Props) {
	const resolvedParams = await searchParams;

	const searchQuery = parseSearchParamsDepartmentSearchQuery(resolvedParams);
	const pagination = parseSearchParamsPagination(resolvedParams);
	const order = parseSearchParamsDepartmentOrder(resolvedParams);

	const searchParamsKey = JSON.stringify(resolvedParams);

	return (
		<>
			<PageHeader
				title="部署一覧"
				operations={[
					<Button key="new-department" asChild variant="outline">
						<Link href="/admin/departments/new">新規作成</Link>
					</Button>,
				]}
			/>

			<SearchFormPresenter
				searchQuery={searchQuery}
				key={`search-form-${searchParamsKey}`}
			/>

			<Suspense
				key={`departments-${searchParamsKey}`}
				fallback={<DepartmentsSkeleton />}
			>
				<DepartmentsContainer
					searchQuery={searchQuery}
					order={order}
					pagination={pagination}
				/>
			</Suspense>
		</>
	);
}
