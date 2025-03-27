"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PositionTable } from "./position-table";
import { PaginationNav } from "@/components/common/pagination-nav";
import { type Position } from "../_data/positions-data";

interface PositionsPresenterProps {
	positions: Position[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function PositionsPresenter({
	positions,
	pagination,
}: PositionsPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// ページ変更処理
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`${pathname}?${params.toString()}`);
	};

	// 現在のソート状態
	const currentSort = searchParams.get("sort") || "level";
	const currentOrder = searchParams.get("order") || "desc";

	// ソート処理
	const handleSort = (column: keyof Position) => {
		const params = new URLSearchParams(searchParams.toString());

		// 同じカラムをクリックした場合は、昇順・降順を切り替え
		if (currentSort === column) {
			params.set("order", currentOrder === "asc" ? "desc" : "asc");
		} else {
			// 異なるカラムの場合は、そのカラムの昇順でソート
			params.set("sort", column as string);
			params.set("order", "asc");
		}

		// ページを1に戻す
		params.delete("page");

		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="space-y-6 w-full">
			<div className="w-full overflow-auto">
				<PositionTable
					positions={positions}
					searchParams={{
						sort: currentSort as keyof Position,
						order: currentOrder as "asc" | "desc",
					}}
					onSort={handleSort}
				/>
			</div>

			{pagination.totalPages > 1 && (
				<div className="mt-4 w-full flex justify-center">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}
