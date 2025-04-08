import { PageHeader } from "@/components/common/page-header";
import { parseSearchParamsPagination } from "@/lib/pagination";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchFormPresenter } from "./_search-form";
import { parseSearchParamsSearchQuery } from "./search-query";
import { StocksContainer, StocksSkeleton } from "./_stocks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { parseSearchParamsStockOrder } from "./order";
import { ExportDialog } from "./_export-dialog";

// メタデータ
export const metadata: Metadata = {
	title: "申請一覧",
	description: "従業員からの各種申請を確認、承認、却下することができます。",
};

// SearchParamsをIntersectionにする型定義
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// 申請一覧ページ
export default async function ApplicationsPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const awaitedSearchParams = await searchParams;
	const searchQuery = parseSearchParamsSearchQuery(awaitedSearchParams);
	const pagination = parseSearchParamsPagination(awaitedSearchParams);
	const order = parseSearchParamsStockOrder(awaitedSearchParams);

	return (
		<>
			<PageHeader
				title="在庫一覧"
				operations={[
					<ExportDialog key="export-csv" />,
					<Button key="add-stock" size="sm" asChild variant="outline">
						<Link href="/stocks/new">
							<PlusIcon className="h-4 w-4" />
							商品追加
						</Link>
					</Button>,
				]}
			/>
			<SearchFormPresenter searchQuery={searchQuery} />
			<Suspense
				fallback={<StocksSkeleton />}
				key={JSON.stringify({ searchQuery, order, pagination })}
			>
				<StocksContainer
					pagination={pagination}
					searchQuery={searchQuery}
					order={order}
				/>
			</Suspense>
		</>
	);
}
