"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PositionTable } from "./position-table";
import type { Position } from "../_data/positions-data";
import type { PositionSearchParams } from "../_actions/position-actions";
import { PaginationNav } from "@/components/common/pagination-nav";

interface PositionListContainerProps {
	positions: Position[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	levelOptions: string[];
	searchParams: PositionSearchParams;
}

export function PositionListContainer({
	positions,
	pagination,
	levelOptions,
	searchParams,
}: PositionListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// ソート処理
	const handleSort = (column: keyof Position) => {
		const currentSort = searchParams.sort || "level";
		const currentOrder = searchParams.order || "desc";

		const newOrder =
			currentSort === column && currentOrder === "asc" ? "desc" : "asc";
		const updatedParams = new URLSearchParams(params.toString());

		// 既存のパラメータを維持
		if (searchParams.query) {
			updatedParams.set("query", searchParams.query);
		}
		if (searchParams.level) {
			updatedParams.set("level", searchParams.level);
		}
		if (searchParams.page) {
			updatedParams.set("page", searchParams.page.toString());
		}

		// ソート条件を更新
		updatedParams.set("sort", column);
		updatedParams.set("order", newOrder);

		// デバッグ用ログ
		console.log(
			`Sorting: ${column}, Order: ${newOrder}, Params: ${updatedParams.toString()}`,
		);

		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ページ切り替え処理
	const handlePageChange = (page: number) => {
		const updatedParams = new URLSearchParams(params.toString());

		// 既存のパラメータを維持
		if (searchParams.query) {
			updatedParams.set("query", searchParams.query);
		}
		if (searchParams.level) {
			updatedParams.set("level", searchParams.level);
		}
		if (searchParams.sort) {
			updatedParams.set("sort", searchParams.sort);
		}
		if (searchParams.order) {
			updatedParams.set("order", searchParams.order);
		}

		// ページを更新
		updatedParams.set("page", page.toString());

		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="space-y-6 w-full">
			<div className="w-full overflow-auto">
				<PositionTable
					positions={positions}
					searchParams={searchParams}
					onSort={handleSort}
				/>
			</div>
			{pagination.totalPages > 1 && (
				<div className="flex justify-center mt-4 w-full">
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
