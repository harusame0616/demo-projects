"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { User, Employee } from "../types";
import { UserTable } from "./user-table";

interface UsersPresenterProps {
	users: User[];
	employees: Employee[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function UsersPresenter({
	users,
	employees,
	pagination,
}: UsersPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// ページ切り替え処理
	const handlePageChange = (page: number) => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("page", page.toString());
		const newPath = `${pathname}?${newSearchParams}`;
		router.push(newPath);
	};

	// ソート処理
	const handleSort = (column: string) => {
		const currentSortBy = searchParams.get("field");
		const currentSortOrder = searchParams.get("direction");

		const newSearchParams = new URLSearchParams(searchParams);

		if (currentSortBy === column) {
			// 同じカラムの場合、ソート順を切り替え
			const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
			newSearchParams.set("direction", newOrder);
		} else {
			// 異なるカラムの場合、新しいカラムでソート（デフォルト昇順）
			newSearchParams.set("field", column);
			newSearchParams.set("direction", "asc");
		}

		router.push(`${pathname}?${newSearchParams.toString()}`);
	};

	// UserTableコンポーネントに渡すsearchParamsの構築
	const tableSearchParams = {
		query: searchParams.get("query") || undefined,
		role: searchParams.get("role") || undefined,
		status: searchParams.get("status") || undefined,
		sortBy: searchParams.get("field") || undefined,
		sortOrder: (searchParams.get("direction") as "asc" | "desc") || undefined,
		page: searchParams.get("page") || undefined,
	};

	return (
		<div className="space-y-4 w-full">
			{/* ユーザーリスト */}
			<UserTable
				users={users}
				employees={employees}
				searchParams={tableSearchParams}
				onSort={handleSort}
			/>

			{/* ページネーション */}
			{pagination.totalPages > 1 && (
				<div className="flex justify-center mt-4">
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
