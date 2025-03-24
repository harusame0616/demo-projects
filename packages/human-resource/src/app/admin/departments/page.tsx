import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DepartmentListContainer } from "./_components/department-list-container";
import { DepartmentFilter } from "./_components/department-filter";
import {
	getDepartments,
	type DepartmentSearchParams,
} from "./_actions/department-actions";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "部署管理 | 人材管理システム",
	description: "部署の一覧と管理",
};

interface DepartmentsPageProps {
	searchParams: DepartmentSearchParams;
}

export default async function DepartmentsPage({
	searchParams,
}: DepartmentsPageProps) {
	// サーバーアクションでデータを取得
	const { items: departments, pagination } = await getDepartments(searchParams);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">部署管理</h1>
				<Button asChild>
					<Link href="/admin/departments/new">新規部署作成</Link>
				</Button>
			</div>
			<p className="text-gray-500">会社の組織構造を部署単位で管理します。</p>

			<DepartmentFilter searchQuery={searchParams.query || ""} />

			<DepartmentListContainer
				departments={departments}
				searchParams={searchParams}
				pagination={pagination}
			/>
		</div>
	);
}
