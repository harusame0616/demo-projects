import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PositionListContainer } from "./_components/position-list-container";
import {
	getPositions,
	getPositionLevels,
	type PositionSearchParams,
} from "./_actions/position-actions";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "役職一覧 | 人材管理システム",
	description: "人材管理システムの役職一覧",
};

// ローディング状態を表示するスケルトンコンポーネント
function PositionListSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
			</div>
			<div className="rounded-md border">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
		</div>
	);
}

export default async function PositionsPage({
	searchParams,
}: {
	searchParams: PositionSearchParams;
}) {
	// サーバーアクションでデータを取得
	const filteredData = await getPositions(searchParams);
	const levelOptions = await getPositionLevels();

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold tracking-tight">役職一覧</h2>
				<Button asChild>
					<Link href="/admin/positions/new">
						<PlusIcon className="mr-2 h-4 w-4" />
						役職を追加
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>役職一覧</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<PositionListSkeleton />}>
						<PositionListContainer
							positions={filteredData}
							levelOptions={levelOptions}
							searchParams={searchParams}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
