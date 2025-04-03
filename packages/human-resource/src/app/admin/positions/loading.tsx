import { PageHeader } from "@/components/common/page-header";
import type { Metadata } from "next";
import { PositionsSkeleton } from "./_components/positions-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export const metadata: Metadata = {
	title: "役職管理 | 人材管理システム",
	description: "役職の一覧と管理",
};

export default async function Loading() {
	return (
		<>
			<PageHeader title="役職一覧" />

			<SearchFormPresenter searchQuery={{ query: "", level: "all" }} />

			<PositionsSkeleton />
		</>
	);
}
