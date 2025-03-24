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
import { Edit2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { type Position } from "../_data/positions-data";

interface PositionTableProps {
	positions: Position[];
}

export function PositionTable({ positions }: PositionTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>役職名</TableHead>
						<TableHead>レベル</TableHead>
						<TableHead className="hidden md:table-cell">説明</TableHead>
						<TableHead className="hidden md:table-cell">人数</TableHead>
						<TableHead className="hidden md:table-cell">作成日</TableHead>
						<TableHead className="text-right">操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{positions.map((position) => (
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
								{position.createdAt}
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
					))}
				</TableBody>
			</Table>
		</div>
	);
}
