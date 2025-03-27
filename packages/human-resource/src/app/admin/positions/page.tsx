import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PositionListContainer } from "./_components/position-list-container";
import { SearchForm } from "./_components/search-form";
import {
	getPositions,
	getPositionLevels,
	type PositionSearchParams,
} from "./_actions/position-actions";

import type { Metadata } from "next";

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
	const query = resolvedParams.query;
	const level = resolvedParams.level;
	const sort = resolvedParams.sort;
	const order = resolvedParams.order;
	const page = resolvedParams.page;

	// サーバーアクションでデータを取得
	const { items: positions, pagination } = await getPositions({
		query,
		level,
		sort,
		order,
		page,
	});
	const levelOptions = await getPositionLevels();

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">役職一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/positions/new">新規作成</Link>
				</Button>
			</div>

			<SearchForm
				searchQuery={query || ""}
				currentLevel={level || "all"}
				levelOptions={levelOptions}
			/>

			<PositionListContainer
				positions={positions}
				pagination={pagination}
				levelOptions={levelOptions}
				searchParams={{
					query,
					level,
					sort,
					order,
					page,
				}}
			/>
		</div>
	);
}
