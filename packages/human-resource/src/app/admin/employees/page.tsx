import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EmployeesSkeleton } from "./_components/employee-list-skeleton";
import { EmployeesContainer } from "./_components/employees-container";
import { SearchFormContainer } from "./_components/search-form-container";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export const metadata: Metadata = {
	title: "従業員一覧 | 人材管理システム",
	description: "人材管理システムの従業員一覧",
};

interface EmployeeSearchParams {
	query?: string;
	department?: string;
	position?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	page?: string;
}

interface EmployeesPageProps {
	searchParams: Promise<EmployeeSearchParams>;
}

export default async function EmployeesPage({
	searchParams,
}: EmployeesPageProps) {
	// searchParamsをawaitして取得
	const resolvedParams = await searchParams;

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">従業員一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/employees/new">新規作成</Link>
				</Button>
			</div>

			<Suspense
				fallback={
					<SearchFormPresenter
						departmentOptions={[]}
						positionOptions={[]}
						searchQuery={resolvedParams.query}
						currentDepartment={resolvedParams.department}
						currentPosition={resolvedParams.position}
					/>
				}
				key={`search-form-${JSON.stringify(resolvedParams)}`}
			>
				<SearchFormContainer
					searchQuery={resolvedParams.query}
					currentDepartment={resolvedParams.department}
					currentPosition={resolvedParams.position}
				/>
			</Suspense>

			<div className="w-full">
				<Suspense
					fallback={<EmployeesSkeleton />}
					key={`employees-${JSON.stringify(resolvedParams)}`}
				>
					<EmployeesContainer searchParams={resolvedParams} />
				</Suspense>
			</div>
		</div>
	);
}
