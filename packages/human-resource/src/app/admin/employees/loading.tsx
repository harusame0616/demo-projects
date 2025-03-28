import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmployeesSkeleton } from "./_components/employee-list-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export default async function Loading() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">従業員一覧</h1>
				<Button asChild variant="outline">
					<Link href="/admin/employees/new">新規作成</Link>
				</Button>
			</div>

			<SearchFormPresenter
				departmentOptions={[]}
				positionOptions={[]}
				searchQuery={""}
				currentDepartment={""}
				currentPosition={""}
			/>

			<EmployeesSkeleton />
		</div>
	);
}
