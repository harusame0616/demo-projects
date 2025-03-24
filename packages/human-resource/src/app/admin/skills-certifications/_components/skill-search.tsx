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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import type { SkillCertificationType } from "../_data/skills-certifications-data";

interface SkillSearchProps {
	initialQuery?: string;
	initialType?: SkillCertificationType | "all";
}

export function SkillSearch({
	initialQuery = "",
	initialType = "all",
}: SkillSearchProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const searchInputRef = useRef<HTMLInputElement>(null);

	// 検索処理
	const handleSearch = () => {
		if (!searchInputRef.current) return;

		const searchQuery = searchInputRef.current.value;
		const updatedParams = new URLSearchParams(params.toString());

		if (searchQuery) {
			updatedParams.set("query", searchQuery);
		} else {
			updatedParams.delete("query");
		}

		// 検索時はページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// タイプ変更処理
	const handleTypeChange = (value: string) => {
		const updatedParams = new URLSearchParams(params.toString());

		if (value === "all") {
			updatedParams.delete("type");
		} else {
			updatedParams.set("type", value);
		}

		// フィルター変更時はページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// クリア処理
	const handleClear = () => {
		if (searchInputRef.current) {
			searchInputRef.current.value = "";
		}

		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.delete("query");
		updatedParams.delete("type");
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="w-full mb-4 bg-white rounded-3xl shadow-sm flex flex-wrap items-center gap-2 p-2">
			<div className="relative flex-1 min-w-[200px]">
				<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
				<Input
					placeholder="名称または説明で検索..."
					className="pl-10 h-10 rounded-lg border-gray-200"
					defaultValue={initialQuery}
					onChange={(e) => {
						if (e.target.value === "") {
							const updatedParams = new URLSearchParams(params.toString());
							updatedParams.delete("query");
							updatedParams.delete("page");
							router.push(`${pathname}?${updatedParams.toString()}`);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSearch();
						}
					}}
					ref={searchInputRef}
				/>
			</div>

			<div className="w-auto">
				<Select defaultValue={initialType} onValueChange={handleTypeChange}>
					<SelectTrigger className="h-10 rounded-lg w-[180px] border-gray-200">
						<SelectValue placeholder="種類でフィルター" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">すべて</SelectItem>
						<SelectItem value="skill">スキル</SelectItem>
						<SelectItem value="certification">資格</SelectItem>
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
