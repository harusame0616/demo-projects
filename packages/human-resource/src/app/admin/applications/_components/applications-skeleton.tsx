import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
			{/* 検索フォームスケルトン */}
			<Card>
				<CardHeader>
					<CardTitle>
						<Skeleton className="h-6 w-32" />
					</CardTitle>
					<Skeleton className="h-4 w-64" />
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{Array.from({ length: 4 }).map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey:
								<div key={i} className="space-y-2">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
							))}
						</div>
						<div className="flex justify-end gap-2">
							<Skeleton className="h-10 w-24" />
							<Skeleton className="h-10 w-24" />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* 申請テーブルスケルトン */}
			<div className="w-full overflow-auto">
				<div className="min-w-full rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[120px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[100px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[150px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[120px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="min-w-[150px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[80px] text-right">
									<Skeleton className="h-4 w-14 ml-auto" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 8 }).map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey:
								<TableRow key={i}>
									<TableCell>
										<Skeleton className="h-4 w-16" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-6 w-24" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-6 w-20" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-24" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-20" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-48" />
									</TableCell>
									<TableCell className="text-right">
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
					{Array.from({ length: 5 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey:
						<Skeleton key={i} className="h-10 w-10" />
					))}
				</div>
			</div>
		</div>
	);
}
