import { PageHeader } from "@/components/common/page-header";
import { Metadata } from "next";
import { Suspense } from "react";
import type {
	AttendanceSearchParams,
	SortField,
} from "./_actions/attendance-actions";
import { AttendancesContainer } from "./_components/attendances-container";
import { AttendancesSkeleton } from "./_components/attendances-skeleton";
import { SearchFormContainer } from "./_components/search-form-container";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export const metadata = {
	title: "勤怠情報一覧 | 人事管理システム",
	description: "従業員の勤怠情報を確認できます。",
};

interface PageProps {
	searchParams: Promise<{
		query?: string;
		departmentId?: string;
		startYearMonth?: string;
		endYearMonth?: string;
		page?: string;
		sort?: string;
		order?: string;
	}>;
}

export default async function AttendancesPage({ searchParams }: PageProps) {
	// searchParamsを解決
	const resolvedSearchParams = await searchParams;

	// 検索パラメータの処理
	const attendanceSearchParams: AttendanceSearchParams = {
		query: resolvedSearchParams.query,
		departmentId: resolvedSearchParams.departmentId,
		startYearMonth: resolvedSearchParams.startYearMonth,
		endYearMonth: resolvedSearchParams.endYearMonth,
		page: resolvedSearchParams.page
			? Number.parseInt(resolvedSearchParams.page, 10)
			: 1,
		sort: resolvedSearchParams.sort as SortField,
		order: (resolvedSearchParams.order as "asc" | "desc") || "desc",
	};

	// Suspenseのキーとして使用するためのクエリパラメータのJSON文字列化
	const searchParamsKey = JSON.stringify(resolvedSearchParams);

	// 検索フォームの初期値を設定
	const defaultSearchValues = {
		query: resolvedSearchParams.query || "",
		departmentId: resolvedSearchParams.departmentId || "all",
		startYearMonth: resolvedSearchParams.startYearMonth || "",
		endYearMonth: resolvedSearchParams.endYearMonth || "",
	};

	return (
		<>
			<PageHeader title="勤怠情報" />

			<div className="flex flex-col space-y-6">
				<Suspense
					key={`search-form-${searchParamsKey}`}
					fallback={
						<SearchFormPresenter
							departments={[]}
							defaultValues={defaultSearchValues}
							isLoading={true}
						/>
					}
				>
					<SearchFormContainer
						searchQuery={resolvedSearchParams.query}
						departmentId={resolvedSearchParams.departmentId}
						startYearMonth={defaultSearchValues.startYearMonth}
						endYearMonth={defaultSearchValues.endYearMonth}
					/>
				</Suspense>

				<Suspense
					key={`attendances-${searchParamsKey}`}
					fallback={<AttendancesSkeleton />}
				>
					<AttendancesContainer searchParams={attendanceSearchParams} />
				</Suspense>
			</div>
		</>
	);
}
