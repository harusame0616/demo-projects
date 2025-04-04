import { mockEmployees } from "@/app/_mocks/employees";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { EmployeeInfoNavigation, ProfileHeader } from "./_components";

export default async function EmployeeLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const employee = mockEmployees.find((emp) => emp.id === id);

	if (!employee) {
		return (
			<div className="flex flex-col items-center justify-center h-96">
				<h2 className="text-2xl font-bold mb-4">従業員が見つかりません</h2>
				<Button asChild>
					<Link href="/admin/employees">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						従業員一覧に戻る
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			<PageHeader title="従業員詳細" />

			<ProfileHeader employee={employee} />

			<EmployeeInfoNavigation employeeId={employee.id} />

			<div>{children}</div>
		</>
	);
}
