"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon } from "lucide-react";
import { useState } from "react";

// 申請タイプの定義
type ApplicationType = "time-correction" | "leave";

// 申請状態の定義
type ApplicationStatus = "pending" | "approved" | "rejected";

// 申請データの型定義
interface Application {
	id: number;
	type: ApplicationType;
	title: string;
	date: string;
	submittedAt: string;
	status: ApplicationStatus;
	details: string;
}

// モックデータ
const mockApplications: Application[] = [
	{
		id: 1,
		type: "time-correction",
		title: "勤怠修正申請（2023/3/23）",
		date: "2023-03-23",
		submittedAt: "2023-03-24 10:15",
		status: "pending",
		details: "退勤時間を18:30から19:30に修正。会議が長引いたため。",
	},
	{
		id: 2,
		type: "leave",
		title: "有給休暇申請",
		date: "2023-04-10",
		submittedAt: "2023-03-24 11:30",
		status: "approved",
		details: "私用のため1日有給休暇を使用します。",
	},
	{
		id: 3,
		type: "leave",
		title: "特別休暇申請",
		date: "2023-04-15",
		submittedAt: "2023-03-23 09:45",
		status: "rejected",
		details: "研修参加のため特別休暇を申請します。",
	},
	{
		id: 4,
		type: "time-correction",
		title: "勤怠修正申請（2023/3/22）",
		date: "2023-03-22",
		submittedAt: "2023-03-23 08:30",
		status: "pending",
		details: "出勤時間を09:15から08:45に修正。早めに出社したため。",
	},
	{
		id: 5,
		type: "leave",
		title: "病気休暇申請",
		date: "2023-03-27",
		submittedAt: "2023-03-26 18:20",
		status: "pending",
		details: "体調不良のため病気休暇を申請します。",
	},
];

export function ApplicationList() {
	const [applications, _setApplications] = useState(mockApplications);
	const [activeTab, setActiveTab] = useState<"all" | ApplicationStatus>("all");

	// タブに応じてフィルタリングされた申請リストを取得
	const filteredApplications =
		activeTab === "all"
			? applications
			: applications.filter((app) => app.status === activeTab);

	// 申請タイプに応じたラベル名を取得
	const getTypeLabel = (type: ApplicationType) => {
		switch (type) {
			case "time-correction":
				return "勤怠修正";
			case "leave":
				return "休暇申請";
			default:
				return "その他";
		}
	};

	// 申請状態に応じたバッジのスタイルを取得
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

	return (
		<div className="space-y-6">
			<Tabs
				value={activeTab}
				onValueChange={(value) =>
					setActiveTab(value as "all" | ApplicationStatus)
				}
			>
				<TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
					<TabsTrigger value="all">すべて</TabsTrigger>
					<TabsTrigger value="pending">承認待ち</TabsTrigger>
					<TabsTrigger value="approved">承認済み</TabsTrigger>
					<TabsTrigger value="rejected">却下</TabsTrigger>
				</TabsList>
			</Tabs>

			{filteredApplications.length === 0 ? (
				<div className="text-center py-8 text-gray-500">
					該当する申請はありません
				</div>
			) : (
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>種類</TableHead>
								<TableHead>内容</TableHead>
								<TableHead>申請日</TableHead>
								<TableHead>状態</TableHead>
								<TableHead>操作</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredApplications.map((application) => (
								<TableRow key={application.id}>
									<TableCell>{getTypeLabel(application.type)}</TableCell>
									<TableCell>
										<div>
											<div className="font-medium">{application.title}</div>
											<div className="text-sm text-gray-500 truncate max-w-xs">
												{application.details}
											</div>
										</div>
									</TableCell>
									<TableCell>{application.submittedAt}</TableCell>
									<TableCell>{getStatusBadge(application.status)}</TableCell>
									<TableCell>
										<Button variant="outline" size="icon">
											<EyeIcon className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}
