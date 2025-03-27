import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DepartmentListContainer } from "./_components/department-list-container";
import { SearchForm } from "./_components/search-form";
import {
	getDepartments,
	type DepartmentSearchParams,
} from "./_actions/department-actions";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "部署管理 | 人材管理システム",
	description: "部署の一覧と管理",
};

interface DepartmentsPageProps {
	searchParams: Promise<DepartmentSearchParams>;
}

export default async function DepartmentsPage({
	searchParams,
}: DepartmentsPageProps) {
	// searchParamsをawaitして取得
	const resolvedParams = await searchParams;

	// 検索パラメータを安全に取得
	const query = resolvedParams.query;
	const sort = resolvedParams.sort;
	const order = resolvedParams.order;
	const page = resolvedParams.page;

	// サーバーアクションでデータを取得
	const { items: departments, pagination } = await getDepartments({
		query,
		sort,
		order,
		page,
	});

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">部署一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/departments/new">新規作成</Link>
				</Button>
			</div>

			<SearchForm searchQuery={query || ""} />

			<DepartmentListContainer
				departments={departments}
				searchParams={{
					query,
					sort,
					order,
					page,
				}}
				pagination={pagination}
			/>
		</div>
	);
}
