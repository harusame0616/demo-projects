"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AttendanceTable } from "./attendance-table";
import { SearchFormPresenter } from "./search-form-presenter";
import type { MonthlyAttendanceSummary } from "../_actions/attendance-actions";

interface Department {
	id: string;
	name: string;
}

export interface SearchFormValues {
	query?: string;
	departmentId?: string;
	startDate?: string;
	endDate?: string;
	page?: string;
}

interface AttendancesPresenterProps {
	attendances: {
		items: MonthlyAttendanceSummary[];
		totalItems: number;
		totalPages: number;
		page: number;
		limit: number;
	};
	departments: Department[];
}

export function AttendancesPresenter({
	attendances,
	departments,
}: AttendancesPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [currentPage, setCurrentPage] = useState(attendances.page);

	// 検索の初期値を設定
	const defaultSearchValues = {
		query: searchParams.get("query") || "",
		departmentId: searchParams.get("departmentId") || "all",
		startDate: searchParams.get("startDate") || "",
		endDate: searchParams.get("endDate") || "",
		page: searchParams.get("page") || "1",
	};

	// 検索処理
	const handleSearch = (values: SearchFormValues) => {
		const params = new URLSearchParams();

		if (values.query) params.set("query", values.query);
		if (values.departmentId) params.set("departmentId", values.departmentId);
		if (values.startDate) params.set("startDate", values.startDate);
		if (values.endDate) params.set("endDate", values.endDate);

		// ページを1にリセット
		params.set("page", "1");

		router.push(`${pathname}?${params.toString()}`);
	};

	// ページ変更処理
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`${pathname}?${params.toString()}`);
		setCurrentPage(page);
	};

	return (
		<AttendanceTable
			attendances={attendances.items}
			totalItems={attendances.totalItems}
			totalPages={attendances.totalPages}
			page={attendances.page}
			limit={attendances.limit}
			onPageChange={handlePageChange}
		/>
	);
}
