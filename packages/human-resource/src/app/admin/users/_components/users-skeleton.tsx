export function UsersSkeleton() {
	// テーブル行の数
	const rowIds = [
		"id-1",
		"id-2",
		"id-3",
		"id-4",
		"id-5",
		"id-6",
		"id-7",
		"id-8",
		"id-9",
		"id-10",
	];

	return (
		<div className="space-y-6 w-full">
			{/* テーブルスケルトン */}
			<div className="w-full overflow-auto">
				<div className="rounded-md border w-full overflow-hidden">
					{/* テーブルヘッダー */}
					<div className="w-full bg-gray-50 border-b">
						<div className="grid grid-cols-5 h-10">
							<div className="col-span-1 flex items-center px-4">
								<div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
							</div>
							<div className="col-span-1 flex items-center px-4">
								<div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
							</div>
							<div className="col-span-1 flex items-center px-4">
								<div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
							</div>
							<div className="col-span-1 flex items-center px-4">
								<div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
							</div>
							<div className="col-span-1 flex items-center px-4">
								<div className="h-4 w-10 bg-gray-200 animate-pulse rounded" />
							</div>
						</div>
					</div>

					{/* テーブル行 */}
					<div className="divide-y">
						{rowIds.map((id) => (
							<div key={id} className="grid grid-cols-5 h-14 bg-white">
								<div className="col-span-1 flex items-center px-4">
									<div className="h-4 w-32 bg-blue-100 animate-pulse rounded" />
								</div>
								<div className="col-span-1 flex items-center px-4">
									<div className="h-4 w-36 bg-gray-200 animate-pulse rounded" />
								</div>
								<div className="col-span-1 flex items-center px-4">
									<div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
								</div>
								<div className="col-span-1 flex items-center px-4">
									<div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
								</div>
								<div className="col-span-1 flex items-center px-4 justify-end">
									<div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ページネーション */}
			<div className="flex justify-center mt-4">
				<div className="flex gap-1">
					{["prev", "1", "2", "3", "next"].map((id) => (
						<div
							key={id}
							className="h-9 w-9 bg-gray-200 animate-pulse rounded-md"
						/>
					))}
				</div>
			</div>
		</div>
	);
}
