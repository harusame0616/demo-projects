"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, PlusCircle, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// MBO目標の型定義(mbo-listと同じ)
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

// OKRの型定義(okr-listと同じ)
interface KeyResult {
	id: number;
	description: string;
	progress: number;
	status: "not_started" | "in_progress" | "completed" | "at_risk";
}

interface Objective {
	id: number;
	title: string;
	description: string;
	quarter: string;
	keyResults: KeyResult[];
	progress: number;
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

interface GoalDetailsProps {
	goalId: number;
	goalType: "mbo" | "okr";
	onClose: () => void;
}

export function GoalDetails({ goalId, goalType, onClose }: GoalDetailsProps) {
	const [goal, setGoal] = useState<MboGoal | Objective | null>(null);
	const [editedGoal, setEditedGoal] = useState<MboGoal | Objective | null>(
		null,
	);
	const [editedKeyResults, setEditedKeyResults] = useState<KeyResult[]>([]);

	useEffect(() => {
		// 目標データの取得
		if (goalType === "mbo") {
			const foundGoal = mockMboGoals.find((g) => g.id === goalId);
			if (foundGoal) {
				setGoal(foundGoal);
				setEditedGoal({ ...foundGoal });
			}
		} else {
			const foundGoal = mockOkrData.find((g) => g.id === goalId);
			if (foundGoal) {
				setGoal(foundGoal);
				setEditedGoal({ ...foundGoal });
				setEditedKeyResults([...foundGoal.keyResults]);
			}
		}
	}, [goalId, goalType]);

	if (!goal || !editedGoal) {
		return <div>Loading...</div>;
	}

	// 状態/優先度に対応するバッジの色設定
	const getStatusColor = (status: string) => {
		switch (status) {
			case "not_started":
				return "bg-gray-50 text-gray-700 border-gray-200";
			case "in_progress":
				return "bg-blue-50 text-blue-700 border-blue-200";
			case "completed":
				return "bg-green-50 text-green-700 border-green-200";
			case "delayed":
			case "at_risk":
				return "bg-red-50 text-red-700 border-red-200";
			default:
				return "";
		}
	};

	// MBO詳細表示・編集
	const renderMboDetails = () => {
		const mboGoal = editedGoal as MboGoal;

		return (
			<>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-xl">
								<Input
									value={mboGoal.title}
									onChange={(e) =>
										setEditedGoal({ ...mboGoal, title: e.target.value })
									}
									className="text-xl font-bold h-auto py-1 px-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
							</CardTitle>
						</div>
						<Badge variant="outline" className={getStatusColor(mboGoal.status)}>
							{mboGoal.status === "not_started"
								? "未着手"
								: mboGoal.status === "in_progress"
									? "進行中"
									: mboGoal.status === "completed"
										? "完了"
										: mboGoal.status === "delayed"
											? "遅延"
											: "不明"}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-4">
						<div>
							<Label>目標の詳細</Label>
							<Textarea
								value={mboGoal.description}
								onChange={(e) =>
									setEditedGoal({ ...mboGoal, description: e.target.value })
								}
								className="min-h-[100px] mt-2"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label>期限</Label>
								<Input
									type="date"
									value={mboGoal.deadline}
									onChange={(e) =>
										setEditedGoal({ ...mboGoal, deadline: e.target.value })
									}
									className="mt-2"
								/>
							</div>

							<div>
								<Label>優先度</Label>
								<Select
									value={mboGoal.priority}
									onValueChange={(value) =>
										setEditedGoal({
											...mboGoal,
											priority: value as "high" | "medium" | "low",
										})
									}
								>
									<SelectTrigger className="mt-2">
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

						<div>
							<Label>進捗状況 ({mboGoal.progress}%)</Label>
							<div className="mt-2">
								<Slider
									defaultValue={[mboGoal.progress]}
									max={100}
									step={5}
									onValueChange={(value) =>
										setEditedGoal({ ...mboGoal, progress: value[0] })
									}
									className="my-4"
								/>
							</div>
						</div>

						<div>
							<Label>状態</Label>
							<Select
								value={mboGoal.status}
								onValueChange={(value) =>
									setEditedGoal({
										...mboGoal,
										status: value as
											| "not_started"
											| "in_progress"
											| "completed"
											| "delayed",
									})
								}
							>
								<SelectTrigger className="mt-2">
									<SelectValue placeholder="状態を選択" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="not_started">未着手</SelectItem>
									<SelectItem value="in_progress">進行中</SelectItem>
									<SelectItem value="completed">完了</SelectItem>
									<SelectItem value="delayed">遅延</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{mboGoal.status === "completed" && (
							<div>
								<Label>評価スコア (1-5)</Label>
								<Select
									value={String(mboGoal.evaluationScore || 0)}
									onValueChange={(value) =>
										setEditedGoal({
											...mboGoal,
											evaluationScore: Number(value),
										})
									}
								>
									<SelectTrigger className="mt-2">
										<SelectValue placeholder="評価を選択" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="0">評価なし</SelectItem>
										<SelectItem value="1">1 (期待未満)</SelectItem>
										<SelectItem value="2">2 (やや期待未満)</SelectItem>
										<SelectItem value="3">3 (期待通り)</SelectItem>
										<SelectItem value="4">4 (期待以上)</SelectItem>
										<SelectItem value="5">5 (大幅に期待以上)</SelectItem>
									</SelectContent>
								</Select>
							</div>
						)}
					</div>
				</CardContent>
			</>
		);
	};

	// OKR詳細表示・編集
	const renderOkrDetails = () => {
		const objective = editedGoal as Objective;

		const updateKeyResultProgress = (krId: number, newProgress: number) => {
			const updatedKeyResults = editedKeyResults.map((kr) =>
				kr.id === krId ? { ...kr, progress: newProgress } : kr,
			);

			setEditedKeyResults(updatedKeyResults);

			// 全体の進捗を再計算
			const totalProgress = updatedKeyResults.reduce(
				(sum, kr) => sum + kr.progress,
				0,
			);
			const calculatedProgress = Math.round(
				totalProgress / updatedKeyResults.length,
			);

			setEditedGoal({
				...objective,
				progress: calculatedProgress,
				keyResults: updatedKeyResults,
			});
		};

		const updateKeyResultStatus = (
			krId: number,
			newStatus: KeyResult["status"],
		) => {
			const updatedKeyResults = editedKeyResults.map((kr) =>
				kr.id === krId ? { ...kr, status: newStatus } : kr,
			);

			setEditedKeyResults(updatedKeyResults);
			setEditedGoal({
				...objective,
				keyResults: updatedKeyResults,
			});
		};

		return (
			<>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-xl">
								<Input
									value={objective.title}
									onChange={(e) =>
										setEditedGoal({ ...objective, title: e.target.value })
									}
									className="text-xl font-bold h-auto py-1 px-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
							</CardTitle>
						</div>
						<Badge variant="outline">{objective.quarter}</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-4">
						<div>
							<Label>目標の詳細</Label>
							<Textarea
								value={objective.description}
								onChange={(e) =>
									setEditedGoal({ ...objective, description: e.target.value })
								}
								className="min-h-[100px] mt-2"
							/>
						</div>

						<div>
							<Label>対象四半期</Label>
							<Input
								value={objective.quarter}
								onChange={(e) =>
									setEditedGoal({ ...objective, quarter: e.target.value })
								}
								className="mt-2"
								placeholder="例: 2023 Q2"
							/>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<Label>総合進捗状況 ({objective.progress}%)</Label>
							</div>
							<Progress value={objective.progress} className="h-2 mt-2" />
						</div>

						<Separator />

						<div>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-medium">Key Results</h3>
							</div>

							<div className="space-y-6">
								{editedKeyResults.map((kr, index) => (
									<div key={kr.id} className="space-y-3 border p-4 rounded-md">
										<div className="flex justify-between items-start">
											<div className="flex-1">
												<Label>Key Result {index + 1}</Label>
												<Textarea
													value={kr.description}
													onChange={(e) => {
														const updatedKRs = editedKeyResults.map((item) =>
															item.id === kr.id
																? { ...item, description: e.target.value }
																: item,
														);
														setEditedKeyResults(updatedKRs);
														setEditedGoal({
															...objective,
															keyResults: updatedKRs,
														});
													}}
													className="mt-2"
												/>
											</div>
										</div>

										<div className="flex items-center gap-4">
											<div className="flex-1">
												<Label>進捗 ({kr.progress}%)</Label>
												<Slider
													defaultValue={[kr.progress]}
													max={100}
													step={5}
													onValueChange={(value) =>
														updateKeyResultProgress(kr.id, value[0])
													}
													className="mt-2"
												/>
											</div>

											<div className="w-36">
												<Label>状態</Label>
												<Select
													value={kr.status}
													onValueChange={(value) =>
														updateKeyResultStatus(
															kr.id,
															value as KeyResult["status"],
														)
													}
												>
													<SelectTrigger className="mt-2">
														<SelectValue placeholder="状態を選択" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="not_started">未着手</SelectItem>
														<SelectItem value="in_progress">進行中</SelectItem>
														<SelectItem value="completed">完了</SelectItem>
														<SelectItem value="at_risk">リスクあり</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</>
		);
	};

	return (
		<Card className="max-w-4xl mx-auto">
			{goalType === "mbo" ? renderMboDetails() : renderOkrDetails()}

			<CardFooter className="flex justify-between">
				<Button variant="outline" onClick={onClose}>
					<ArrowLeft className="h-4 w-4 mr-2" />
					戻る
				</Button>
				<div className="flex space-x-2">
					<Button variant="default" onClick={onClose}>
						<Save className="h-4 w-4 mr-2" />
						保存
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
