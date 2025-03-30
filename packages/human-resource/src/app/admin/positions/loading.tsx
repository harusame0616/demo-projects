import { PageHeader } from "@/components/common/page-header";
import type { Metadata } from "next";
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
		<>
			<PageHeader title="役職一覧" />

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
		</>
	);
}
