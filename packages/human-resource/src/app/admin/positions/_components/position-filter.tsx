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
import { SearchIcon, XIcon } from "lucide-react";
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

	const handleClear = () => {
		setQuery("");
		setLevel("all");
		onFilter("", "all");
	};

	return (
		<div className="w-full mb-6 bg-white rounded-xl border p-6 shadow-sm">
			<div className="space-y-6">
				{/* 検索フィールド行 */}
				<div className="flex flex-col md:flex-row gap-4 items-center">
					{/* 検索入力フィールド */}
					<div className="relative flex-1 w-full">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
						<Input
							placeholder="役職名や説明で検索..."
							className="pl-10 w-full h-10 rounded-lg"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSearch();
								}
							}}
						/>
					</div>

					{/* レベル選択 */}
					<div className="w-full md:w-48">
						<Select
							value={level}
							onValueChange={(value) => {
								setLevel(value);
							}}
						>
							<SelectTrigger className="h-10 rounded-lg">
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
					</div>

					{/* ボタン */}
					<div className="flex gap-4 w-full md:w-auto">
						<Button
							onClick={handleSearch}
							type="button"
							className="flex-1 md:flex-none md:w-32 bg-black text-white h-10 rounded-lg"
						>
							検索
						</Button>
						<Button
							onClick={handleClear}
							variant="outline"
							type="button"
							className="flex-1 md:flex-none md:w-32 border-gray-300 h-10 rounded-lg"
						>
							クリア
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
