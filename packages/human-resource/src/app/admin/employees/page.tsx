import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { parseSearchParamsPagination } from "@/lib/pagination";
import type { NextSearchParams } from "@/lib/search-params";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EmployeesContainer } from "./_employees/employees-container";
import { EmployeesSkeleton } from "./_employees/employees-skeleton";
import { SearchFormContainer } from "./_search-form/search-form-container";
import { SearchFormPresenter } from "./_search-form/search-form-presenter";
import { parseSearchParamsEmployeeOrder } from "./order";
import { parseSearchParamsEmployeeSearchQuery } from "./search-query";

export const metadata: Metadata = {
	title: "従業員一覧 | 人材管理システム",
	description: "人材管理システムの従業員一覧",
};

type Props = {
	searchParams: NextSearchParams;
};

export default async function EmployeesPage({ searchParams }: Props) {
	const resolvedParams = await searchParams;

	const searchQuery = parseSearchParamsEmployeeSearchQuery(resolvedParams);
	const pagination = parseSearchParamsPagination(resolvedParams);
	const order = parseSearchParamsEmployeeOrder(resolvedParams);

	return (
		<>
			<PageHeader
				title="従業員一覧"
				operations={[
					<Button key="new-employee" asChild variant="outline">
						<Link href="/admin/employees/new">新規作成</Link>
					</Button>,
				]}
			/>

			<Suspense
				fallback={
					<SearchFormPresenter
						departments={[]}
						positions={[]}
						searchQuery={searchQuery}
					/>
				}
				key={`search-form-${JSON.stringify(searchQuery)}`}
			>
				<SearchFormContainer searchQuery={searchQuery} />
			</Suspense>

			<Suspense
				fallback={<EmployeesSkeleton />}
				key={`employees-${JSON.stringify({ searchQuery, order, pagination })}`}
			>
				<EmployeesContainer
					order={order}
					pagination={pagination}
					searchQuery={searchQuery}
				/>
			</Suspense>
		</>
	);
}
