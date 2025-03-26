import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, User, CalendarDays } from "lucide-react";
import Link from "next/link";
import { PageHeader, ProfileHeader } from "./_components";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ReactNode } from "react";
import { mockEmployees } from "@/app/_mocks/employees";
import type { Employee } from "@/app/_mocks/employees";

export default function EmployeeLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: { id: string };
}) {
	const employeeId = params.id;
	const employee = mockEmployees.find((emp) => emp.id === employeeId);

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

	// 現在のパスを取得
	const isAttendancePage =
		typeof window !== "undefined" &&
		window.location.pathname.includes("/attendances");

	return (
		<div className="space-y-6">
			<PageHeader employeeId={employee.id} />

			<ProfileHeader employee={employee} />

			<Tabs
				defaultValue={isAttendancePage ? "attendance" : "info"}
				className="space-y-6"
			>
				<TabsList className="grid w-full md:w-[400px] grid-cols-2">
					<TabsTrigger value="info" asChild>
						<Link href={`/admin/employees/${employee.id}`}>
							<User className="mr-2 h-4 w-4" />
							従業員情報
						</Link>
					</TabsTrigger>
					<TabsTrigger value="attendance" asChild>
						<Link href={`/admin/employees/${employee.id}/attendances`}>
							<CalendarDays className="mr-2 h-4 w-4" />
							勤怠情報
						</Link>
					</TabsTrigger>
				</TabsList>

				<div className="pt-4">{children}</div>
			</Tabs>

			<div className="mt-8 flex justify-end space-x-2">
				<Button variant="outline" asChild>
					<Link href="/admin/employees">従業員一覧へ戻る</Link>
				</Button>
			</div>
		</div>
	);
}
