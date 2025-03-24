"use client";

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

	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
				<div className="relative flex-1">
					<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="名前、メール、IDで検索..."
						className="pl-8"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearch();
							}
						}}
					/>
				</div>
				<div className="flex gap-4">
					<div className="w-[180px]">
						<Select
							value={department}
							onValueChange={(value) => {
								setDepartment(value);
								onFilter(query, value, position);
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="部署でフィルタ" />
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
					<div className="w-[180px]">
						<Select
							value={position}
							onValueChange={(value) => {
								setPosition(value);
								onFilter(query, department, value);
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="役職でフィルタ" />
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
				</div>
			</div>
		</>
	);
}
