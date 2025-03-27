import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function PositionsSkeleton() {
	return (
		<div className="space-y-6 w-full">
			<div className="w-full overflow-auto">
				<div className="rounded-md border w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">
									<Skeleton className="h-4 w-20" />
								</TableHead>
								<TableHead className="w-[150px]">
									<Skeleton className="h-4 w-24" />
								</TableHead>
								<TableHead className="w-[100px]">
									<Skeleton className="h-4 w-16" />
								</TableHead>
								<TableHead className="hidden md:table-cell w-[300px]">
									<Skeleton className="h-4 w-32" />
								</TableHead>
								<TableHead className="w-[100px]">
									<Skeleton className="h-4 w-16" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array(5)
								.fill(0)
								.map((_, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey:
									<TableRow key={`position-skeleton-row-${i}`}>
										<TableCell>
											<Skeleton className="h-5 w-20" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-5 w-24" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-5 w-8" />
										</TableCell>
										<TableCell className="hidden md:table-cell">
											<Skeleton className="h-5 w-full max-w-[280px]" />
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
			</div>
			<div className="mt-4 flex justify-center">
				<Skeleton className="h-10 w-64" />
			</div>
		</div>
	);
}
