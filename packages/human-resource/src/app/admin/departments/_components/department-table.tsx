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
import { BuildingIcon, MoreHorizontalIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

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
}

export function DepartmentTable({ departments }: DepartmentTableProps) {
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

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>部署名</TableHead>
						<TableHead>上位部署</TableHead>
						<TableHead>人数</TableHead>
						<TableHead>作成日</TableHead>
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
										href={`/departments/${department.id}`}
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
												<Link href={`/departments/${department.id}`}>詳細</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link href={`/departments/${department.id}/edit`}>
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
