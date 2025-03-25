import {
	getApplicationList,
	type ApplicationSearchParams,
} from "./_actions/application-actions";
import { ApplicationTable } from "./_components/application-table";
import { SearchForm } from "./_components/search-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "申請管理 | 人材管理システム",
	description: "勤怠修正・休暇申請の申請管理",
};

export default async function ApplicationsPage({
	searchParams,
}: {
	searchParams: ApplicationSearchParams;
}) {
	// 申請一覧を取得（ステータスによるフィルタリングを含む）
	const applicationsData = await getApplicationList({
		query: searchParams.query,
		type: searchParams.type,
		status: searchParams.status,
		date: searchParams.date,
		page: searchParams.page,
	});

	return (
		<div className="w-full flex-1">
			<h2 className="text-3xl font-bold tracking-tight mb-6">申請管理</h2>

			<div className="w-full">
				<div className="mb-6">
					<SearchForm searchParams={searchParams} />
				</div>
				<ApplicationTable
					applications={applicationsData.items}
					pagination={applicationsData.pagination}
					searchParams={searchParams}
				/>
			</div>
		</div>
	);
}
