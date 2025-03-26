"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { SearchForm } from "./search-form";
import { AttendanceTable } from "./attendance-table";
import type { Attendance } from "../_data/attendances-data";
import type { AttendanceSearchParams } from "../_actions/attendance-actions";

interface Department {
	id: string;
	name: string;
}

interface SearchFormValues {
	query?: string;
	departmentId?: string;
	startDate?: string;
	endDate?: string;
	startYearMonth?: string;
	endYearMonth?: string;
}

interface AttendanceListContainerProps {
	attendances: Attendance[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	searchParams: AttendanceSearchParams;
	departments: Department[];
}

export function AttendanceListContainer({
	attendances,
	pagination,
	searchParams,
	departments,
}: AttendanceListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// 日付文字列をYYYY-MM形式に変換するヘルパー関数
	const formatDateToYearMonth = (dateStr?: string) => {
		if (!dateStr) return "";
		return dateStr.substring(0, 7); // YYYY-MM-DD から YYYY-MM を取得
	};

	// 検索フォームのデフォルト値を設定
	const defaultValues = {
		query: searchParams.query || "",
		departmentId: searchParams.departmentId || "",
		startYearMonth: searchParams.startDate
			? formatDateToYearMonth(searchParams.startDate)
			: "",
		endYearMonth: searchParams.endDate
			? formatDateToYearMonth(searchParams.endDate)
			: "",
	};

	// 検索処理
	const handleSearch = (values: SearchFormValues) => {
		const params = new URLSearchParams();

		// 検索条件をクエリパラメータに設定
		if (values.query) params.set("query", values.query);
		if (values.departmentId) params.set("departmentId", values.departmentId);
		if (values.startDate) params.set("startDate", values.startDate);
		if (values.endDate) params.set("endDate", values.endDate);

		// ページを1に戻す
		params.set("page", "1");

		// URLを更新して再取得
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="space-y-6">
			{/* 検索フォーム */}
			<SearchForm
				onSearch={handleSearch}
				defaultValues={defaultValues}
				departments={departments}
			/>

			{/* 勤怠情報テーブル */}
			<AttendanceTable
				attendances={attendances}
				pagination={pagination}
				searchParams={searchParams}
			/>
		</div>
	);
}
