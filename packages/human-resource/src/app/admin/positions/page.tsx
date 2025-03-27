import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { PositionsContainer } from "./_components/positions-container";
import { SearchFormContainer } from "./_components/search-form-container";
import { PositionsSkeleton } from "./_components/positions-skeleton";
import type { PositionSearchParams } from "./_actions/position-actions";
import type { Metadata } from "next";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export const metadata: Metadata = {
	title: "役職管理 | 人材管理システム",
	description: "役職の一覧と管理",
};

interface PositionsPageProps {
	searchParams: Promise<PositionSearchParams>;
}

export default async function PositionsPage({
	searchParams,
}: PositionsPageProps) {
	// searchParamsをawaitして取得
	const resolvedParams = await searchParams;

	// 検索パラメータを安全に取得
	const query = resolvedParams.query || "";
	const level = resolvedParams.level || "all";

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">役職一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/positions/new">新規作成</Link>
				</Button>
			</div>

			<Suspense
				fallback={
					<SearchFormPresenter
						defaultQuery={query}
						levelOptions={[]}
						isLoading={false}
						defaultLevel={level}
					/>
				}
			>
				<SearchFormContainer defaultQuery={query} defaultLevel={level} />
			</Suspense>

			<Suspense fallback={<PositionsSkeleton />}>
				<PositionsContainer searchParams={resolvedParams} />
			</Suspense>
		</div>
	);
}
