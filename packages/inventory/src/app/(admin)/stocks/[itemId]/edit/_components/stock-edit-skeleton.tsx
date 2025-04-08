import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export function StockEditSkeleton() {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="space-y-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label>商品名</Label>
							<Skeleton className="h-9 max-w-64 w-full" />
						</div>

						<div className="space-y-2">
							<Label>バーコード番号（JAN）</Label>
							<Skeleton className="h-9 max-w-36 w-full" />
						</div>

						<div className="space-y-2">
							<Label>セット数</Label>
							<Skeleton className="h-9 max-w-24 w-full" />
						</div>
					</div>

					<div className="flex items-center pt-4 gap-2">
						<Skeleton className="h-9 w-18" />
						<Skeleton className="h-9 w-26" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
