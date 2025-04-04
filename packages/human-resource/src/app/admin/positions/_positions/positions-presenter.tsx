"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
import { OrderDirection } from "@/lib/order";
import type { PaginationResult } from "@/lib/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Position } from "../_data/positions-data";
import type { PositionOrder, PositionOrderField } from "../order";
import { PositionTable } from "./position-table";

type Props = {
	positions: Position[];
	order: PositionOrder;
	pagination: PaginationResult;
};

export function PositionsPresenter({ positions, pagination, order }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSort = (column: PositionOrderField) => {
		const params = new URLSearchParams(searchParams.toString());

		if (order.field === column) {
			params.set(
				"order",
				order.direction === OrderDirection.Asc
					? OrderDirection.Desc
					: OrderDirection.Asc,
			);
		} else {
			params.set("field", column as string);
			params.set("direction", OrderDirection.Asc);
		}

		params.delete("page");

		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="space-y-6 w-full">
			<div className="w-full overflow-auto">
				<PositionTable
					positions={positions}
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
