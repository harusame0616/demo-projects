import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function DepartmentFormSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Skeleton className="h-6 w-32" />
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-10 w-[200px]" />
				</div>

				<div className="space-y-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-10 w-full" />
				</div>

				<div className="space-y-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-10 w-full" />
				</div>
			</CardContent>
			<CardFooter className="flex justify-end">
				<div className="flex gap-2">
					<Skeleton className="h-10 w-24" />
					<Skeleton className="h-10 w-24" />
				</div>
			</CardFooter>
		</Card>
	);
}
