"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
import type { PaginationResult } from "@/lib/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type EmployeeOrder, OrderDirection } from "../order";
import type { Employee } from "../types";
import { EmployeeTable } from "./employee-table";

interface Props {
	employees: Employee[];
	order: EmployeeOrder;
	pagination: PaginationResult;
}

export function EmployeesPresenter({ employees, order, pagination }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	const handleSort = (column: string) => {
		// 現在のURLパラメータを取得
		const newParams = new URLSearchParams(params.toString());

		// 検索クエリがあれば維持
		if (order.field) newParams.set("field", order.field);
		if (order.direction) newParams.set("direction", order.direction);

		// 現在のページを維持
		if (pagination.page) newParams.set("page", pagination.page.toString());

		if (order.field === column) {
			// 同じカラムの場合、ソート順を切り替え
			const newOrder =
				order.direction === OrderDirection.Asc
					? OrderDirection.Desc
					: OrderDirection.Asc;
			newParams.set("field", column);
			newParams.set("direction", newOrder);
		} else {
			// 異なるカラムの場合、新しいカラムでソート（デフォルト昇順）
			newParams.set("field", column);
			newParams.set("direction", "asc");
		}

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
					order={order}
					onSort={handleSort}
				/>
			</div>

			{pagination.totalPages > 1 && (
				<div className="mt-4 flex justify-center w-full">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
					/>
				</div>
			)}
		</div>
	);
}
