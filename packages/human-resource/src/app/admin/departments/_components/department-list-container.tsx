"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DepartmentTable } from "./department-table";
import { PaginationNav } from "@/components/common/pagination-nav";
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

	// ページ切り替え時の処理
	const handlePageChange = (page: number) => {
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("page", page.toString());
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="space-y-6 w-full">
			<div className="w-full overflow-auto">
				<DepartmentTable
					departments={departments}
					searchParams={searchParams}
				/>
			</div>

			{pagination.totalPages > 1 && (
				<div className="mt-4 w-full flex justify-center">
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
