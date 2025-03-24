"use client";

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
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowDownIcon, ArrowUpIcon, Edit2Icon, TrashIcon } from "lucide-react";
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
							<div className="flex items-center">ID {getSortIcon("id")}</div>
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
									{position.id}
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
									<div className="flex justify-end gap-2">
										<Button
											variant="outline"
											size="icon"
											asChild
											className="h-8 w-8"
										>
											<Link href={`/admin/positions/${position.id}/edit`}>
												<Edit2Icon className="h-4 w-4" />
												<span className="sr-only">編集</span>
											</Link>
										</Button>
										<Button
											variant="outline"
											size="icon"
											className="h-8 w-8 text-red-500 hover:text-red-600"
										>
											<TrashIcon className="h-4 w-4" />
											<span className="sr-only">削除</span>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
