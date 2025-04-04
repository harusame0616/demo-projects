import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function GradeFormSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="h-7 w-48 bg-gray-200 animate-pulse rounded" />
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
					<div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
				</div>

				<div className="space-y-2">
					<div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
					<div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />
				</div>

				<div className="space-y-2">
					<div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
					<div className="h-24 w-full bg-gray-200 animate-pulse rounded" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />
						<div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
					</div>
					<div className="space-y-2">
						<div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />
						<div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end">
				<div className="flex gap-2">
					<div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />
					<div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />
				</div>
			</CardFooter>
		</Card>
	);
}
