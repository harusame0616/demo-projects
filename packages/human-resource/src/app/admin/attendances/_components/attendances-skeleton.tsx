import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function AttendancesSkeleton() {
	return (
		<div className="space-y-4">
			<Card>
				<CardContent className="pt-6">
					<div className="gap-4 grid grid-cols-4">
						{/* 検索フォームのスケルトン */}
						<div className="col-span-4 sm:col-span-2">
							<Skeleton className="h-4 w-24 mb-2" />
							<Skeleton className="h-10 w-full" />
						</div>
						<div className="col-span-4 sm:col-span-1">
							<Skeleton className="h-4 w-16 mb-2" />
							<Skeleton className="h-10 w-full" />
						</div>
						<div className="col-span-4 sm:col-span-2">
							<Skeleton className="h-4 w-24 mb-2" />
							<div className="flex items-center gap-2">
								<Skeleton className="h-10 w-full" />
								<span>～</span>
								<Skeleton className="h-10 w-full" />
							</div>
						</div>
						<div className="col-span-4 flex gap-2 flex-wrap">
							<Skeleton className="h-10 sm:max-w-32 w-full" />
							<Skeleton className="h-10 sm:max-w-32 w-full" />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* 勤怠テーブルのスケルトン */}
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[180px]">
								<Skeleton className="h-4 w-20" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-4 w-24" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-4 w-20" />
							</TableHead>
							<TableHead className="text-right">
								<Skeleton className="h-4 w-16 ml-auto" />
							</TableHead>
							<TableHead className="text-right">
								<Skeleton className="h-4 w-16 ml-auto" />
							</TableHead>
							<TableHead className="text-right">
								<Skeleton className="h-4 w-16 ml-auto" />
							</TableHead>
							<TableHead className="text-center w-[100px]">
								<Skeleton className="h-4 w-12 mx-auto" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[
							"skeleton-row-1",
							"skeleton-row-2",
							"skeleton-row-3",
							"skeleton-row-4",
							"skeleton-row-5",
						].map((id) => (
							<TableRow key={id}>
								<TableCell>
									<Skeleton className="h-5 w-24" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-32" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-16" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-5 w-12 ml-auto" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-5 w-12 ml-auto" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-5 w-12 ml-auto" />
								</TableCell>
								<TableCell className="text-center">
									<Skeleton className="h-8 w-8 rounded-full mx-auto" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className="mt-4 flex justify-center">
					<Skeleton className="h-10 w-72" />
				</div>
			</div>
		</div>
	);
}
