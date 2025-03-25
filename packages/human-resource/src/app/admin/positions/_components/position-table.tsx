"use client";

import { Badge } from "@/components/ui/badge";
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
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	MoreHorizontalIcon,
	BuildingIcon,
	InfoIcon,
} from "lucide-react";
import Link from "next/link";
import { type Position } from "../_data/positions-data";
import type { PositionSearchParams } from "../_actions/position-actions";

interface PositionTableProps {
	positions: Position[];
	searchParams: PositionSearchParams;
	onSort: (column: keyof Position) => void;
}

export function PositionTable({
	positions,
	searchParams,
	onSort,
}: PositionTableProps) {
	const { sort = "level", order = "desc" } = searchParams;

	// ソートアイコンを表示
	const getSortIcon = (column: keyof Position) => {
		if (sort !== column) return null;
		return order === "asc" ? (
			<ArrowUpIcon className="h-4 w-4 ml-1" />
		) : (
			<ArrowDownIcon className="h-4 w-4 ml-1" />
		);
	};

	// 日付をフォーマット
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("ja-JP", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		}).format(date);
	};

	return (
		<div className="rounded-md border w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="w-[100px] cursor-pointer whitespace-nowrap"
							onClick={() => onSort("id")}
						>
							<div className="flex items-center">
								役職コード {getSortIcon("id")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer w-[150px] whitespace-nowrap"
							onClick={() => onSort("name")}
						>
							<div className="flex items-center">
								役職名 {getSortIcon("name")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer w-[100px] whitespace-nowrap"
							onClick={() => onSort("level")}
						>
							<div className="flex items-center">
								レベル {getSortIcon("level")}
							</div>
						</TableHead>
						<TableHead className="hidden md:table-cell w-[300px]">
							説明
						</TableHead>
						<TableHead
							className="hidden md:table-cell cursor-pointer w-[120px] whitespace-nowrap"
							onClick={() => onSort("createdAt")}
						>
							<div className="flex items-center">
								作成日 {getSortIcon("createdAt")}
							</div>
						</TableHead>
						<TableHead className="text-right w-[100px] whitespace-nowrap">
							操作
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{positions.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-6">
								該当する役職がありません
							</TableCell>
						</TableRow>
					) : (
						positions.map((position) => (
							<TableRow key={position.id}>
								<TableCell className="font-medium whitespace-nowrap">
									<Link
										href={`/admin/positions/${position.id}`}
										className="hover:underline text-blue-600"
									>
										{position.id}
									</Link>
								</TableCell>
								<TableCell className="whitespace-nowrap">
									<Link
										href={`/admin/positions/${position.id}`}
										className="hover:underline text-blue-600"
									>
										{position.name}
									</Link>
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{position.level}
								</TableCell>
								<TableCell className="hidden md:table-cell max-w-[300px] truncate">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<span>{position.description}</span>
											</TooltipTrigger>
											<TooltipContent>
												<p>{position.description}</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</TableCell>
								<TableCell className="hidden md:table-cell whitespace-nowrap">
									{formatDate(position.createdAt)}
								</TableCell>
								<TableCell className="text-right whitespace-nowrap">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreHorizontalIcon className="h-4 w-4" />
												<span className="sr-only">メニューを開く</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<Link href={`/admin/positions/${position.id}`}>
													詳細
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link href={`/admin/positions/${position.id}/edit`}>
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
