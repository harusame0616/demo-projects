import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import type { DepartmentSearchParams } from "./_actions/department-actions";
import { DepartmentsContainer } from "./_components/departments-container";
import { DepartmentsSkeleton } from "./_components/departments-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

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
	const searchParamsObj: DepartmentSearchParams = {
		query: resolvedParams.query,
		sort: resolvedParams.sort,
		order: resolvedParams.order,
		page: resolvedParams.page,
	};

	// Suspenseのキーとして使用するためのクエリパラメータのJSON文字列化
	const searchParamsKey = JSON.stringify(resolvedParams);

	// 検索フォームの初期値を設定
	const searchQuery = resolvedParams.query || "";

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

			<SearchFormPresenter defaultValue={searchQuery} isLoading={false} />

			<Suspense
				key={`departments-${searchParamsKey}`}
				fallback={<DepartmentsSkeleton />}
			>
				<DepartmentsContainer searchParams={searchParamsObj} />
			</Suspense>
		</>
	);
}
