"use client";

import { useState } from "react";
import { EmployeeFilter } from "./employee-filter";
import { EmployeeTable } from "./employee-table";

type Employee = {
	id: string;
	name: string;
	department: string;
	position: string;
	email: string;
	joinDate: string;
};

interface EmployeeListContainerProps {
	employees: Employee[];
}

export function EmployeeListContainer({
	employees,
}: EmployeeListContainerProps) {
	const [filteredEmployees, setFilteredEmployees] =
		useState<Employee[]>(employees);

	return (
		<>
			<EmployeeFilter
				employees={employees}
				onFilterChange={setFilteredEmployees}
			/>
			<EmployeeTable employees={filteredEmployees} />
		</>
	);
}
