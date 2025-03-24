"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar, FileTextIcon, SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type {
	Application,
	ApplicationType,
	ApplicationStatus,
} from "../_actions/approval-actions";

// 申請タイプに応じた表示名を取得する関数
const getApplicationTypeName = (type: ApplicationType): string => {
	switch (type) {
		case "attendance_correction":
			return "勤怠修正";
		case "leave_request":
			return "休暇申請";
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

interface ApprovalHistoryProps {
	applications: Application[];
	searchParams: {
		query?: string;
		type?: string;
		status?: string;
		date?: string;
	};
}

export function ApprovalHistory({
	applications,
	searchParams,
}: ApprovalHistoryProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [selectedApplication, setSelectedApplication] =
		useState<Application | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(
		searchParams.date ? new Date(searchParams.date) : undefined,
	);

	// 申請の詳細を表示する
	const openDetails = (application: Application) => {
		setSelectedApplication(application);
		setIsDetailsOpen(true);
	};

	// フィルターの変更を処理
	const handleFilterChange = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);

		if (value === "all") {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		// タブ情報を維持
		params.set("tab", "history");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// 日付フィルターの変更を処理
	const handleDateChange = (newDate: Date | undefined) => {
		setDate(newDate);

		const params = new URLSearchParams(searchParams as Record<string, string>);

		if (newDate) {
			params.set("date", format(newDate, "yyyy-MM-dd"));
		} else {
			params.delete("date");
		}

		// タブ情報を維持
		params.set("tab", "history");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// 検索クエリの変更を処理
	const handleSearchChange = (query: string) => {
		const params = new URLSearchParams(searchParams as Record<string, string>);

		if (query) {
			params.set("query", query);
		} else {
			params.delete("query");
		}

		// タブ情報を維持
		params.set("tab", "history");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	return (
		<div className="space-y-4">
			{/* フィルターとサーチ */}
			<div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
				<div className="flex-1">
					<div className="relative">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
						<Input
							placeholder="社員名や内容、コメントで検索..."
							defaultValue={searchParams.query || ""}
							onChange={(e) => {
								// デバウンス処理
								const timeoutId = setTimeout(() => {
									handleSearchChange(e.target.value);
								}, 500);
								return () => clearTimeout(timeoutId);
							}}
							className="pl-10"
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
					<Select
						defaultValue={searchParams.type || "all"}
						onValueChange={(value) => handleFilterChange("type", value)}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="申請タイプ" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">すべての申請</SelectItem>
							<SelectItem value="attendance_correction">勤怠修正</SelectItem>
							<SelectItem value="leave_request">休暇申請</SelectItem>
						</SelectContent>
					</Select>

					<Select
						defaultValue={searchParams.status || "all"}
						onValueChange={(value) => handleFilterChange("status", value)}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="ステータス" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">すべてのステータス</SelectItem>
							<SelectItem value="approved">承認済み</SelectItem>
							<SelectItem value="rejected">却下</SelectItem>
						</SelectContent>
					</Select>

					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="w-[180px] justify-start text-left font-normal"
							>
								<Calendar className="mr-2 h-4 w-4" />
								{date ? (
									format(date, "yyyy年MM月dd日", { locale: ja })
								) : (
									<span>日付でフィルター</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<CalendarComponent
								mode="single"
								selected={date}
								onSelect={handleDateChange}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					{date && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleDateChange(undefined)}
							className="h-10 w-10"
						>
							<XIcon className="h-4 w-4" />
							<span className="sr-only">日付フィルターをクリア</span>
						</Button>
					)}
				</div>
			</div>

			{/* 申請リスト */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>申請ID</TableHead>
							<TableHead>申請種類</TableHead>
							<TableHead>社員</TableHead>
							<TableHead>ステータス</TableHead>
							<TableHead>申請日</TableHead>
							<TableHead>承認/却下日</TableHead>
							<TableHead className="text-right">アクション</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{applications.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} className="h-24 text-center">
									該当する申請履歴はありません
								</TableCell>
							</TableRow>
						) : (
							applications.map((application) => (
								<TableRow key={application.id}>
									<TableCell className="font-medium">
										{application.id}
									</TableCell>
									<TableCell>
										{getApplicationTypeBadge(application.type)}
									</TableCell>
									<TableCell>
										{application.employeeName}
										<br />
										<span className="text-xs text-muted-foreground">
											ID: {application.employeeId}
										</span>
									</TableCell>
									<TableCell>{getStatusBadge(application.status)}</TableCell>
									<TableCell>{application.submittedDate}</TableCell>
									<TableCell>{application.approvedDate}</TableCell>
									<TableCell className="text-right">
										<Button
											size="sm"
											variant="ghost"
											onClick={() => openDetails(application)}
										>
											<FileTextIcon className="h-4 w-4 mr-1" />
											詳細
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* 申請詳細ダイアログ */}
			{selectedApplication && (
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogContent className="max-w-md">
						<DialogHeader>
							<DialogTitle>申請詳細 - {selectedApplication.id}</DialogTitle>
							<DialogDescription>承認/却下済みの申請詳細</DialogDescription>
						</DialogHeader>

						<div className="space-y-4 py-4">
							<div className="grid grid-cols-4 gap-4 text-sm">
								<div className="font-medium">申請種類</div>
								<div className="col-span-3">
									{getApplicationTypeName(selectedApplication.type)}
								</div>

								<div className="font-medium">社員</div>
								<div className="col-span-3">
									{selectedApplication.employeeName} (ID:{" "}
									{selectedApplication.employeeId})
								</div>

								<div className="font-medium">ステータス</div>
								<div className="col-span-3">
									{getStatusBadge(selectedApplication.status)}
								</div>

								<div className="font-medium">申請日</div>
								<div className="col-span-3">
									{selectedApplication.submittedDate}
								</div>

								<div className="font-medium">対象日</div>
								<div className="col-span-3">
									{selectedApplication.targetDate}
								</div>

								<div className="font-medium">内容</div>
								<div className="col-span-3">{selectedApplication.content}</div>

								<div className="font-medium">理由</div>
								<div className="col-span-3">{selectedApplication.reason}</div>

								{selectedApplication.approvedDate && (
									<>
										<div className="font-medium">承認/却下日</div>
										<div className="col-span-3">
											{selectedApplication.approvedDate}
										</div>
									</>
								)}

								{selectedApplication.approvedBy && (
									<>
										<div className="font-medium">担当者</div>
										<div className="col-span-3">
											{selectedApplication.approvedBy}
										</div>
									</>
								)}

								{selectedApplication.comment && (
									<>
										<div className="font-medium">コメント</div>
										<div className="col-span-3">
											{selectedApplication.comment}
										</div>
									</>
								)}
							</div>
						</div>

						<DialogFooter>
							<Button variant="default" onClick={() => setIsDetailsOpen(false)}>
								閉じる
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
