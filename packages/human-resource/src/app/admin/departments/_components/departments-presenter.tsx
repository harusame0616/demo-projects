"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DepartmentTable } from "./department-table";

type Department = {
	id: string;
	name: string;
	parentId: string | null;
	level: number;
	memberCount: number;
	createdAt: string;
};

interface DepartmentsPresenterProps {
	departments: Department[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function DepartmentsPresenter({
	departments,
	pagination,
}: DepartmentsPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// 現在のソート状態
	const currentSort = searchParams.get("sort") || "name";
	const currentOrder = searchParams.get("order") || "asc";

	// ソート処理
	const handleSort = (column: string) => {
		const params = new URLSearchParams(searchParams.toString());

		// 同じカラムをクリックした場合は、昇順・降順を切り替え
		if (currentSort === column) {
			params.set("order", currentOrder === "asc" ? "desc" : "asc");
		} else {
			// 異なるカラムの場合は、そのカラムの昇順でソート
			params.set("sort", column);
			params.set("order", "asc");
		}

		// ページを1に戻す
		params.delete("page");

		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="space-y-6 w-full">
			<div className="w-full overflow-auto">
				<DepartmentTable
					departments={departments}
					currentSort={currentSort}
					currentOrder={currentOrder}
					onSort={handleSort}
				/>
			</div>

			{pagination.totalPages > 1 && (
				<div className="mt-4 w-full flex justify-center">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
					/>
				</div>
			)}
		</div>
	);
}
