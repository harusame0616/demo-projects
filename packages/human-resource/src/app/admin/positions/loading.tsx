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

export default async function Loading() {
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
						defaultQuery={""}
						levelOptions={[]}
						isLoading={false}
						defaultLevel={""}
					/>
				}
			>
				<SearchFormContainer defaultQuery={""} defaultLevel={""} />
			</Suspense>

			<PositionsSkeleton />
		</div>
	);
}
