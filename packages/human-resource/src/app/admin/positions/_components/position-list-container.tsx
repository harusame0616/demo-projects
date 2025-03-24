"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PositionFilter } from "./position-filter";
import { PositionTable } from "./position-table";
import type { Position } from "../_data/positions-data";
import type { PositionSearchParams } from "../_actions/position-actions";
import { Pagination } from "@/components/ui/pagination";

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

	// 検索とフィルター処理
	const handleFilter = (query: string, level: string) => {
		const updatedParams = new URLSearchParams(params.toString());
		if (query) {
			updatedParams.set("query", query);
		} else {
			updatedParams.delete("query");
		}

		if (level && level !== "all") {
			updatedParams.set("level", level);
		} else {
			updatedParams.delete("level");
		}

		// ページをリセット
		updatedParams.delete("page");

		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ソート処理
	const handleSort = (column: keyof Position) => {
		const currentSort = searchParams.sort || "level";
		const currentOrder = searchParams.order || "desc";

		const newOrder =
			currentSort === column && currentOrder === "asc" ? "desc" : "asc";
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("sort", column);
		updatedParams.set("order", newOrder);
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ページ切り替え処理
	const handlePageChange = (page: number) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("page", page.toString());
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<>
			<div className="w-full">
				<PositionFilter
					searchQuery={searchParams.query || ""}
					currentLevel={searchParams.level || "all"}
					levelOptions={levelOptions}
					onFilter={handleFilter}
				/>
			</div>
			<div className="w-full overflow-auto">
				<PositionTable
					positions={positions}
					searchParams={searchParams}
					onSort={handleSort}
				/>
			</div>
			{pagination.totalPages > 1 && (
				<div className="flex justify-center mt-4 w-full">
					<Pagination
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</>
	);
}
