import { PageHeader } from "@/components/common/page-header";
import { Suspense } from "react";
import { StockEditSkeleton } from "./_components/stock-edit-skeleton";
import { StockEditContainer } from "./_components/stock-edit-container";

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
