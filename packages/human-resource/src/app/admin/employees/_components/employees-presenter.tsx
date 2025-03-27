"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Employee } from "../types";
import { EmployeeTable } from "./employee-table";

interface EmployeesPresenterProps {
	employees: Employee[];
	searchParams: {
		query?: string;
		department?: string;
		position?: string;
		sortBy?: string;
		sortOrder?: "asc" | "desc";
		page?: string;
	};
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function EmployeesPresenter({
	employees,
	searchParams,
	pagination,
}: EmployeesPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	const handleSort = (column: string) => {
		// 現在のURLパラメータを取得
		const newParams = new URLSearchParams(params.toString());

		// 検索クエリがあれば維持
		if (searchParams.query) newParams.set("query", searchParams.query);
		if (searchParams.department)
			newParams.set("department", searchParams.department);
		if (searchParams.position) newParams.set("position", searchParams.position);

		// 現在のページを維持
		if (searchParams.page) newParams.set("page", searchParams.page);

		// ソート条件を更新
		const currentSortBy = searchParams.sortBy;
		const currentSortOrder = searchParams.sortOrder;

		if (currentSortBy === column) {
			// 同じカラムの場合、ソート順を切り替え
			const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
			newParams.set("sortBy", column);
			newParams.set("sortOrder", newOrder);
		} else {
			// 異なるカラムの場合、新しいカラムでソート（デフォルト昇順）
			newParams.set("sortBy", column);
			newParams.set("sortOrder", "asc");
		}

		// URLをアップデート
		const queryString = newParams.toString();
		const url = queryString ? `${pathname}?${queryString}` : pathname;
		router.push(url);
	};

	const handlePageChange = (page: number) => {
		// 現在のURLパラメータを取得
		const newParams = new URLSearchParams(params.toString());

		// 既存のパラメータを維持
		if (searchParams.query) newParams.set("query", searchParams.query);
		if (searchParams.department)
			newParams.set("department", searchParams.department);
		if (searchParams.position) newParams.set("position", searchParams.position);
		if (searchParams.sortBy) newParams.set("sortBy", searchParams.sortBy);
		if (searchParams.sortOrder)
			newParams.set("sortOrder", searchParams.sortOrder);

		// ページを更新
		newParams.set("page", page.toString());

		// URLをアップデート
		const queryString = newParams.toString();
		const url = queryString ? `${pathname}?${queryString}` : pathname;
		router.push(url);
	};

	return (
		<div className="space-y-6 w-full">
			<div className="w-full overflow-auto">
				<EmployeeTable
					employees={employees}
					searchParams={{
						sortBy: searchParams.sortBy,
						sortOrder: searchParams.sortOrder as "asc" | "desc" | undefined,
					}}
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
