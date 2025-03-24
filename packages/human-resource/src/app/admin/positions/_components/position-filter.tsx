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
import { useState, useEffect } from "react";

interface PositionFilterProps {
	searchQuery: string;
	currentLevel: string;
	levelOptions: string[];
	onFilter: (query: string, level: string) => void;
}

export function PositionFilter({
	searchQuery,
	currentLevel,
	levelOptions,
	onFilter,
}: PositionFilterProps) {
	const [query, setQuery] = useState(searchQuery);
	const [level, setLevel] = useState(currentLevel);

	// 外部からのprops変更に対応
	useEffect(() => {
		setQuery(searchQuery);
		setLevel(currentLevel);
	}, [searchQuery, currentLevel]);

	const handleSearch = () => {
		onFilter(query, level);
	};

	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
			<div className="relative flex-1">
				<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="役職名や説明で検索..."
					className="pl-8"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						if (e.target.value === "") {
							onFilter("", level);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSearch();
						}
					}}
				/>
			</div>
			<Select
				value={level}
				onValueChange={(value) => {
					setLevel(value);
					onFilter(query, value);
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="レベルでフィルター" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">すべて</SelectItem>
					{levelOptions.map((level) => (
						<SelectItem key={level} value={level}>
							レベル {level}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button onClick={handleSearch}>フィルター</Button>
		</div>
	);
}
