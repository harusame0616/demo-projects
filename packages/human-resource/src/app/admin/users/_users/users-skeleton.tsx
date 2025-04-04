import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function UsersSkeleton() {
	// テーブル行の数
	const rows = Array(20).fill(0);

	return (
		<div className="space-y-6 w-full">
			{/* テーブルスケルトン */}
			<div className="w-full overflow-auto">
				<div className="rounded-md border w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[180px] whitespace-nowrap">
									<Skeleton className="h-4 w-28" />
								</TableHead>
								<TableHead className="w-[220px] whitespace-nowrap">
									<Skeleton className="h-4 w-24" />
								</TableHead>
								<TableHead className="w-[150px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[120px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[80px]">
									<Skeleton className="h-4 w-10" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: スケルトン表示用の静的リスト
								<TableRow key={`user-skeleton-row-${index}`}>
									<TableCell className="whitespace-nowrap">
										<Skeleton className="h-4 w-32" />
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Skeleton className="h-4 w-36" />
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Skeleton className="h-4 w-20" />
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Skeleton className="h-4 w-16" />
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<div className="flex justify-end">
											<Skeleton className="h-8 w-8 rounded-full" />
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* ページネーション */}
			<div className="flex justify-center mt-4">
				<div className="flex gap-1">
					{["prev", "1", "2", "3", "next"].map((id) => (
						<Skeleton key={id} className="h-9 w-9 rounded-md" />
					))}
				</div>
			</div>
		</div>
	);
}
