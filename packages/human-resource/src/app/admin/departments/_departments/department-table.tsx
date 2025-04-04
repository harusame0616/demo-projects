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
import { OrderDirection } from "@/lib/order";
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { type DepartmentOrder, DepartmentOrderField } from "../order";

type Department = {
	id: string;
	name: string;
	parentId: string | null;
	level: number;
	memberCount: number;
	createdAt: string;
};

interface DepartmentTableProps {
	departments: Department[];
	order: DepartmentOrder;
	onSort: (column: string) => void;
}

export function DepartmentTable({
	departments,
	order,
	onSort,
}: DepartmentTableProps) {
	const getParentName = (parentId: string | null): string => {
		if (!parentId) return "-";
		const parent = departments.find((dept) => dept.id === parentId);
		return parent ? parent.name : "-";
	};

	// ソートアイコンの表示
	const getSortIcon = (column: string) => {
		if (order.field !== column) return null;
		return order.direction === OrderDirection.Asc ? (
			<ArrowUpIcon className="h-4 w-4 ml-1" />
		) : (
			<ArrowDownIcon className="h-4 w-4 ml-1" />
		);
	};

	return (
		<div className="rounded-md border w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="cursor-pointer w-[100px] whitespace-nowrap"
							onClick={() => onSort(DepartmentOrderField.DepartmentCode)}
						>
							<div className="flex items-center">
								部署コード {getSortIcon(DepartmentOrderField.DepartmentCode)}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer w-[200px] whitespace-nowrap"
							onClick={() => onSort(DepartmentOrderField.DepartmentName)}
						>
							<div className="flex items-center">
								部署名 {getSortIcon(DepartmentOrderField.DepartmentName)}
							</div>
						</TableHead>
						<TableHead className="w-[200px] whitespace-nowrap">
							上位部署
						</TableHead>
						<TableHead className="w-[80px]">操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{departments.length === 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center py-8">
								部署が登録されていません
							</TableCell>
						</TableRow>
					) : (
						departments.map((department) => (
							<TableRow key={department.id}>
								<TableCell className="font-medium whitespace-nowrap">
									<Link
										href={`/admin/departments/${department.id}`}
										className="underline  flex items-center"
									>
										{department.id}
									</Link>
								</TableCell>
								<TableCell className="font-medium whitespace-nowrap">
									{department.name}
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{getParentName(department.parentId)}
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
													href={`/admin/departments/${department.id}`}
													className="underline "
												>
													詳細
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href={`/admin/departments/${department.id}/edit`}
													className="underline "
												>
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
