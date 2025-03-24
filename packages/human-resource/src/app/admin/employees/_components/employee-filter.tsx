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
import { useEffect, useState } from "react";

interface EmployeeFilterProps {
	departmentOptions: { value: string; label: string }[];
	positionOptions: { value: string; label: string }[];
	searchQuery: string;
	currentDepartment: string;
	currentPosition: string;
	onFilter: (query: string, department: string, position: string) => void;
}

export function EmployeeFilter({
	departmentOptions,
	positionOptions,
	searchQuery,
	currentDepartment,
	currentPosition,
	onFilter,
}: EmployeeFilterProps) {
	const [query, setQuery] = useState(searchQuery);
	const [department, setDepartment] = useState(currentDepartment);
	const [position, setPosition] = useState(currentPosition);

	// プロップが変更されたら内部の状態を更新
	useEffect(() => {
		setQuery(searchQuery);
		setDepartment(currentDepartment);
		setPosition(currentPosition);
	}, [searchQuery, currentDepartment, currentPosition]);

	const handleSearch = () => {
		onFilter(query, department, position);
	};

	const handleClear = () => {
		setQuery("");
		setDepartment("all");
		setPosition("all");
		onFilter("", "all", "all");
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
							placeholder="名前、メール、IDで検索..."
							className="pl-10 w-full h-10 rounded-lg"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSearch();
								}
							}}
						/>
					</div>

					{/* 部署選択 */}
					<div className="w-full md:w-48">
						<Select
							value={department}
							onValueChange={(value) => {
								setDepartment(value);
							}}
						>
							<SelectTrigger className="h-10 rounded-lg">
								<SelectValue placeholder="すべての部署" />
							</SelectTrigger>
							<SelectContent>
								{departmentOptions.map((department) => (
									<SelectItem key={department.value} value={department.value}>
										{department.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* 役職選択 */}
					<div className="w-full md:w-48">
						<Select
							value={position}
							onValueChange={(value) => {
								setPosition(value);
							}}
						>
							<SelectTrigger className="h-10 rounded-lg">
								<SelectValue placeholder="すべての役職" />
							</SelectTrigger>
							<SelectContent>
								{positionOptions.map((position) => (
									<SelectItem key={position.value} value={position.value}>
										{position.label}
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
