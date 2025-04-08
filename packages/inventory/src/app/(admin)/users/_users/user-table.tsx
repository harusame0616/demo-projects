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
import { OrderDirection } from "@/lib/order";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	EyeIcon,
	MoreHorizontalIcon,
	PencilIcon,
	TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type UserOrder, UserOrderField } from "../order";
import type { User } from "../types";
import type { UserRole } from "../user";

interface UserTableProps {
	users: User[];
	order: UserOrder;
	onSort: (column: UserOrderField) => void;
}

export function UserTable({ users, order, onSort }: UserTableProps) {
	const router = useRouter();

	// ソート状態に応じたアイコンを表示
	const getSortIcon = (column: UserOrderField) => {
		const sortValue = column;
		if (order.field !== sortValue) return null;

		return order.direction === OrderDirection.Asc ? (
			<ArrowUpIcon className="ml-1 h-4 w-4" />
		) : (
			<ArrowDownIcon className="ml-1 h-4 w-4" />
		);
	};

	const getRoleBadge = (role: UserRole) => {
		switch (role) {
			case "admin":
				return (
					<Badge
						variant="outline"
						className="bg-purple-50 text-purple-700 border-purple-200"
					>
						管理者
					</Badge>
				);
			case "user":
				return (
					<Badge
						variant="outline"
						className="bg-gray-50 text-gray-700 border-gray-200"
					>
						一般ユーザー
					</Badge>
				);
			default:
				return <Badge variant="outline">不明</Badge>;
		}
	};

	return (
		<div className="rounded-md border w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[150px] whitespace-nowrap"
							onClick={() => onSort(UserOrderField.Name)}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								名前 {getSortIcon(UserOrderField.Name)}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[200px] whitespace-nowrap"
							onClick={() => onSort(UserOrderField.Email)}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								メールアドレス {getSortIcon(UserOrderField.Email)}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[100px] whitespace-nowrap"
							onClick={() => onSort(UserOrderField.Role)}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								権限 {getSortIcon(UserOrderField.Role)}
							</div>
						</TableHead>
						<TableHead className="w-[60px]">操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.length > 0 ? (
						users.map((user) => {
							return (
								<TableRow key={user.userId}>
									<TableCell>
										<Link href={`/users/${user.userId}`} className="underline">
											{user.name}
										</Link>
									</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{getRoleBadge(user.role)}</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="h-8 w-8 p-0"
													aria-label="操作メニュー"
												>
													<MoreHorizontalIcon className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() => router.push(`/users/${user.userId}`)}
												>
													<EyeIcon className="mr-2 h-4 w-4" />
													詳細を表示
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														router.push(`/users/${user.userId}/edit`)
													}
												>
													<PencilIcon className="mr-2 h-4 w-4" />
													編集
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => {
														// 削除確認ダイアログ（実際の実装では必要）
														if (
															confirm(
																`ユーザー「${user.userId}」を削除してよろしいですか？`,
															)
														) {
															router.push(`/users/${user.userId}/delete`);
														}
													}}
													className="text-red-600"
												>
													<TrashIcon className="mr-2 h-4 w-4" />
													削除
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							);
						})
					) : (
						<TableRow>
							<TableCell colSpan={8} className="text-center py-4">
								該当するユーザーがありません
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
