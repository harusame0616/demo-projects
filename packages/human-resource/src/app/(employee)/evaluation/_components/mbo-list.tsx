"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import { Textarea } from "@/components/ui/textarea";
import { FileEdit, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

// MBO目標のデータ型
interface MboGoal {
	id: number;
	title: string;
	description: string;
	deadline: string;
	priority: "high" | "medium" | "low";
	progress: number;
	status: "not_started" | "in_progress" | "completed" | "delayed";
	evaluationScore?: number;
}

// モックデータ
const mockMboGoals: MboGoal[] = [
	{
		id: 1,
		title: "新規顧客の獲得",
		description: "当四半期で新規顧客を10社獲得する",
		deadline: "2023-06-30",
		priority: "high",
		progress: 70,
		status: "in_progress",
	},
	{
		id: 2,
		title: "コスト削減プロジェクトの実施",
		description: "部門コストを前年比10%削減する",
		deadline: "2023-12-31",
		priority: "medium",
		progress: 30,
		status: "in_progress",
	},
	{
		id: 3,
		title: "プロセス改善の提案",
		description: "業務プロセスの効率化のための提案を行う",
		deadline: "2023-09-15",
		priority: "low",
		progress: 100,
		status: "completed",
		evaluationScore: 4,
	},
	{
		id: 4,
		title: "チーム研修の実施",
		description: "チームメンバー全員に対して新システムの研修を実施する",
		deadline: "2023-05-30",
		priority: "high",
		progress: 0,
		status: "delayed",
	},
	{
		id: 5,
		title: "顧客満足度の向上",
		description: "顧客アンケートのスコアを前年比15%向上させる",
		deadline: "2023-12-31",
		priority: "high",
		progress: 50,
		status: "in_progress",
	},
];

// ステータスに応じた表示色を取得する関数
const getStatusBadge = (status: MboGoal["status"]) => {
	switch (status) {
		case "not_started":
			return <Badge variant="outline">未着手</Badge>;
		case "in_progress":
			return (
				<Badge
					variant="outline"
					className="bg-blue-50 text-blue-700 border-blue-200"
				>
					進行中
				</Badge>
			);
		case "completed":
			return (
				<Badge
					variant="outline"
					className="bg-green-50 text-green-700 border-green-200"
				>
					完了
				</Badge>
			);
		case "delayed":
			return (
				<Badge
					variant="outline"
					className="bg-red-50 text-red-700 border-red-200"
				>
					遅延
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

// 優先度に応じた表示色を取得する関数
const getPriorityBadge = (priority: MboGoal["priority"]) => {
	switch (priority) {
		case "high":
			return (
				<Badge
					variant="outline"
					className="bg-red-50 text-red-700 border-red-200"
				>
					高
				</Badge>
			);
		case "medium":
			return (
				<Badge
					variant="outline"
					className="bg-yellow-50 text-yellow-700 border-yellow-200"
				>
					中
				</Badge>
			);
		case "low":
			return (
				<Badge
					variant="outline"
					className="bg-green-50 text-green-700 border-green-200"
				>
					低
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

interface MboListProps {
	onGoalSelect: (id: number) => void;
}

export function MboList({ onGoalSelect }: MboListProps) {
	const [goals, setGoals] = useState<MboGoal[]>(mockMboGoals);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newGoal, setNewGoal] = useState<Partial<MboGoal>>({
		priority: "medium",
		status: "not_started",
		progress: 0,
	});

	// 新しい目標を追加する関数
	const handleAddGoal = () => {
		if (!newGoal.title || !newGoal.description || !newGoal.deadline) {
			return;
		}

		const newId = Math.max(...goals.map((g) => g.id), 0) + 1;

		setGoals([
			...goals,
			{
				id: newId,
				title: newGoal.title,
				description: newGoal.description || "",
				deadline: newGoal.deadline,
				priority: newGoal.priority as "high" | "medium" | "low",
				progress: 0,
				status: "not_started",
			},
		]);

		setIsDialogOpen(false);
		setNewGoal({
			priority: "medium",
			status: "not_started",
			progress: 0,
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">目標一覧</h2>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="flex items-center gap-2">
							<PlusCircle className="h-4 w-4" />
							<span>新しい目標を追加</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px]">
						<DialogHeader>
							<DialogTitle>新しい目標の設定</DialogTitle>
							<DialogDescription>
								目標のタイトルや詳細、期限などを入力してください
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="title">目標タイトル</Label>
								<Input
									id="title"
									placeholder="目標のタイトルを入力"
									value={newGoal.title || ""}
									onChange={(e) =>
										setNewGoal({ ...newGoal, title: e.target.value })
									}
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="description">目標の詳細</Label>
								<Textarea
									id="description"
									placeholder="詳細な目標内容や達成条件を入力"
									value={newGoal.description || ""}
									onChange={(e) =>
										setNewGoal({ ...newGoal, description: e.target.value })
									}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="deadline">期限</Label>
									<Input
										id="deadline"
										type="date"
										value={newGoal.deadline || ""}
										onChange={(e) =>
											setNewGoal({ ...newGoal, deadline: e.target.value })
										}
									/>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="priority">優先度</Label>
									<Select
										value={newGoal.priority}
										onValueChange={(value) =>
											setNewGoal({
												...newGoal,
												priority: value as "high" | "medium" | "low",
											})
										}
									>
										<SelectTrigger id="priority">
											<SelectValue placeholder="優先度を選択" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="high">高</SelectItem>
											<SelectItem value="medium">中</SelectItem>
											<SelectItem value="low">低</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>

						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								キャンセル
							</Button>
							<Button onClick={handleAddGoal}>追加する</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>目標</TableHead>
							<TableHead>期限</TableHead>
							<TableHead>優先度</TableHead>
							<TableHead>進捗</TableHead>
							<TableHead>状態</TableHead>
							<TableHead className="w-[130px]">操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{goals.map((goal) => (
							<TableRow
								key={goal.id}
								className="cursor-pointer hover:bg-slate-50"
								onClick={() => onGoalSelect(goal.id)}
							>
								<TableCell>
									<div>
										<div className="font-medium">{goal.title}</div>
										<div className="text-sm text-gray-500 truncate max-w-xs">
											{goal.description}
										</div>
									</div>
								</TableCell>
								<TableCell>{goal.deadline}</TableCell>
								<TableCell>{getPriorityBadge(goal.priority)}</TableCell>
								<TableCell>
									<div className="flex flex-col gap-1">
										<Progress value={goal.progress} className="h-2" />
										<span className="text-xs text-right">{goal.progress}%</span>
									</div>
								</TableCell>
								<TableCell>{getStatusBadge(goal.status)}</TableCell>
								<TableCell>
									<div className="flex space-x-1">
										<Button
											variant="outline"
											size="icon"
											onClick={(e) => {
												e.stopPropagation();
												onGoalSelect(goal.id);
											}}
										>
											<FileEdit className="h-4 w-4" />
										</Button>
										<Button
											variant="outline"
											size="icon"
											className="text-red-600"
											onClick={(e) => {
												e.stopPropagation();
												setGoals(goals.filter((g) => g.id !== goal.id));
											}}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
