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
		<div className="space-y-4">
			{/* 検索フォームのスケルトン部分はSearchFormPresenterで対応 */}

			{/* 部署テーブルのスケルトン */}
			<div className="space-y-6 w-full">
				<div className="w-full overflow-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[200px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead>
									<Skeleton className="h-4 w-16" />
								</TableHead>
								<TableHead>
									<Skeleton className="h-4 w-24" />
								</TableHead>
								<TableHead className="text-right">
									<Skeleton className="h-4 w-16 ml-auto" />
								</TableHead>
								<TableHead className="w-[100px]">
									<Skeleton className="h-4 w-16" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array(5)
								.fill(0)
								.map((_, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey:
									<TableRow key={`skeleton-row-${index}`}>
										<TableCell>
											<Skeleton className="h-5 w-32" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-5 w-16" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-5 w-24" />
										</TableCell>
										<TableCell className="text-right">
											<Skeleton className="h-5 w-12 ml-auto" />
										</TableCell>
										<TableCell>
											<div className="flex justify-end gap-2">
												<Skeleton className="h-8 w-8 rounded-full" />
												<Skeleton className="h-8 w-8 rounded-full" />
											</div>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</div>
				<div className="mt-4 flex justify-center">
					<Skeleton className="h-10 w-64" />
				</div>
			</div>
		</div>
	);
}
