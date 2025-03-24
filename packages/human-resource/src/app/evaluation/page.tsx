"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MboList } from "./_components/mbo-list";
import { OkrList } from "./_components/okr-list";
import { GoalDetails } from "./_components/goal-details";

export default function EvaluationPage() {
	const [activeTab, setActiveTab] = useState("mbo");
	const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
	const [selectedGoalType, setSelectedGoalType] = useState<
		"mbo" | "okr" | null
	>(null);

	const handleGoalSelect = (id: number, type: "mbo" | "okr") => {
		setSelectedGoalId(id);
		setSelectedGoalType(type);
	};

	const handleGoalClose = () => {
		setSelectedGoalId(null);
		setSelectedGoalType(null);
	};

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">目標管理システム</h1>

			{selectedGoalId && selectedGoalType ? (
				<div className="mb-4">
					<GoalDetails
						goalId={selectedGoalId}
						goalType={selectedGoalType}
						onClose={handleGoalClose}
					/>
				</div>
			) : (
				<Tabs
					defaultValue="mbo"
					value={activeTab}
					onValueChange={(value) => setActiveTab(value as "mbo" | "okr")}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-2 mb-8">
						<TabsTrigger value="mbo">MBO（目標による管理）</TabsTrigger>
						<TabsTrigger value="okr">OKR（目標と主要な結果）</TabsTrigger>
					</TabsList>

					<TabsContent value="mbo">
						<Card>
							<CardHeader>
								<CardTitle>MBO 目標一覧</CardTitle>
								<CardDescription>
									設定した目標と進捗状況を確認・管理します
								</CardDescription>
							</CardHeader>
							<CardContent>
								<MboList onGoalSelect={(id) => handleGoalSelect(id, "mbo")} />
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="okr">
						<Card>
							<CardHeader>
								<CardTitle>OKR 目標一覧</CardTitle>
								<CardDescription>
									目標（Objective）と主要な結果（Key Results）を確認・管理します
								</CardDescription>
							</CardHeader>
							<CardContent>
								<OkrList onGoalSelect={(id) => handleGoalSelect(id, "okr")} />
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			)}
		</div>
	);
}
