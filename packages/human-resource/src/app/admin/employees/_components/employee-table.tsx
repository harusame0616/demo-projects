"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	MoreHorizontalIcon,
	ClockIcon,
} from "lucide-react";
import Link from "next/link";
import type { Employee } from "@/app/_mocks/employees";

interface EmployeeTableProps {
	employees: Employee[];
	searchParams: {
		sortBy?: string;
		sortOrder?: "asc" | "desc";
	};
	onSort: (column: string) => void;
}

export function EmployeeTable({
	employees,
	searchParams,
	onSort,
}: EmployeeTableProps) {
	// ソート状態に応じたアイコンを表示
	const getSortIcon = (column: string) => {
		// デバッグ用ログ
		console.log(
			`Column: ${column}, SortBy: ${searchParams.sortBy}, SortOrder: ${searchParams.sortOrder}`,
		);

		if (searchParams.sortBy !== column) return null;

		return searchParams.sortOrder === "asc" ? (
			<ArrowUpIcon className="ml-1 h-4 w-4" />
		) : (
			<ArrowDownIcon className="ml-1 h-4 w-4" />
		);
	};

	// 日付をフォーマット
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("ja-JP", {
			year: "numeric",
			month: "short",
			day: "numeric",
		}).format(date);
	};

	return (
		<div className="rounded-md border w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[100px] whitespace-nowrap"
							onClick={() => onSort("id")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								従業員コード {getSortIcon("id")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[150px] whitespace-nowrap"
							onClick={() => onSort("name")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								氏名 {getSortIcon("name")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[150px] whitespace-nowrap"
							onClick={() => onSort("department")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								部署 {getSortIcon("department")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[120px] whitespace-nowrap"
							onClick={() => onSort("position")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								役職 {getSortIcon("position")}
							</div>
						</TableHead>
						<TableHead className="w-[80px]">操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{employees.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="h-24 text-center">
								該当する従業員が見つかりませんでした
							</TableCell>
						</TableRow>
					) : (
						employees.map((employee) => (
							<TableRow key={employee.id}>
								<TableCell className="font-medium whitespace-nowrap">
									<Link
										href={`/admin/employees/${employee.id}`}
										className="text-primary underline  cursor-pointer"
									>
										{employee.id}
									</Link>
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{employee.name}
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{employee.department}
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{employee.position}
								</TableCell>
								<TableCell className="whitespace-nowrap">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreHorizontalIcon className="h-4 w-4" />
												<span className="sr-only">メニューを開く</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<Link
													href={`/admin/employees/${employee.id}`}
													className="underline "
												>
													詳細を表示
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href={`/admin/employees/${employee.id}/edit`}
													className="underline "
												>
													編集
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href={`/admin/employees/${employee.id}/attendances`}
													className="flex items-center underline "
												>
													<ClockIcon className="mr-2 h-4 w-4" />
													勤怠情報
												</Link>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
