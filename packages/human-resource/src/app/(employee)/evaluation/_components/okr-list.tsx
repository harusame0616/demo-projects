"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { FileEdit, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

// Key Result (KR) の型定義
interface KeyResult {
	id: number;
	description: string;
	progress: number;
	status: "not_started" | "in_progress" | "completed" | "at_risk";
}

// Objective (目標) の型定義
interface Objective {
	id: number;
	title: string;
	description: string;
	quarter: string;
	keyResults: KeyResult[];
	progress: number;
}

// モックデータ
const mockOkrData: Objective[] = [
	{
		id: 1,
		title: "製品の市場シェア拡大",
		description: "当社製品の市場シェアを現在の15%から20%に拡大する",
		quarter: "2023 Q2",
		progress: 60,
		keyResults: [
			{
				id: 101,
				description: "新規ユーザー獲得数を前四半期比50%増加させる",
				progress: 75,
				status: "in_progress",
			},
			{
				id: 102,
				description: "主要な業界イベントで3回以上プレゼンテーションを行う",
				progress: 100,
				status: "completed",
			},
			{
				id: 103,
				description: "競合他社からの顧客転換率を10%向上させる",
				progress: 30,
				status: "in_progress",
			},
		],
	},
	{
		id: 2,
		title: "顧客満足度の向上",
		description: "NPS（Net Promoter Score）を現在の+20から+35に改善する",
		quarter: "2023 Q2",
		progress: 45,
		keyResults: [
			{
				id: 201,
				description:
					"サポートチケットの平均解決時間を24時間から12時間に短縮する",
				progress: 80,
				status: "in_progress",
			},
			{
				id: 202,
				description: "顧客フィードバックをもとに3つの主要な改善を実装する",
				progress: 33,
				status: "in_progress",
			},
			{
				id: 203,
				description: "月次顧客アンケートの回答率を30%から50%に向上させる",
				progress: 20,
				status: "at_risk",
			},
		],
	},
	{
		id: 3,
		title: "デジタルトランスフォーメーションの推進",
		description: "社内プロセスのデジタル化によって業務効率を20%向上させる",
		quarter: "2023 Q2",
		progress: 15,
		keyResults: [
			{
				id: 301,
				description: "主要な業務プロセス5つを自動化する",
				progress: 20,
				status: "in_progress",
			},
			{
				id: 302,
				description: "全社員に対してデジタルツールのトレーニングを実施する",
				progress: 10,
				status: "not_started",
			},
			{
				id: 303,
				description: "紙の使用量を前年比50%削減する",
				progress: 15,
				status: "at_risk",
			},
		],
	},
];

// ステータスに応じたバッジの取得
const getStatusBadge = (status: KeyResult["status"]) => {
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
		case "at_risk":
			return (
				<Badge
					variant="outline"
					className="bg-red-50 text-red-700 border-red-200"
				>
					リスクあり
				</Badge>
			);
		default:
			return <Badge variant="outline">不明</Badge>;
	}
};

interface OkrListProps {
	onGoalSelect: (id: number) => void;
}

