"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface DepartmentFilterProps {
	searchQuery: string;
	onSearch: (query: string) => void;
}

export function DepartmentFilter({
	searchQuery,
	onSearch,
}: DepartmentFilterProps) {
	const [searchTerm, setSearchTerm] = useState(searchQuery);

	// フィルター変更時にURLを更新
	const handleSearch = () => {
		onSearch(searchTerm);
	};

	// フォームをクリア
	const handleClear = () => {
		setSearchTerm("");
		onSearch("");
	};

	// Enterキーでの検索
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
			<div className="relative w-full flex gap-2">
				<div className="relative flex-1">
					<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
					<Input
						placeholder="部署名で検索..."
						className="pl-8"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							if (e.target.value === "") {
								onSearch("");
							}
						}}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className="flex gap-2">
					<Button onClick={handleSearch} type="button">
						検索
					</Button>
					<Button onClick={handleClear} variant="outline" type="button">
						クリア
					</Button>
				</div>
			</div>
		</div>
	);
}
