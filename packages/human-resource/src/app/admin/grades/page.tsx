import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import type { GradeSearchParams } from "./_actions/grade-actions";
import { GradesContainer } from "./_components/grades-container";
import { GradesSkeleton } from "./_components/grades-skeleton";

import type { Metadata } from "next";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export const metadata: Metadata = {
	title: "グレード管理 | 人材管理システム",
	description: "社員のグレードを管理します",
};

export default async function GradePage({
	searchParams,
}: {
	searchParams: Promise<GradeSearchParams>;
}) {
	// searchParamsをawaitして取得
	const resolvedParams = await searchParams;

	// 検索パラメータを安全に取得
	const query = resolvedParams.query || "";

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">グレード一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/grades/new">新規作成</Link>
				</Button>
			</div>

			<SearchFormPresenter defaultQuery={query} />

			<Suspense fallback={<GradesSkeleton />}>
				<GradesContainer searchParams={resolvedParams} />
			</Suspense>
		</div>
	);
}