export function OkrList({ onGoalSelect }: OkrListProps) {
	const [objectives, setObjectives] = useState<Objective[]>(mockOkrData);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isKeyResultDialogOpen, setIsKeyResultDialogOpen] = useState(false);
	const [selectedObjectiveId, setSelectedObjectiveId] = useState<number | null>(
		null,
	);
	const [newObjective, setNewObjective] = useState<Partial<Objective>>({
		title: "",
		description: "",
		quarter: "",
		keyResults: [],
	});
	const [newKeyResult, setNewKeyResult] = useState<Partial<KeyResult>>({
		description: "",
		progress: 0,
		status: "not_started",
	});

	// 目標の追加
	const handleAddObjective = () => {
		if (
			!newObjective.title ||
			!newObjective.description ||
			!newObjective.quarter
		) {
			return;
		}

		const newId = Math.max(...objectives.map((o) => o.id), 0) + 1;

		setObjectives([
			...objectives,
			{
				id: newId,
				title: newObjective.title,
				description: newObjective.description,
				quarter: newObjective.quarter,
				keyResults: [],
				progress: 0,
			},
		]);

		setIsDialogOpen(false);
		setNewObjective({
			title: "",
			description: "",
			quarter: "",
			keyResults: [],
		});
	};

	// KRの追加ダイアログを開く
	const openAddKeyResultDialog = (objectiveId: number) => {
		setSelectedObjectiveId(objectiveId);
		setIsKeyResultDialogOpen(true);
	};

	// KRの追加
	const handleAddKeyResult = () => {
		if (!selectedObjectiveId || !newKeyResult.description) {
			return;
		}

		const updatedObjectives = objectives.map((obj) => {
			if (obj.id === selectedObjectiveId) {
				const newKeyResults = [
					...obj.keyResults,
					{
						id: Math.max(...obj.keyResults.map((kr) => kr.id), 0) + 1,
						description: newKeyResult.description,
						progress: 0,
						status: "not_started" as const,
					},
				];

				// 進捗状況を再計算
				const totalProgress = newKeyResults.reduce(
					(sum, kr) => sum + kr.progress,
					0,
				);
				const newProgress = Math.round(totalProgress / newKeyResults.length);

				return { ...obj, keyResults: newKeyResults, progress: newProgress };
			}
			return obj;
		});

		setObjectives(updatedObjectives as Objective[]);
		setIsKeyResultDialogOpen(false);
		setNewKeyResult({
			description: "",
			progress: 0,
			status: "not_started",
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">OKR一覧</h2>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="flex items-center gap-2">
							<PlusCircle className="h-4 w-4" />
							<span>新しい目標を追加</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px]">
						<DialogHeader>
							<DialogTitle>新しい目標（Objective）の設定</DialogTitle>
							<DialogDescription>
								達成したい目標の詳細を入力してください
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="title">目標タイトル</Label>
								<Input
									id="title"
									placeholder="目標のタイトルを入力"
									value={newObjective.title || ""}
									onChange={(e) =>
										setNewObjective({ ...newObjective, title: e.target.value })
									}
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="description">目標の詳細</Label>
								<Textarea
									id="description"
									placeholder="詳細な目標内容を入力"
									value={newObjective.description || ""}
									onChange={(e) =>
										setNewObjective({
											...newObjective,
											description: e.target.value,
										})
									}
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="quarter">対象四半期</Label>
								<Input
									id="quarter"
									placeholder="例：2023 Q2"
									value={newObjective.quarter || ""}
									onChange={(e) =>
										setNewObjective({
											...newObjective,
											quarter: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								キャンセル
							</Button>
							<Button onClick={handleAddObjective}>追加する</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<Accordion type="multiple" className="space-y-4">
				{objectives.map((objective) => (
					<AccordionItem
						value={`objective-${objective.id}`}
						key={objective.id}
						className="border rounded-lg"
					>
						<Card>
							<CardHeader className="pb-2">
								<div className="flex justify-between">
									<div>
										<CardTitle className="text-lg">{objective.title}</CardTitle>
										<CardDescription>{objective.description}</CardDescription>
									</div>
									<div className="flex items-center space-x-2">
										<Badge variant="outline">{objective.quarter}</Badge>
										<Button
											variant="outline"
											size="icon"
											onClick={(e) => {
												e.stopPropagation();
												onGoalSelect(objective.id);
											}}
										>
											<FileEdit className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pb-2">
								<div className="flex items-center space-x-4">
									<div className="flex-1">
										<Progress value={objective.progress} className="h-2" />
									</div>
									<span className="text-sm font-medium">
										{objective.progress}%
									</span>
								</div>
							</CardContent>
							<AccordionTrigger className="pt-0 px-6">
								<span className="text-sm text-muted-foreground">
									Key Results ({objective.keyResults.length})
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<div className="px-6 space-y-4">
									{objective.keyResults.map((kr) => (
										<div key={kr.id} className="border-t pt-4">
											<div className="flex justify-between items-start">
												<div className="space-y-1">
													<p className="text-sm">{kr.description}</p>
													<div className="flex items-center space-x-2">
														<div className="flex-1 w-32">
															<Progress value={kr.progress} className="h-1.5" />
														</div>
														<span className="text-xs">{kr.progress}%</span>
														{getStatusBadge(kr.status)}
													</div>
												</div>
												<Button
													variant="outline"
													size="icon"
													className="text-red-600 h-6 w-6"
													onClick={(e) => {
														e.stopPropagation();
														// KRの削除処理をここに実装
														const updatedObjectives = objectives.map((obj) => {
															if (obj.id === objective.id) {
																const newKeyResults = obj.keyResults.filter(
																	(item) => item.id !== kr.id,
																);
																const totalProgress =
																	newKeyResults.length > 0
																		? newKeyResults.reduce(
																				(sum, item) => sum + item.progress,
																				0,
																			) / newKeyResults.length
																		: 0;
																return {
																	...obj,
																	keyResults: newKeyResults,
																	progress: Math.round(totalProgress),
																};
															}
															return obj;
														});
														setObjectives(updatedObjectives);
													}}
												>
													<Trash2 className="h-3 w-3" />
												</Button>
											</div>
										</div>
									))}

									<Button
										variant="outline"
										className="w-full mt-4"
										onClick={() => openAddKeyResultDialog(objective.id)}
									>
										<PlusCircle className="h-4 w-4 mr-2" />
										新しいKey Resultを追加
									</Button>
								</div>
							</AccordionContent>
						</Card>
					</AccordionItem>
				))}
			</Accordion>

			{/* KeyResult追加ダイアログ */}
			<Dialog
				open={isKeyResultDialogOpen}
				onOpenChange={setIsKeyResultDialogOpen}
			>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>Key Resultの追加</DialogTitle>
						<DialogDescription>
							目標達成のための具体的な成果指標を入力してください
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="kr-description">Key Result</Label>
							<Textarea
								id="kr-description"
								placeholder="達成可能で測定可能な結果を入力"
								value={newKeyResult.description || ""}
								onChange={(e) =>
									setNewKeyResult({
										...newKeyResult,
										description: e.target.value,
									})
								}
							/>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsKeyResultDialogOpen(false)}
						>
							キャンセル
						</Button>
						<Button onClick={handleAddKeyResult}>追加する</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
