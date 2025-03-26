import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Loading() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<Skeleton className="h-8 w-[200px]" />
				<Button disabled variant="outline">
					ユーザーを追加
				</Button>
			</div>

			{/* 検索フォームのスケルトン */}
			<div className="flex flex-col gap-4 md:flex-row md:items-end">
				<div className="grid gap-2 w-full md:w-auto">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-10 w-[300px]" />
				</div>
				<div className="grid gap-2 w-full md:w-auto">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-10 w-[180px]" />
				</div>
				<div className="grid gap-2 w-full md:w-auto">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-10 w-[180px]" />
				</div>
				<div className="flex items-end space-x-2 mt-auto">
					<Skeleton className="h-10 w-[80px]" />
					<Skeleton className="h-10 w-[80px]" />
				</div>
			</div>

			{/* ユーザーテーブルのスケルトン */}
			<div className="border rounded-lg">
				<div className="p-2 border-b">
					{/* テーブルヘッダー */}
					<div className="grid grid-cols-8 gap-4">
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
					</div>
				</div>
				<div className="divide-y">
					{/* テーブル行（5件分表示） */}
					<div className="p-4">
						<div className="grid grid-cols-8 gap-4">
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-8 mx-auto" />
						</div>
					</div>
					<div className="p-4">
						<div className="grid grid-cols-8 gap-4">
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-8 mx-auto" />
						</div>
					</div>
					<div className="p-4">
						<div className="grid grid-cols-8 gap-4">
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-8 mx-auto" />
						</div>
					</div>
					<div className="p-4">
						<div className="grid grid-cols-8 gap-4">
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-8 mx-auto" />
						</div>
					</div>
					<div className="p-4">
						<div className="grid grid-cols-8 gap-4">
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-8 mx-auto" />
						</div>
					</div>
				</div>
			</div>

			{/* ページネーションのスケルトン */}
			<div className="flex justify-center mt-4">
				<Skeleton className="h-10 w-[300px]" />
			</div>
		</div>
	);
}
