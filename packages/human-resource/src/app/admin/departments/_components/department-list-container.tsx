"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DepartmentFilter } from "./department-filter";
import { DepartmentTable } from "./department-table";
import { Pagination } from "@/components/ui/pagination";
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
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function DepartmentListContainer({
	departments,
	searchParams,
	pagination,
}: DepartmentListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// 検索パラメータを更新する関数
	const handleSearch = (query: string) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("query", query);
		// 検索時はページを1に戻す
		updatedParams.set("page", "1");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ページ切り替え時の処理
	const handlePageChange = (page: number) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("page", page.toString());
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="space-y-6">
			<DepartmentFilter
				searchQuery={searchParams.query || ""}
				onSearch={handleSearch}
			/>
			<DepartmentTable departments={departments} searchParams={searchParams} />

			{pagination.totalPages > 1 && (
				<div className="mt-4">
					<Pagination
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}
