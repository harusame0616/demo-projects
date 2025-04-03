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
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import type { Position } from "../_data/positions-data";
import { type PositionOrder, PositionOrderField } from "../order";

type Props = {
	positions: Position[];
	order: PositionOrder;
	onSort: (column: PositionOrderField) => void;
};

export function PositionTable({ positions, order, onSort }: Props) {
	const { field = "id", direction = "asc" } = order;

	// ソートアイコンを表示
	const getSortIcon = (column: PositionOrderField) => {
		if (field !== column) return null;
		return direction === "asc" ? (
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
							className="w-[100px] cursor-pointer whitespace-nowrap"
							onClick={() => onSort(PositionOrderField.PositionCode)}
						>
							<div className="flex items-center">
								役職コード {getSortIcon(PositionOrderField.PositionCode)}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer w-[150px] whitespace-nowrap"
							onClick={() => onSort(PositionOrderField.PositionName)}
						>
							<div className="flex items-center">
								役職名 {getSortIcon(PositionOrderField.PositionName)}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer w-[100px] whitespace-nowrap"
							onClick={() => onSort(PositionOrderField.PositionLevel)}
						>
							<div className="flex items-center">
								レベル {getSortIcon(PositionOrderField.PositionLevel)}
							</div>
						</TableHead>
						<TableHead className="hidden md:table-cell w-[300px]">
							説明
						</TableHead>
						<TableHead className="text-right w-[100px] whitespace-nowrap">
							操作
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{positions.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center py-6">
								該当する役職がありません
							</TableCell>
						</TableRow>
					) : (
						positions.map((position) => (
							<TableRow key={position.id}>
								<TableCell className="font-medium whitespace-nowrap">
									<Link
										href={`/admin/positions/${position.id}`}
										className="underline  "
									>
										{position.id}
									</Link>
								</TableCell>
								<TableCell className="whitespace-nowrap">
									{position.name}
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
												<Link
													href={`/admin/positions/${position.id}`}
													className="underline "
												>
													詳細
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link
													href={`/admin/positions/${position.id}/edit`}
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
