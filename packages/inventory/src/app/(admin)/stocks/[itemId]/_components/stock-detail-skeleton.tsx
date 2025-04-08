import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function StockDetailSkeleton() {
	return (
		<div className="space-y-4">
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
				<div className="mb-1 text-sm font-medium text-blue-600">商品名</div>
				<Skeleton className="h-[36px] w-2/3" />
			</div>

			<div className="border rounded-lg p-4">
				<h2 className="text-lg font-semibold mb-4">基本情報</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="text-sm text-muted-foreground mb-1">
							バーコード番号（JAN）
						</p>
						<Skeleton className="h-[28px] w-full" />
					</div>
					<div>
						<p className="text-sm text-muted-foreground mb-1">セット数</p>
						<Skeleton className="h-[28px] w-20" />
					</div>
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h2 className="text-lg font-semibold mb-4">棚卸し履歴</h2>
				<div className="border rounded-md overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[150px]">日付</TableHead>
								<TableHead className="w-[100px]">在庫数</TableHead>
								<TableHead className="w-[100px]">端数</TableHead>
								<TableHead className="w-[100px]">セット数</TableHead>
								<TableHead className="w-[150px]">担当者</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{["skeleton-row-1", "skeleton-row-2", "skeleton-row-3"].map(
								(id) => (
									<TableRow key={id}>
										<TableCell>
											<Skeleton className="h-[22px] w-24" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-[22px] w-12" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-[22px] w-12" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-[22px] w-12" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-[22px] w-20" />
										</TableCell>
									</TableRow>
								),
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
