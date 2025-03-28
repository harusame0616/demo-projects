"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { MonthlyAttendanceSummary } from "../_actions/attendance-actions";
import { AttendanceTable } from "./attendance-table";
import { SearchFormPresenter } from "./search-form-presenter";

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
}

export function AttendancesPresenter({
	attendances,
}: AttendancesPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// 検索の初期値を設定
	const _defaultSearchValues = {
		query: searchParams.get("query") || "",
		departmentId: searchParams.get("departmentId") || "all",
		startDate: searchParams.get("startDate") || "",
		endDate: searchParams.get("endDate") || "",
		page: searchParams.get("page") || "1",
	};

	// 検索処理
	const _handleSearch = (values: SearchFormValues) => {
		const params = new URLSearchParams();

		if (values.query) params.set("query", values.query);
		if (values.departmentId) params.set("departmentId", values.departmentId);
		if (values.startDate) params.set("startDate", values.startDate);
		if (values.endDate) params.set("endDate", values.endDate);

		// ページを1にリセット
		params.set("page", "1");

		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<AttendanceTable
			attendances={attendances.items}
			totalPages={attendances.totalPages}
			page={attendances.page}
		/>
	);
}
