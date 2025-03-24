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
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="w-[100px] cursor-pointer"
							onClick={() => onSort("id")}
						>
							<div className="flex items-center">ID {getSortIcon("id")}</div>
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => onSort("name")}
						>
							<div className="flex items-center">
								役職名 {getSortIcon("name")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer"
							onClick={() => onSort("level")}
						>
							<div className="flex items-center">
								レベル {getSortIcon("level")}
							</div>
						</TableHead>
						<TableHead className="hidden md:table-cell">説明</TableHead>
						<TableHead
							className="hidden md:table-cell cursor-pointer"
							onClick={() => onSort("memberCount")}
						>
							<div className="flex items-center">
								人数 {getSortIcon("memberCount")}
							</div>
						</TableHead>
						<TableHead
							className="hidden md:table-cell cursor-pointer"
							onClick={() => onSort("createdAt")}
						>
							<div className="flex items-center">
								作成日 {getSortIcon("createdAt")}
							</div>
						</TableHead>
						<TableHead className="text-right">操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{positions.length === 0 ? (
						<TableRow>
							<TableCell colSpan={7} className="text-center py-6">
								該当する役職がありません
							</TableCell>
						</TableRow>
					) : (
						positions.map((position) => (
							<TableRow key={position.id}>
								<TableCell className="font-medium">{position.id}</TableCell>
								<TableCell>
									<Link
										href={`/admin/positions/${position.id}`}
										className="hover:underline text-blue-600"
									>
										{position.name}
									</Link>
								</TableCell>
								<TableCell>{position.level}</TableCell>
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
								<TableCell className="hidden md:table-cell">
									{position.memberCount}名
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{formatDate(position.createdAt)}
								</TableCell>
								<TableCell className="text-right">
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
