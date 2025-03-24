"use client";

import { useRouter, usePathname } from "next/navigation";
import { EmployeeTable } from "./employee-table";
import { PaginationNav } from "@/components/common/pagination-nav";
import type { Employee } from "../_actions/employee-actions";

interface EmployeeListContainerProps {
	employees: Employee[];
	searchParams: {
		query?: string;
		department?: string;
		position?: string;
		sortBy?: string;
		sortOrder?: string;
		page?: string;
	};
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function EmployeeListContainer({
	employees,
	searchParams,
	pagination,
}: EmployeeListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();

	const handleSort = (column: string) => {
		// 現在のURLパラメータを取得
		const params = new URLSearchParams();

		// 検索クエリがあれば維持
		if (searchParams.query) params.set("query", searchParams.query);
		if (searchParams.department)
			params.set("department", searchParams.department);
		if (searchParams.position) params.set("position", searchParams.position);

		// 現在のページを維持
		if (searchParams.page) params.set("page", searchParams.page);

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

	const handlePageChange = (page: number) => {
		// 現在のURLパラメータを取得
		const params = new URLSearchParams();

		// 既存のパラメータを維持
		if (searchParams.query) params.set("query", searchParams.query);
		if (searchParams.department)
			params.set("department", searchParams.department);
		if (searchParams.position) params.set("position", searchParams.position);
		if (searchParams.sortBy) params.set("sortBy", searchParams.sortBy);
		if (searchParams.sortOrder) params.set("sortOrder", searchParams.sortOrder);

		// ページを更新
		params.set("page", page.toString());

		// URLをアップデート
		const queryString = params.toString();
		const url = queryString ? `${pathname}?${queryString}` : pathname;
		router.push(url);
	};

	return (
		<div className="space-y-6 w-full">
			<div className="w-full overflow-auto">
				<EmployeeTable
					employees={employees}
					searchParams={searchParams}
					onSort={handleSort}
				/>
			</div>

			{pagination.totalPages > 1 && (
				<div className="mt-4 flex justify-center w-full">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}
