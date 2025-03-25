import { Metadata } from "next";
import { Suspense } from "react";
import { AttendanceListContainer } from "./_components/attendance-list-container";
import {
	getAttendances,
	type AttendanceSearchParams,
} from "./_actions/attendance-actions";

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
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// 検索パラメータを整形
	const params: AttendanceSearchParams = {
		query:
			typeof searchParams.query === "string" ? searchParams.query : undefined,
		employeeId:
			typeof searchParams.employeeId === "string"
				? searchParams.employeeId
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
			typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1,
		limit:
			typeof searchParams.limit === "string"
				? parseInt(searchParams.limit)
				: 10,
	};

	// 勤怠情報を取得
	const { attendances, pagination } = await getAttendances(params);

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
				/>
			</Suspense>
		</div>
	);
}
