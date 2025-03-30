import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function GradesSkeleton() {
	return (
		<div className="space-y-4 w-full">
			<div className="border rounded-md w-full overflow-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">
								<Skeleton className="h-4 w-24" />
							</TableHead>
							<TableHead className="w-[180px]">
								<Skeleton className="h-4 w-32" />
							</TableHead>
							<TableHead className="w-[100px]">
								<Skeleton className="h-4 w-16" />
							</TableHead>
							<TableHead className="w-[80px]">
								<Skeleton className="h-4 w-16" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array(20)
							.fill(0)
							.map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: スケルトン表示用の静的リスト
								<TableRow key={`grade-skeleton-row-${index}`}>
									<TableCell>
										<Skeleton className="h-5 w-20" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-5 w-32" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-5 w-24" />
									</TableCell>
									<TableCell>
										<div className="flex justify-end">
											<Skeleton className="h-8 w-8 rounded-full" />
										</div>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
			<div className="flex justify-center mt-6 w-full">
				<Skeleton className="h-10 w-64" />
			</div>
		</div>
	);
}
