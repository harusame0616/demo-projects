"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { SearchForm } from "./search-form";
import { AttendanceTable } from "./attendance-table";
import { type Attendance } from "../_data/attendances-data";
import { type AttendanceSearchParams } from "../_actions/attendance-actions";

interface AttendanceListContainerProps {
	attendances: Attendance[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	searchParams: AttendanceSearchParams;
}

export function AttendanceListContainer({
	attendances,
	pagination,
	searchParams,
}: AttendanceListContainerProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// 検索フォームのデフォルト値を設定
	const defaultValues = {
		query: searchParams.query || "",
		employeeId: searchParams.employeeId || "",
		// yearMonthを追加
		yearMonth: searchParams.startDate
			? new Date(searchParams.startDate.substring(0, 7) + "-01")
			: undefined,
	};

	// 検索処理
	const handleSearch = (values: any) => {
		const params = new URLSearchParams();

		// 検索条件をクエリパラメータに設定
		if (values.query) params.set("query", values.query);
		if (values.employeeId) params.set("employeeId", values.employeeId);

		// startDateとendDateを設定 (検索フォームからは yearMonth が送られてくる)
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
			<SearchForm onSearch={handleSearch} defaultValues={defaultValues} />

			{/* 勤怠情報テーブル */}
			<AttendanceTable
				attendances={attendances}
				pagination={pagination}
				searchParams={searchParams}
			/>
		</div>
	);
}
