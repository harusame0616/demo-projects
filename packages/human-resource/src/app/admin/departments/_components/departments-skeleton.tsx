import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function DepartmentsSkeleton() {
	return (
		<div className="space-y-6 w-full">
			{/* 部署テーブルのスケルトン */}
			<div className="w-full overflow-auto">
				<div className="rounded-md border w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px] whitespace-nowrap">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[200px] whitespace-nowrap">
									<Skeleton className="h-4 w-16" />
								</TableHead>
								<TableHead className="w-[200px] whitespace-nowrap">
									<Skeleton className="h-4 w-24" />
								</TableHead>
								<TableHead className="w-[80px] whitespace-nowrap">
									<Skeleton className="h-4 w-16" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array(20)
								.fill(0)
								.map((_, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: スケルトン表示用の静的リスト
									<TableRow key={`department-skeleton-row-${index}`}>
										<TableCell className="font-medium whitespace-nowrap">
											<Skeleton className="h-5 w-32" />
										</TableCell>
										<TableCell className="font-medium whitespace-nowrap">
											<Skeleton className="h-5 w-40" />
										</TableCell>
										<TableCell className="whitespace-nowrap">
											<Skeleton className="h-5 w-24" />
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
			<div className="mt-4 flex justify-center">
				<Skeleton className="h-10 w-64" />
			</div>
		</div>
	);
}
