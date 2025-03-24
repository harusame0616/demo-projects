"use client";

import { useRouter, usePathname } from "next/navigation";
import { EmployeeFilter } from "./employee-filter";
import { EmployeeTable } from "./employee-table";
import type { Employee } from "../_actions/employee-actions";

interface EmployeeListContainerProps {
	employees: Employee[];
	departmentOptions: { value: string; label: string }[];
	positionOptions: { value: string; label: string }[];
	searchParams: {
		query?: string;
		department?: string;
		position?: string;
		sortBy?: string;
		sortOrder?: string;
	};
}

export function EmployeeListContainer({
	employees,
	departmentOptions,
	positionOptions,
	searchParams,
}: EmployeeListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();

	const handleFilter = (
		query: string,
		department: string,
		position: string,
	) => {
		// 現在のURLパラメータを取得
		const params = new URLSearchParams();

		// 有効な値のみパラメータに追加
		if (query) params.set("query", query);
		if (department && department !== "all")
			params.set("department", department);
		if (position && position !== "all") params.set("position", position);

		// ソート条件があれば維持
		if (searchParams.sortBy) params.set("sortBy", searchParams.sortBy);
		if (searchParams.sortOrder) params.set("sortOrder", searchParams.sortOrder);

		// URLをアップデート
		const queryString = params.toString();
		const url = queryString ? `${pathname}?${queryString}` : pathname;
		router.push(url);
	};

	const handleSort = (column: string) => {
		// 現在のURLパラメータを取得
		const params = new URLSearchParams();

		// 検索クエリがあれば維持
		if (searchParams.query) params.set("query", searchParams.query);
		if (searchParams.department)
			params.set("department", searchParams.department);
		if (searchParams.position) params.set("position", searchParams.position);

		// ソート条件を更新
		const currentSortBy = searchParams.sortBy;
		const currentSortOrder = searchParams.sortOrder;

		if (currentSortBy === column) {
			// 同じカラムの場合、ソート順を切り替え
			params.set("sortOrder", currentSortOrder === "asc" ? "desc" : "asc");
		} else {
			// 異なるカラムの場合、新しいカラムでソート（デフォルト昇順）
			params.set("sortOrder", "asc");
		}
		params.set("sortBy", column);

		// URLをアップデート
		const queryString = params.toString();
		const url = queryString ? `${pathname}?${queryString}` : pathname;
		router.push(url);
	};

	return (
		<>
			<EmployeeFilter
				departmentOptions={departmentOptions}
				positionOptions={positionOptions}
				searchQuery={searchParams.query || ""}
				currentDepartment={searchParams.department || "all"}
				currentPosition={searchParams.position || "all"}
				onFilter={handleFilter}
			/>
			<EmployeeTable
				employees={employees}
				searchParams={searchParams}
				onSort={handleSort}
			/>
		</>
	);
}
