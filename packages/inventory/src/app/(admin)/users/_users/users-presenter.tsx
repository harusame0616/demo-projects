"use client";

import { PaginationNav } from "@/components/common/pagination-nav";
import type { PaginationResult } from "@/lib/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { UserOrder } from "../order";
import type { User } from "../types";
import { UserTable } from "./user-table";

interface Props {
	users: User[];
	pagination: PaginationResult;
	order: UserOrder;
}

export function UsersPresenter({ users, pagination, order }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

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

	return (
		<div className="space-y-4 w-full">
			{/* ユーザーリスト */}
			<UserTable users={users} order={order} onSort={handleSort} />

			{/* ページネーション */}
			{pagination.totalPages > 1 && (
				<div className="flex justify-center mt-4">
					<PaginationNav
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
					/>
				</div>
			)}
		</div>
	);
}
