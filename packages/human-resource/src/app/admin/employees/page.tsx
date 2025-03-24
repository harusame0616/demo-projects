import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { EmployeeListContainer } from "./_components/employee-list-container";
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
		<div className="space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
				<div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
				<div className="flex gap-4">
					<div className="h-10 w-[180px] bg-gray-200 animate-pulse rounded-md" />
					<div className="h-10 w-[180px] bg-gray-200 animate-pulse rounded-md" />
				</div>
			</div>
			<div className="rounded-md border">
				<div className="h-[400px] bg-gray-100 animate-pulse rounded-md" />
			</div>
		</div>
	);
}

interface EmployeesPageProps {
	searchParams: {
		query?: string;
		department?: string;
		position?: string;
		sortBy?: string;
		sortOrder?: string;
	};
}

export default async function EmployeesPage({
	searchParams,
}: EmployeesPageProps) {
	// サーバーサイドでデータを取得
	const employees = await getEmployees({
		searchQuery: searchParams.query,
		department: searchParams.department,
		position: searchParams.position,
		sortBy: searchParams.sortBy,
		sortOrder: searchParams.sortOrder as "asc" | "desc",
	});

	// 部署と役職のオプションを取得
	const departmentOptions = await getDepartments();
	const positionOptions = await getPositions();

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold tracking-tight">従業員一覧</h2>
				<Button asChild>
					<Link href="/admin/employees/new">
						<PlusIcon className="mr-2 h-4 w-4" />
						従業員を追加
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>従業員一覧</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<EmployeeListSkeleton />}>
						<EmployeeListContainer
							employees={employees}
							departmentOptions={departmentOptions}
							positionOptions={positionOptions}
							searchParams={searchParams}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
}
