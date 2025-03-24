import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { GradeListContainer } from "./_components/grade-list-container";
import { getGrades, type GradeSearchParams } from "./_actions/grade-actions";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "グレード一覧 | 人材管理システム",
	description: "人材管理システムのグレード一覧",
};

// ローディング状態を表示するスケルトンコンポーネント
function GradeListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="rounded-md border">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
			{/* ページネーションスケルトン */}
			<div className="flex justify-center mt-4">
				<div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md" />
			</div>
		</div>
	);
}

export default async function GradesPage({
	searchParams,
}: {
	searchParams: GradeSearchParams;
}) {
	// ページ番号の取得（デフォルトは1ページ目）
	const currentPage = searchParams.page || "1";

	// サーバーアクションでデータを取得
	const gradesData = await getGrades({
		...searchParams,
		page: currentPage,
	});

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold tracking-tight">グレード一覧</h2>
				<Button asChild>
					<Link href="/admin/grades/new">
						<PlusIcon className="mr-2 h-4 w-4" />
						グレードを追加
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>グレード一覧</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<GradeListSkeleton />}>
						<GradeListContainer
							grades={gradesData.items}
							pagination={gradesData.pagination}
							searchParams={searchParams}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
