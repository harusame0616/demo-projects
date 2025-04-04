import { Skeleton } from "@/components/ui/skeleton";
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
			{/* 勤怠テーブルのスケルトン */}
			<div className="rounded-md border w-full">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[180px] whitespace-nowrap">
								<Skeleton className="h-4 w-20" />
							</TableHead>
							<TableHead className="whitespace-nowrap">
								<Skeleton className="h-4 w-24" />
							</TableHead>
							<TableHead className="whitespace-nowrap">
								<Skeleton className="h-4 w-20" />
							</TableHead>
							<TableHead className="text-right whitespace-nowrap">
								<Skeleton className="h-4 w-16 ml-auto" />
							</TableHead>
							<TableHead className="text-right whitespace-nowrap">
								<Skeleton className="h-4 w-16 ml-auto" />
							</TableHead>
							<TableHead className="text-right whitespace-nowrap">
								<Skeleton className="h-4 w-16 ml-auto" />
							</TableHead>
							<TableHead className="text-center w-[100px] whitespace-nowrap">
								<Skeleton className="h-4 w-12 mx-auto" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array(20)
							.fill(0)
							.map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: スケルトン表示用の静的リスト
								<TableRow key={`attendance-skeleton-row-${index}`}>
									<TableCell className="whitespace-nowrap">
										<Skeleton className="h-5 w-24" />
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Skeleton className="h-5 w-32" />
									</TableCell>
									<TableCell className="whitespace-nowrap">
										<Skeleton className="h-5 w-16" />
									</TableCell>
									<TableCell className="text-right whitespace-nowrap">
										<Skeleton className="h-5 w-12 ml-auto" />
									</TableCell>
									<TableCell className="text-right whitespace-nowrap">
										<Skeleton className="h-5 w-12 ml-auto" />
									</TableCell>
									<TableCell className="text-right whitespace-nowrap">
										<Skeleton className="h-5 w-12 ml-auto" />
									</TableCell>
									<TableCell className="text-center whitespace-nowrap">
										<Skeleton className="h-8 w-8 rounded-full mx-auto" />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
			<div className="mt-4 flex justify-center">
				<Skeleton className="h-10 w-72" />
			</div>
		</div>
	);
}
