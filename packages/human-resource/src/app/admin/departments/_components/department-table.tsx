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
	searchParams: DepartmentSearchParams;
}

export function DepartmentTable({
	departments,
	searchParams,
}: DepartmentTableProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const { sort = "name", order = "asc" } = searchParams;

	// 親部署名を取得する関数
	const getParentName = (parentId: string | null): string => {
		if (!parentId) return "-";
		const parent = departments.find((dept) => dept.id === parentId);
		return parent ? parent.name : "-";
	};

	// 日付をフォーマットする関数
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("ja-JP", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		}).format(date);
	};

	// ソート処理
	const handleSort = (column: keyof Department) => {
		const newOrder = sort === column && order === "asc" ? "desc" : "asc";
		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.set("sort", column);
		updatedParams.set("order", newOrder);
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// ソートアイコンの表示
	const getSortIcon = (column: string) => {
		if (sort !== column) return null;
		return order === "asc" ? (
			<ArrowUpIcon className="h-4 w-4 ml-1" />
		) : (
			<ArrowDownIcon className="h-4 w-4 ml-1" />
		);
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="cursor-pointer"
							onClick={() => handleSort("name")}
						>
							<div className="flex items-center">
								部署名 {getSortIcon("name")}
							</div>
						</TableHead>
						<TableHead>上位部署</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => handleSort("memberCount")}
						>
							<div className="flex items-center">
								人数 {getSortIcon("memberCount")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => handleSort("createdAt")}
						>
							<div className="flex items-center">
								作成日 {getSortIcon("createdAt")}
							</div>
						</TableHead>
						<TableHead className="w-[80px]" />
					</TableRow>
				</TableHeader>
				<TableBody>
					{departments.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center py-8">
								部署が登録されていません
							</TableCell>
						</TableRow>
					) : (
						departments.map((department) => (
							<TableRow key={department.id}>
								<TableCell className="font-medium">
									<Link
										href={`/admin/departments/${department.id}`}
										className="hover:underline flex items-center"
									>
										<BuildingIcon className="h-4 w-4 mr-2" />
										{department.name}
									</Link>
								</TableCell>
								<TableCell>{getParentName(department.parentId)}</TableCell>
								<TableCell>
									<div className="flex items-center">
										<UsersIcon className="h-4 w-4 mr-1" />
										{department.memberCount}人
									</div>
								</TableCell>
								<TableCell>{formatDate(department.createdAt)}</TableCell>
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
												<Link href={`/admin/departments/${department.id}`}>
													詳細
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link href={`/admin/departments/${department.id}/edit`}>
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
