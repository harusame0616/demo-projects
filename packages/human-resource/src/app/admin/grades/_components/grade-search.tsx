"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface GradeSearchProps {
	initialQuery?: string;
}

export function GradeSearch({ initialQuery = "" }: GradeSearchProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(initialQuery);

	// 検索ハンドラー
	const handleSearch = () => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("query", searchTerm);
		// 検索時はページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// クリアハンドラー
	const handleClear = () => {
		setSearchTerm("");
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.delete("query");
		updatedParams.delete("page"); // ページもリセット
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="w-full mb-4 bg-white rounded-3xl shadow-sm flex flex-wrap items-center gap-2 p-2">
			<div className="relative flex-1 min-w-[200px]">
				<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
				<Input
					placeholder="グレードを検索..."
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						if (e.target.value === "") {
							const updatedParams = new URLSearchParams(params.toString());
							updatedParams.delete("query");
							updatedParams.delete("page"); // ページもリセット
							router.push(`${pathname}?${updatedParams.toString()}`);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSearch();
						}
					}}
					className="pl-10 h-10 rounded-lg border-gray-200"
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
