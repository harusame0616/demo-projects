"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
import { OrderDirection } from "@/lib/order";
import type { PaginationResult } from "@/lib/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DepartmentOrder } from "../order";
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
	pagination: PaginationResult;
	order: DepartmentOrder;
}

export function DepartmentsPresenter({
	departments,
	pagination,
	order,
}: DepartmentsPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSort = (column: string) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());

		if (order.field === column) {
			newSearchParams.set(
				"direction",
				order.direction === OrderDirection.Asc
					? OrderDirection.Desc
					: OrderDirection.Asc,
			);
		} else {
			newSearchParams.set("field", column);
			newSearchParams.set("direction", OrderDirection.Asc);
		}

		newSearchParams.delete("page");

		router.push(`${pathname}?${newSearchParams.toString()}`);
	};

	return (
		<div className="space-y-4 w-full">
			<div className="w-full overflow-auto">
				<DepartmentTable
					departments={departments}
					order={order}
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
