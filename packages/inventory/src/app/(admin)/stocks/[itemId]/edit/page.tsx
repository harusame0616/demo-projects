import { PageHeader } from "@/components/common/page-header";
import { Suspense } from "react";
import { StockEditContainer } from "./_components/stock-edit-container";
import { StockEditSkeleton } from "./_components/stock-edit-skeleton";

export default function StockEditPage({
	params,
}: {
	params: { itemId: string };
}) {
	return (
		<>
			<PageHeader title="在庫編集" />
			<Suspense fallback={<StockEditSkeleton />}>
				<StockEditContainer itemId={params.itemId} />
			</Suspense>
		</>
	);
}
