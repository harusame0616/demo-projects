"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { type Position } from "../_data/positions-data";

interface PositionFilterProps {
	positions: Position[];
	onFilterChange: (filteredPositions: Position[]) => void;
}

export function PositionFilter({
	positions,
	onFilterChange,
}: PositionFilterProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [levelFilter, setLevelFilter] = useState("all");

	const handleFilter = () => {
		let filteredResults = [...positions];

		// 検索フィルター
		if (searchQuery) {
			filteredResults = filteredResults.filter(
				(position) =>
					position.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					position.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			);
		}

		// レベルフィルター
		if (levelFilter !== "all") {
			filteredResults = filteredResults.filter(
				(position) => position.level.toString() === levelFilter,
			);
		}

		onFilterChange(filteredResults);
	};

	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
			<div className="relative flex-1">
				<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="役職名や説明で検索..."
					className="pl-8"
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						handleFilter();
					}}
				/>
			</div>
			<Select
				value={levelFilter}
				onValueChange={(value) => {
					setLevelFilter(value);
					handleFilter();
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="レベルでフィルター" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">すべて</SelectItem>
					{Array.from(
						new Set(positions.map((position) => position.level.toString())),
					)
						.sort((a, b) => parseInt(b) - parseInt(a))
						.map((level) => (
							<SelectItem key={level} value={level}>
								レベル {level}
							</SelectItem>
						))}
				</SelectContent>
			</Select>
			<Button onClick={handleFilter}>フィルター</Button>
		</div>
	);
}
