"use client";

import { useState } from "react";
import { PositionFilter } from "./position-filter";
import { PositionTable } from "./position-table";
import type { Position } from "../_data/positions-data";

interface PositionListContainerProps {
	positions: Position[];
}

export function PositionListContainer({
	positions,
}: PositionListContainerProps) {
	const [filteredPositions, setFilteredPositions] =
		useState<Position[]>(positions);

	return (
		<>
			<PositionFilter
				positions={positions}
				onFilterChange={setFilteredPositions}
			/>
			<PositionTable positions={filteredPositions} />
		</>
	);
}
