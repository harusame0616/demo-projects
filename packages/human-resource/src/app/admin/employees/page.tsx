import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { EmployeeListContainer } from "./_components/employee-list-container";
import { SearchForm } from "./_components/search-form";
import {
	getEmployees,
	getDepartments,
	getPositions,
} from "./_actions/employee-actions";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "従業員一覧 | 人材管理システム",
	description: "人材管理システムの従業員一覧",
};

// ローディング状態を表示するスケルトンコンポーネント
function EmployeeListSkeleton() {
	return (
		<div className="space-y-4 w-full">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6 w-full">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
				<div className="flex gap-4">
					<div className="h-10 w-[180px] bg-gray-200 animate-pulse rounded-md" />
					<div className="h-10 w-[180px] bg-gray-200 animate-pulse rounded-md" />
				</div>
			</div>
			<div className="rounded-md border w-full">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
			<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md mt-4" />
		</div>
	);
}

interface EmployeeSearchParams {
	query?: string;
	department?: string;
	position?: string;
	sortBy?: string;
	sortOrder?: string;
	page?: string;
}

interface EmployeesPageProps {
	searchParams: EmployeeSearchParams;
}

export default async function EmployeesPage({
	searchParams,
}: EmployeesPageProps) {
	// ページ番号のパラメータを処理（デフォルトは1ページ目）
	const currentPage = searchParams.page
		? Number.parseInt(searchParams.page, 10)
		: 1;

	// サーバーサイドでデータを取得
	const employeesData = await getEmployees({
		searchQuery: searchParams.query,
		department: searchParams.department,
		position: searchParams.position,
		sortBy: searchParams.sortBy,
		sortOrder: searchParams.sortOrder as "asc" | "desc",
		page: currentPage,
		limit: 20, // 1ページあたり20件
	});

	// 部署と役職のオプションを取得
	const departmentOptions = await getDepartments();
	const positionOptions = await getPositions();

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">従業員一覧</h1>
				<Button asChild>
					<Link href="/admin/employees/new">
						<PlusIcon className="mr-2 h-4 w-4" />
						従業員を追加
					</Link>
				</Button>
			</div>

			<SearchForm
				departmentOptions={departmentOptions}
				positionOptions={positionOptions}
				searchQuery={searchParams.query}
				currentDepartment={searchParams.department}
				currentPosition={searchParams.position}
			/>

			<div className="w-full">
				<Suspense fallback={<EmployeeListSkeleton />}>
					<EmployeeListContainer
						employees={employeesData.items}
						searchParams={searchParams}
						pagination={employeesData.pagination}
					/>
				</Suspense>
			</div>
		</div>
	);
}
