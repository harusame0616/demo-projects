"use client";

import { useState } from "react";
import { DepartmentFilter } from "./department-filter";
import { DepartmentTable } from "./department-table";

type Department = {
	id: string;
	name: string;
	parentId: string | null;
	level: number;
	memberCount: number;
	createdAt: string;
};

interface DepartmentListContainerProps {
	departments: Department[];
}

export function DepartmentListContainer({
	departments,
}: DepartmentListContainerProps) {
	const [filteredDepartments, setFilteredDepartments] =
		useState<Department[]>(departments);

	return (
		<>
			<DepartmentFilter
				departments={departments}
				onFilterChange={setFilteredDepartments}
			/>
			<DepartmentTable departments={filteredDepartments} />
		</>
	);
}
