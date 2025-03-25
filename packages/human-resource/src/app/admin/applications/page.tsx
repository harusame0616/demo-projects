import {
	getApplicationList,
	type ApplicationSearchParams,
} from "./_actions/application-actions";
import { ApplicationTable } from "./_components/application-table";
import { SearchForm } from "./_components/search-form";
import { Button } from "@/components/ui/button";
import { FileDownIcon } from "lucide-react";

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
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">申請管理</h1>
				<Button variant="outline">
					<FileDownIcon className="mr-2 h-4 w-4" />
					エクスポート
				</Button>
			</div>

			<SearchForm searchParams={searchParams} />

			<ApplicationTable
				applications={applicationsData.items}
				pagination={applicationsData.pagination}
				searchParams={searchParams}
			/>
		</div>
	);
}
