"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Department = {
	id: string;
	name: string;
	parentId: string | null;
	level: number;
	memberCount: number;
	createdAt: string;
};

interface DepartmentFilterProps {
	departments: Department[];
	onFilterChange: (filteredDepartments: Department[]) => void;
}

export function DepartmentFilter({
	departments,
	onFilterChange,
}: DepartmentFilterProps) {
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		let filtered = [...departments];

		// キーワード検索
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter((department) =>
				department.name.toLowerCase().includes(term),
			);
		}

		onFilterChange(filtered);
	}, [searchTerm, departments, onFilterChange]);

	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
			<div className="relative w-full">
				<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
				<Input
					placeholder="部署名で検索..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		</div>
	);
}
