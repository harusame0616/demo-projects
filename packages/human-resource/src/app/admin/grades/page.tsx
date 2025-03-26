import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { GradeListContainer } from "./_components/grade-list-container";
import { getGrades, type GradeSearchParams } from "./_actions/grade-actions";
import { SearchForm } from "./_components/search-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "グレード管理 | 人材管理システム",
	description: "社員のグレードを管理します",
};

// ローディング状態を表示するスケルトンコンポーネント
function GradeListSkeleton() {
	return (
		<div className="space-y-4 w-full">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6 w-full">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="rounded-md border w-full">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
			{/* ページネーションスケルトン */}
			<div className="flex justify-center mt-4 w-full">
				<div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md" />
			</div>
		</div>
	);
}

export default async function GradePage({
	searchParams,
}: {
	searchParams: Promise<GradeSearchParams>;
}) {
	// searchParamsをawaitして取得
	const resolvedParams = await searchParams;

	// 検索パラメータを安全に取得
	const query = resolvedParams.query;
	const sort = resolvedParams.sort;
	const order = resolvedParams.order;
	const page = resolvedParams.page;

	// 検索条件を基にデータを取得
	const { items, pagination } = await getGrades({
		query,
		sort,
		order,
		page,
	});

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">グレード一覧</h1>
				<Button asChild>
					<Link href="/admin/grades/new">
						<PlusIcon className="h-4 w-4 mr-2" />
						新規グレード作成
					</Link>
				</Button>
			</div>

			<SearchForm
				searchParams={{
					query,
					sort,
					order,
					page,
				}}
			/>

			<GradeListContainer
				grades={items}
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
