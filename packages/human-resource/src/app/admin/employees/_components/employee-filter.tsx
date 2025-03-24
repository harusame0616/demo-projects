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

// 部署一覧
const departments = [
	{ value: "all", label: "すべての部署" },
	{ value: "営業部", label: "営業部" },
	{ value: "人事部", label: "人事部" },
	{ value: "開発部", label: "開発部" },
	{ value: "マーケティング部", label: "マーケティング部" },
	{ value: "財務部", label: "財務部" },
];

// 役職一覧
const positions = [
	{ value: "all", label: "すべての役職" },
	{ value: "部長", label: "部長" },
	{ value: "課長", label: "課長" },
	{ value: "リーダー", label: "リーダー" },
	{ value: "主任", label: "主任" },
	{ value: "担当", label: "担当" },
];

type Employee = {
	id: string;
	name: string;
	department: string;
	position: string;
	email: string;
	joinDate: string;
};

interface EmployeeFilterProps {
	employees: Employee[];
	onFilterChange: (filteredEmployees: Employee[]) => void;
}

export function EmployeeFilter({
	employees,
	onFilterChange,
}: EmployeeFilterProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [departmentFilter, setDepartmentFilter] = useState("all");
	const [positionFilter, setPositionFilter] = useState("all");
	const [filteredCount, setFilteredCount] = useState(employees.length);
	const [isFiltering, setIsFiltering] = useState(false);

	useEffect(() => {
		// 検索とフィルタリングを適用した従業員リスト
		const filtered = employees.filter((employee) => {
			const matchesSearch =
				employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				employee.id.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesDepartment =
				departmentFilter === "all" || employee.department === departmentFilter;

			const matchesPosition =
				positionFilter === "all" || employee.position === positionFilter;

			return matchesSearch && matchesDepartment && matchesPosition;
		});

		setFilteredCount(filtered.length);
		setIsFiltering(
			searchTerm !== "" ||
				departmentFilter !== "all" ||
				positionFilter !== "all",
		);
		onFilterChange(filtered);
	}, [searchTerm, departmentFilter, positionFilter, employees, onFilterChange]);

	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
				<div className="relative flex-1">
					<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="名前、メール、IDで検索..."
						className="pl-8"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="flex gap-4">
					<div className="w-[180px]">
						<Select
							value={departmentFilter}
							onValueChange={setDepartmentFilter}
						>
							<SelectTrigger>
								<SelectValue placeholder="部署でフィルタ" />
							</SelectTrigger>
							<SelectContent>
								{departments.map((department) => (
									<SelectItem key={department.value} value={department.value}>
										{department.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="w-[180px]">
						<Select value={positionFilter} onValueChange={setPositionFilter}>
							<SelectTrigger>
								<SelectValue placeholder="役職でフィルタ" />
							</SelectTrigger>
							<SelectContent>
								{positions.map((position) => (
									<SelectItem key={position.value} value={position.value}>
										{position.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<div className="mt-4 text-sm text-muted-foreground">
				合計 {filteredCount} 名の従業員が表示されています
				{isFiltering && "（フィルタ適用中）"}
			</div>
		</>
	);
}
