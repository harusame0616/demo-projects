import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { PositionSearchParams } from "./_actions/position-actions";
import { PositionsContainer } from "./_components/positions-container";
import { PositionsSkeleton } from "./_components/positions-skeleton";
import { SearchFormContainer } from "./_components/search-form-container";
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
		<>
			<PageHeader
				title="役職一覧"
				operations={[
					<Button key="new-position" asChild variant="outline">
						<Link href="/admin/positions/new">新規作成</Link>
					</Button>,
				]}
			/>

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
		</>
	);
}
