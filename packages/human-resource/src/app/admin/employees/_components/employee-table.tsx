"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

type Employee = {
	id: string;
	name: string;
	department: string;
	position: string;
	email: string;
	joinDate: string;
};

interface EmployeeTableProps {
	employees: Employee[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>社員ID</TableHead>
						<TableHead>氏名</TableHead>
						<TableHead>部署</TableHead>
						<TableHead>役職</TableHead>
						<TableHead className="hidden md:table-cell">
							メールアドレス
						</TableHead>
						<TableHead className="hidden md:table-cell">入社日</TableHead>
						<TableHead className="w-[80px]" />
					</TableRow>
				</TableHeader>
				<TableBody>
					{employees.length === 0 ? (
						<TableRow>
							<TableCell colSpan={7} className="h-24 text-center">
								該当する従業員が見つかりませんでした
							</TableCell>
						</TableRow>
					) : (
						employees.map((employee) => (
							<TableRow key={employee.id}>
								<TableCell className="font-medium">{employee.id}</TableCell>
								<TableCell>{employee.name}</TableCell>
								<TableCell>{employee.department}</TableCell>
								<TableCell>{employee.position}</TableCell>
								<TableCell className="hidden md:table-cell">
									{employee.email}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{employee.joinDate}
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreHorizontalIcon className="h-4 w-4" />
												<span className="sr-only">メニューを開く</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<Link href={`/admin/employees/${employee.id}`}>
													詳細を表示
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link href={`/admin/employees/${employee.id}/edit`}>
													編集
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
