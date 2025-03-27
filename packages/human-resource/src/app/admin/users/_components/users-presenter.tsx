"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PaginationNav } from "@/components/common/pagination-nav";
import { UserTable } from "./user-table";
import type { User } from "@/app/_mocks/users";
import type { Employee } from "@/app/_mocks/employees";

interface UsersPresenterProps {
	users: User[];
	employees: Employee[];
	searchParams: {
		query?: string;
		role?: string;
		status?: string;
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

export function UsersPresenter({
	users,
	employees,
	searchParams,
	pagination,
}: UsersPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// ソートハンドラー
	const handleSort = (column: string) => {
		const newOrder =
			searchParams.sortBy === column && searchParams.sortOrder === "asc"
				? "desc"
				: "asc";

		const updatedParams = new URLSearchParams(params.toString());

		if (searchParams.query) {
			updatedParams.set("query", searchParams.query);
		}

		if (searchParams.role) {
			updatedParams.set("role", searchParams.role);
		}

		if (searchParams.status) {
			updatedParams.set("status", searchParams.status);
		}

		updatedParams.set("sortBy", column);
		updatedParams.set("sortOrder", newOrder);

		// ページを1に戻す
		updatedParams.set("page", "1");

		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ページ切り替えハンドラー
	const handlePageChange = (page: number) => {
		const updatedParams = new URLSearchParams(params.toString());

		if (searchParams.query) {
			updatedParams.set("query", searchParams.query);
		}

		if (searchParams.role) {
			updatedParams.set("role", searchParams.role);
		}

		if (searchParams.status) {
			updatedParams.set("status", searchParams.status);
		}

		if (searchParams.sortBy) {
			updatedParams.set("sortBy", searchParams.sortBy);
		}

		if (searchParams.sortOrder) {
			updatedParams.set("sortOrder", searchParams.sortOrder);
		}

		updatedParams.set("page", page.toString());

		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="space-y-4">
			<UserTable
				users={users}
				employees={employees}
				searchParams={searchParams}
				onSort={handleSort}
			/>

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
