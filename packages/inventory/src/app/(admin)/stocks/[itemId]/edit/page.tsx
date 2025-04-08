import { PageHeader } from "@/components/common/page-header";
import { Suspense } from "react";
import { StockEditContainer } from "./_components/stock-edit-container";
import { StockEditSkeleton } from "./_components/stock-edit-skeleton";

export default async function StockEditPage({
	params,
}: {
	params: Promise<{ itemId: string }>;
}) {
	const { itemId } = await params;
	return (
		<>
			<PageHeader title="在庫編集" />
			<Suspense fallback={<StockEditSkeleton />}>
				<StockEditContainer itemId={itemId} />
			</Suspense>
		</>
	);
}
