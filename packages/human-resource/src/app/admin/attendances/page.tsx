import type { Metadata } from "next";
import { Suspense } from "react";
import { AttendanceListContainer } from "./_components/attendance-list-container";
import {
	getAttendances,
	type AttendanceSearchParams,
} from "./_actions/attendance-actions";
import { getDepartments } from "./_actions/department-actions";

export const metadata: Metadata = {
	title: "勤怠情報（月次集計） | 人材管理システム",
	description: "従業員の月次勤怠集計情報を管理します",
};

// サーバーコンポーネント用のスケルトン
function AttendancePageSkeleton() {
	return (
		<div className="space-y-4">
			<div className="h-48 rounded-md border animate-pulse bg-gray-100" />
			<div className="h-96 rounded-md border animate-pulse bg-gray-100" />
		</div>
	);
}

export default async function AttendancePage({
	searchParams: searchParamsPromise,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const searchParams = await searchParamsPromise;
	// 検索パラメータを整形
	const params: AttendanceSearchParams = {
		query:
			typeof searchParams.query === "string" ? searchParams.query : undefined,
		departmentId:
			typeof searchParams.departmentId === "string"
				? searchParams.departmentId
				: undefined,
		startDate:
			typeof searchParams.startDate === "string"
				? searchParams.startDate
				: undefined,
		endDate:
			typeof searchParams.endDate === "string"
				? searchParams.endDate
				: undefined,
		status:
			typeof searchParams.status === "string" && searchParams.status !== "all"
				? searchParams.status
				: undefined,
		sort: typeof searchParams.sort === "string" ? searchParams.sort : "date",
		order:
			typeof searchParams.order === "string"
				? (searchParams.order as "asc" | "desc")
				: "desc",
		page:
			typeof searchParams.page === "string"
				? Number.parseInt(searchParams.page)
				: 1,
		limit:
			typeof searchParams.limit === "string"
				? Number.parseInt(searchParams.limit)
				: 50,
	};

	// 勤怠情報と部署データを取得
	const [{ attendances, pagination }, departments] = await Promise.all([
		getAttendances(params),
		getDepartments(),
	]);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">勤怠情報（月次集計）</h1>
			</div>

			<Suspense fallback={<AttendancePageSkeleton />}>
				<AttendanceListContainer
					attendances={attendances}
					pagination={pagination}
					searchParams={params}
					departments={departments}
				/>
			</Suspense>
		</div>
	);
}
