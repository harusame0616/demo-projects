import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function ApplicationsSkeleton() {
	return (
		<div className="space-y-4 w-full">
			{/* 申請テーブルスケルトン */}
			<div className="w-full overflow-auto">
				<div className="min-w-full rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[120px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[100px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[150px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[120px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="min-w-[150px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[80px] text-right whitespace-nowrap">
									<Skeleton className="h-4 w-14 ml-auto" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array(8)
								.fill(0)
								.map((_, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: スケルトン表示用の静的リスト
									<TableRow key={`application-skeleton-row-${index}`}>
										<TableCell className="whitespace-nowrap">
											<Skeleton className="h-4 w-16" />
										</TableCell>
										<TableCell className="whitespace-nowrap">
											<Skeleton className="h-6 w-24" />
										</TableCell>
										<TableCell className="whitespace-nowrap">
											<Skeleton className="h-6 w-20" />
										</TableCell>
										<TableCell className="whitespace-nowrap">
											<Skeleton className="h-4 w-24" />
										</TableCell>
										<TableCell className="whitespace-nowrap">
											<Skeleton className="h-4 w-20" />
										</TableCell>
										<TableCell className="whitespace-nowrap">
											<Skeleton className="h-4 w-48" />
										</TableCell>
										<TableCell className="text-right whitespace-nowrap">
											<Skeleton className="h-8 w-8 ml-auto" />
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* ページネーションスケルトン */}
			<div className="mt-4 flex justify-center">
				<div className="flex gap-1">
					{["prev", "1", "2", "3", "next"].map((id) => (
						<Skeleton key={id} className="h-10 w-10" />
					))}
				</div>
			</div>
		</div>
	);
}
