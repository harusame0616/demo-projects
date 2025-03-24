"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PositionFilter } from "./position-filter";
import { PositionTable } from "./position-table";
import type { Position } from "../_data/positions-data";
import type { PositionSearchParams } from "../_actions/position-actions";

interface PositionListContainerProps {
	positions: Position[];
	levelOptions: string[];
	searchParams: PositionSearchParams;
}

export function PositionListContainer({
	positions,
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

	return (
		<>
			<PositionFilter
				searchQuery={searchParams.query || ""}
				currentLevel={searchParams.level || "all"}
				levelOptions={levelOptions}
				onFilter={handleFilter}
			/>
			<PositionTable
				positions={positions}
				searchParams={searchParams}
				onSort={handleSort}
			/>
		</>
	);
}
