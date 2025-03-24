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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PositionFilterProps {
	searchQuery: string;
	currentLevel: string;
	levelOptions: string[];
	onFilter?: (query: string, level: string) => void; // オプショナルに変更
}

export function PositionFilter({
	searchQuery,
	currentLevel,
	levelOptions,
	onFilter,
}: PositionFilterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const [query, setQuery] = useState(searchQuery);
	const [level, setLevel] = useState(currentLevel);

	// 外部からのprops変更に対応
	useEffect(() => {
		setQuery(searchQuery);
		setLevel(currentLevel);
	}, [searchQuery, currentLevel]);

	const handleSearch = () => {
		if (onFilter) {
			onFilter(query, level);
			return;
		}

		// onFilterが提供されていない場合は内部でナビゲーション
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

	const handleClear = () => {
		setQuery("");
		setLevel("all");

		if (onFilter) {
			onFilter("", "all");
			return;
		}

		// onFilterが提供されていない場合は内部でナビゲーション
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.delete("query");
		updatedParams.delete("level");
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="w-full mb-4 bg-white rounded-3xl shadow-sm flex flex-wrap items-center gap-2 p-2">
			<div className="relative flex-1 min-w-[200px]">
				<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
				<Input
					placeholder="役職名や説明で検索..."
					className="pl-10 h-10 rounded-lg border-gray-200"
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

			<div className="w-auto">
				<Select
					value={level}
					onValueChange={(value) => {
						setLevel(value);
					}}
				>
					<SelectTrigger className="h-10 rounded-lg w-[180px] border-gray-200">
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
