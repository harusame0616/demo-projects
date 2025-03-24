"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
	CheckIcon,
	FileTextIcon,
	MoreHorizontalIcon,
	XIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
	approveApplication,
	rejectApplication,
	type Application,
	type ApplicationType,
	type ApplicationStatus,
	type ApplicationSearchParams,
} from "../_actions/application-actions";
import { Pagination } from "@/components/ui/pagination";

// 申請タイプに応じた表示名を取得する関数
const getApplicationTypeName = (type: ApplicationType): string => {
	switch (type) {
		case "attendance_correction":
			return "勤怠修正";
		case "leave_request":
			return "休暇申請";
		case "remote_work":
			return "リモートワーク";
		case "overtime":
			return "残業申請";
		case "business_trip":
			return "出張申請";
		default:
			return "不明";
	}
};

// 申請タイプに応じたバッジスタイルを取得する関数
const getApplicationTypeBadge = (type: ApplicationType) => {
	switch (type) {
		case "attendance_correction":
			return (
				<Badge
					variant="outline"
					className="bg-blue-50 text-blue-700 border-blue-200"
				>
					勤怠修正
				</Badge>
			);
		case "leave_request":
			return (
				<Badge
					variant="outline"
					className="bg-purple-50 text-purple-700 border-purple-200"
				>
					休暇申請
				</Badge>
			);
		case "remote_work":
			return (
				<Badge
					variant="outline"
					className="bg-green-50 text-green-700 border-green-200"
				>
					リモートワーク
				</Badge>
			);
		case "overtime":
			return (
				<Badge
					variant="outline"
					className="bg-orange-50 text-orange-700 border-orange-200"
				>
					残業申請
				</Badge>
			);
		case "business_trip":
			return (
				<Badge
					variant="outline"
					className="bg-cyan-50 text-cyan-700 border-cyan-200"
				>
					出張申請
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

// ステータスに応じたバッジスタイルを取得する関数
const getStatusBadge = (status: ApplicationStatus) => {
	switch (status) {
		case "pending":
			return (
				<Badge
					variant="outline"
					className="bg-yellow-50 text-yellow-700 border-yellow-200"
				>
					承認待ち
				</Badge>
			);
		case "approved":
			return (
				<Badge
					variant="outline"
					className="bg-green-50 text-green-700 border-green-200"
				>
					承認済み
				</Badge>
			);
		case "rejected":
			return (
				<Badge
					variant="outline"
					className="bg-red-50 text-red-700 border-red-200"
				>
					却下
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

interface ApplicationTableProps {
	applications: Application[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	searchParams: ApplicationSearchParams;
}

export function ApplicationTable({
	applications,
	pagination,
	searchParams,
}: ApplicationTableProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [selectedApplication, setSelectedApplication] =
		useState<Application | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [comment, setComment] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	// 申請の詳細を表示する
	const openDetails = (application: Application) => {
		setSelectedApplication(application);
		setIsDetailsOpen(true);
		setComment("");
	};

	// 申請を承認する（ステータスがpendingの場合のみ）
	const handleApprove = async () => {
		if (!selectedApplication) return;

		setIsProcessing(true);
		try {
			await approveApplication(selectedApplication.id, comment);
			// 現在のURLパラメータを維持したままページをリロード
			router.refresh();
			setIsDetailsOpen(false);
		} catch (error) {
			console.error("承認処理に失敗しました", error);
		} finally {
			setIsProcessing(false);
		}
	};

	// 申請を却下する（ステータスがpendingの場合のみ）
	const handleReject = async () => {
		if (!selectedApplication) return;

		setIsProcessing(true);
		try {
			await rejectApplication(selectedApplication.id, comment);
			// 現在のURLパラメータを維持したままページをリロード
			router.refresh();
			setIsDetailsOpen(false);
		} catch (error) {
			console.error("却下処理に失敗しました", error);
		} finally {
			setIsProcessing(false);
		}
	};

	// ページ切り替え処理
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);
		params.set("page", page.toString());
		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	return (
		<div className="space-y-4 w-full">
			{/* 申請リスト */}
			<div className="w-full overflow-auto">
				<div className="min-w-full rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">申請ID</TableHead>
								<TableHead className="w-[120px]">申請種類</TableHead>
								<TableHead className="w-[100px]">ステータス</TableHead>
								<TableHead className="w-[150px]">社員</TableHead>
								<TableHead className="w-[120px]">申請日</TableHead>
								<TableHead className="w-[120px]">対象日</TableHead>
								<TableHead className="min-w-[150px]">内容</TableHead>
								<TableHead className="w-[80px] text-right">操作</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{applications.length === 0 ? (
								<TableRow>
									<TableCell colSpan={8} className="h-24 text-center">
										該当する申請はありません
									</TableCell>
								</TableRow>
							) : (
								applications.map((application) => (
									<TableRow key={application.id}>
										<TableCell className="font-medium whitespace-nowrap">
											{application.id}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{getApplicationTypeBadge(application.type)}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{getStatusBadge(application.status)}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{application.employeeName}
											<br />
											<span className="text-xs text-gray-500">
												ID: {application.employeeId}
											</span>
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{application.submittedDate}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{application.targetDate}
										</TableCell>
										<TableCell className="max-w-[300px]">
											<div className="truncate">{application.content}</div>
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
													<DropdownMenuItem
														onClick={() => openDetails(application)}
													>
														<FileTextIcon className="h-4 w-4 mr-2" />
														詳細
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
			</div>

			{/* ページネーション */}
			{applications.length > 0 && (
				<Pagination
					currentPage={pagination.page}
					totalPages={pagination.totalPages}
					onPageChange={handlePageChange}
				/>
			)}

			{/* 申請詳細ダイアログ */}
			{selectedApplication && (
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>申請詳細</DialogTitle>
							<DialogDescription>
								申請内容の詳細とステータス変更
							</DialogDescription>
						</DialogHeader>

						<div className="grid grid-cols-2 gap-4 py-4">
							<div className="space-y-2">
								<Label>申請ID</Label>
								<div>{selectedApplication.id}</div>
							</div>

							<div className="space-y-2">
								<Label>申請種類</Label>
								<div>{getApplicationTypeName(selectedApplication.type)}</div>
							</div>

							<div className="space-y-2">
								<Label>ステータス</Label>
								<div>
									{getStatusBadge(selectedApplication.status)}
									{selectedApplication.approvedDate && (
										<span className="ml-2 text-sm text-gray-500">
											{selectedApplication.approvedDate} by{" "}
											{selectedApplication.approvedBy}
										</span>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<Label>社員</Label>
								<div>
									{selectedApplication.employeeName} (ID:{" "}
									{selectedApplication.employeeId})
								</div>
							</div>

							<div className="space-y-2">
								<Label>申請日</Label>
								<div>{selectedApplication.submittedDate}</div>
							</div>

							<div className="space-y-2">
								<Label>対象日</Label>
								<div>{selectedApplication.targetDate}</div>
							</div>

							<div className="space-y-2 col-span-2">
								<Label>申請内容</Label>
								<div className="rounded-md border p-3 bg-gray-50">
									{selectedApplication.content}
								</div>
							</div>

							<div className="space-y-2 col-span-2">
								<Label>申請理由</Label>
								<div className="rounded-md border p-3 bg-gray-50">
									{selectedApplication.reason}
								</div>
							</div>

							{selectedApplication.comment && (
								<div className="space-y-2 col-span-2">
									<Label>承認/却下コメント</Label>
									<div className="rounded-md border p-3 bg-gray-50">
										{selectedApplication.comment}
									</div>
								</div>
							)}

							{/* 承認待ちの場合のみコメント入力と承認/却下ボタンを表示 */}
							{selectedApplication.status === "pending" && (
								<div className="space-y-2 col-span-2">
									<Label htmlFor="comment">コメント（任意）</Label>
									<Textarea
										id="comment"
										value={comment}
										onChange={(e) => setComment(e.target.value)}
										placeholder="承認または却下の理由や備考がある場合に入力してください"
									/>
								</div>
							)}
						</div>

						<DialogFooter className="flex-col space-y-2 sm:space-y-0">
							{selectedApplication.status === "pending" ? (
								<div className="flex space-x-2 justify-end w-full">
									<Button
										variant="outline"
										onClick={() => setIsDetailsOpen(false)}
									>
										キャンセル
									</Button>
									<Button
										variant="destructive"
										onClick={handleReject}
										disabled={isProcessing}
									>
										<XIcon className="mr-2 h-4 w-4" />
										却下
									</Button>
									<Button onClick={handleApprove} disabled={isProcessing}>
										<CheckIcon className="mr-2 h-4 w-4" />
										承認
									</Button>
								</div>
							) : (
								<Button onClick={() => setIsDetailsOpen(false)}>閉じる</Button>
							)}
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
