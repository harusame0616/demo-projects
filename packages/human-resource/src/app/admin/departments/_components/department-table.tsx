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
	BuildingIcon,
	MoreHorizontalIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DepartmentSearchParams } from "../_actions/department-actions";

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
	currentSort: string;
	currentOrder: string;
	onSort: (column: string) => void;
}

export function DepartmentTable({
	departments,
	currentSort,
	currentOrder,
	onSort,
}: DepartmentTableProps) {
	const getParentName = (parentId: string | null): string => {
		if (!parentId) return "-";
		const parent = departments.find((dept) => dept.id === parentId);
		return parent ? parent.name : "-";
	};

	// ソートアイコンの表示
	const getSortIcon = (column: string) => {
		if (currentSort !== column) return null;
		return currentOrder === "asc" ? (
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
							onClick={() => onSort("id")}
						>
							<div className="flex items-center">
								部署コード {getSortIcon("id")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer w-[200px] whitespace-nowrap"
							onClick={() => onSort("name")}
						>
							<div className="flex items-center">
								部署名 {getSortIcon("name")}
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
