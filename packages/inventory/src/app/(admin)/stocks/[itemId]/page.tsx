import { StockDetailContainer } from "./_components/stock-detail-container";
import { PageHeader } from "@/components/common/page-header";
import { Suspense } from "react";
import { StockDetailSkeleton } from "./_components/stock-detail-skeleton";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./_components/delete-button";
import { parseSearchParamsPagination } from "@/lib/pagination";

export default async function StockPage({
	params,
	searchParams,
}: {
	params: { itemId: string };
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const pagination = parseSearchParamsPagination(await searchParams);

	return (
		<>
			<PageHeader
				title="在庫詳細"
				operations={[
					<Button key="edit" asChild variant="outline">
						<Link href={`/stocks/${params.itemId}/edit`}>
							<PencilIcon className="h-4 w-4" />
							編集
						</Link>
					</Button>,
					<DeleteButton key="delete" stockId={params.itemId} />,
				]}
			/>
			<Suspense fallback={<StockDetailSkeleton />} key={pagination.page}>
				<StockDetailContainer itemId={params.itemId} pagination={pagination} />
			</Suspense>
		</>
	);
}
