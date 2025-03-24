"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface DepartmentFilterProps {
	searchQuery: string;
	onSearch?: (query: string) => void; // オプショナルに変更
}

export function DepartmentFilter({
	searchQuery,
	onSearch,
}: DepartmentFilterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchQuery);

	// フィルター変更時にURLを更新
	const handleSearch = () => {
		if (onSearch) {
			onSearch(searchTerm);
			return;
		}

		// onSearchが提供されていない場合は内部でナビゲーション
		const updatedParams = new URLSearchParams(params.toString());
		if (searchTerm) {
			updatedParams.set("query", searchTerm);
		} else {
			updatedParams.delete("query");
		}
		// 検索時はページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// フォームをクリア
	const handleClear = () => {
		setSearchTerm("");

		if (onSearch) {
			onSearch("");
			return;
		}

		// onSearchが提供されていない場合は内部でナビゲーション
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.delete("query");
		updatedParams.delete("page"); // ページもリセット
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// Enterキーでの検索
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="w-full mb-4 bg-white rounded-3xl shadow-sm flex flex-wrap items-center gap-2 p-2">
			<div className="relative flex-1 min-w-[200px]">
				<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
				<Input
					placeholder="部署名で検索..."
					className="pl-10 h-10 rounded-lg border-gray-200"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						if (e.target.value === "" && onSearch) {
							onSearch("");
						}
					}}
					onKeyDown={handleKeyDown}
				/>
			</div>

			<Button
				onClick={handleSearch}
				type="button"
				className="bg-black text-white h-10 rounded-lg w-24"
			>
				検索
			</Button>
			<Button
				onClick={handleClear}
				variant="outline"
				type="button"
				className="border-gray-300 h-10 rounded-lg w-24"
			>
				クリア
			</Button>
		</div>
	);
}
