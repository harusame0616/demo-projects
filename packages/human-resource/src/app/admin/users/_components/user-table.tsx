"use client";

import type { Employee } from "../types";
import type { User } from "../types";
import type { UserRole, UserStatus } from "../user";
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
	ArrowDownIcon,
	ArrowUpIcon,
	EyeIcon,
	MoreHorizontalIcon,
	PencilIcon,
	TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface UserTableProps {
	users: User[];
	employees: Employee[];
	searchParams: {
		query?: string;
		role?: string;
		status?: string;
		sortBy?: string;
		sortOrder?: "asc" | "desc";
		page?: string;
	};
	onSort: (column: string) => void;
}

export function UserTable({
	users,
	employees,
	searchParams,
	onSort,
}: UserTableProps) {
	const router = useRouter();

	// 従業員IDから従業員情報を取得する関数
	const getEmployeeById = (employeeId: string): Employee | undefined => {
		return employees.find((employee) => employee.id === employeeId);
	};

	// ソート状態に応じたアイコンを表示
	const getSortIcon = (column: string) => {
		if (searchParams.sortBy !== column) return null;

		return searchParams.sortOrder === "asc" ? (
			<ArrowUpIcon className="ml-1 h-4 w-4" />
		) : (
			<ArrowDownIcon className="ml-1 h-4 w-4" />
		);
	};

	// 日付をフォーマット
	const formatDate = (dateString: string | null) => {
		if (!dateString) return "なし";

		const date = new Date(dateString);
		return new Intl.DateTimeFormat("ja-JP", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	// ユーザーの役割に応じたバッジを返す
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

	// ユーザーのステータスに応じたバッジを返す
	const getStatusBadge = (status: UserStatus) => {
		switch (status) {
			case "active":
				return (
					<Badge
						variant="outline"
						className="bg-green-50 text-green-700 border-green-200"
					>
						有効
					</Badge>
				);
			case "inactive":
				return (
					<Badge
						variant="outline"
						className="bg-red-50 text-red-700 border-red-200"
					>
						無効
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
							className="cursor-pointer hover:bg-gray-50 w-[80px] whitespace-nowrap"
							onClick={() => onSort("id")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								ユーザーコード {getSortIcon("id")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[120px] whitespace-nowrap"
							onClick={() => onSort("employeeId")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								従業員コード {getSortIcon("employeeId")}
							</div>
						</TableHead>
						<TableHead className="cursor-pointer hover:bg-gray-50 w-[150px] whitespace-nowrap">
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								名前
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[200px] whitespace-nowrap"
							onClick={() => onSort("email")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								メールアドレス {getSortIcon("email")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[100px] whitespace-nowrap"
							onClick={() => onSort("role")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								権限 {getSortIcon("role")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[100px] whitespace-nowrap"
							onClick={() => onSort("status")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								ステータス {getSortIcon("status")}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:bg-gray-50 w-[150px] whitespace-nowrap"
							onClick={() => onSort("lastLogin")}
						>
							<div className="flex items-center whitespace-nowrap text-xs font-medium gap-1">
								最終ログイン {getSortIcon("lastLogin")}
							</div>
						</TableHead>
						<TableHead className="w-[60px]">操作</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.length > 0 ? (
						users.map((user) => {
							// 従業員情報を取得
							const employee = user.employeeId
								? getEmployeeById(user.employeeId)
								: undefined;

							return (
								<TableRow key={user.id}>
									<TableCell>
										<Link
											href={`/admin/users/${user.id}`}
											className="underline"
										>
											{user.id}
										</Link>
									</TableCell>
									<TableCell>
										{user.employeeId ? (
											<Link
												href={`/admin/employees/${user.employeeId}`}
												className="underline"
											>
												{user.employeeId}
											</Link>
										) : (
											<span className="text-gray-400">未紐づけ</span>
										)}
									</TableCell>
									<TableCell>
										{employee ? (
											<span>{employee.name}</span>
										) : (
											<span className="text-gray-400">-</span>
										)}
									</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{getRoleBadge(user.role)}</TableCell>
									<TableCell>{getStatusBadge(user.status)}</TableCell>
									<TableCell>{formatDate(user.lastLogin)}</TableCell>
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
													onClick={() => router.push(`/admin/users/${user.id}`)}
												>
													<EyeIcon className="mr-2 h-4 w-4" />
													詳細を表示
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														router.push(`/admin/users/${user.id}/edit`)
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
																`ユーザー「${user.id}」を削除してよろしいですか？`,
															)
														) {
															router.push(`/admin/users/${user.id}/delete`);
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
