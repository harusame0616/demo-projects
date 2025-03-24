import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DepartmentListContainer } from "./_components/department-list-container";
import {
	getDepartments,
	type DepartmentSearchParams,
} from "./_actions/department-actions";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "部署一覧 | 人材管理システム",
	description: "人材管理システムの部署一覧",
};

// ローディング状態を表示するスケルトンコンポーネント
function DepartmentListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="rounded-md border">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
			<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md mt-4" />
		</div>
	);
}

export default async function DepartmentsPage({
	searchParams,
}: {
	searchParams: DepartmentSearchParams;
}) {
	// ページ番号のパラメータを処理（デフォルトは1ページ目）
	const currentPage = searchParams.page
		? Number.parseInt(searchParams.page, 10)
		: 1;

	// サーバーアクションでデータを取得
	const departmentsData = await getDepartments({
		...searchParams,
		page: currentPage.toString(),
	});

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold tracking-tight">部署一覧</h2>
				<Button asChild>
					<Link href="/admin/departments/new">
						<PlusIcon className="mr-2 h-4 w-4" />
						部署を追加
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>部署一覧</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<DepartmentListSkeleton />}>
						<DepartmentListContainer
							departments={departmentsData.items}
							searchParams={searchParams}
							pagination={departmentsData.pagination}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
