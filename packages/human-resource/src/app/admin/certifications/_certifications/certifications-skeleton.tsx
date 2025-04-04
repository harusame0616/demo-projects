import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function CertificationsSkeleton() {
	return (
		<div className="space-y-4 w-full">
			<div className="border rounded-md w-full overflow-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[180px]">
								<Skeleton className="h-4 w-32" />
							</TableHead>
							<TableHead className="w-[180px]">
								<Skeleton className="h-4 w-24" />
							</TableHead>
							<TableHead className="hidden md:table-cell w-[300px]">
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
								<TableRow key={`certification-skeleton-row-${index}`}>
									<TableCell>
										<Skeleton className="h-5 w-48" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-5 w-32" />
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
			<div className="flex justify-center mt-6 w-full">
				<Skeleton className="h-10 w-64" />
			</div>
		</div>
	);
}
