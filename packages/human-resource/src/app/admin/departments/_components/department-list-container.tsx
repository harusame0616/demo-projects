"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DepartmentFilter } from "./department-filter";
import { DepartmentTable } from "./department-table";
import type { DepartmentSearchParams } from "../_actions/department-actions";

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
	searchParams: DepartmentSearchParams;
}

export function DepartmentListContainer({
	departments,
	searchParams,
}: DepartmentListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// 検索パラメータを更新する関数
	const handleSearch = (query: string) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("query", query);
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<>
			<DepartmentFilter
				searchQuery={searchParams.query || ""}
				onSearch={handleSearch}
			/>
			<DepartmentTable departments={departments} searchParams={searchParams} />
		</>
	);
}
