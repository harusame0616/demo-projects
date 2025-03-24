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
		<div className="w-full mb-6 bg-white rounded-xl border p-6 shadow-sm">
			<div className="space-y-6">
				<div className="flex flex-col md:flex-row gap-4">
					{/* 検索入力フィールド */}
					<div className="relative flex-1">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
						<Input
							placeholder="部署名で検索..."
							className="pl-10 w-full h-10 rounded-lg"
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

					{/* ボタン */}
					<div className="flex gap-4 md:w-auto">
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
