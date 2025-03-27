"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createGrade, updateGrade } from "../_actions/grade-actions";
import type { Grade } from "../_data/grades-data";

interface GradeFormProps {
	grade?: Grade;
	isNew?: boolean;
}

export function GradeForm({ grade, isNew = false }: GradeFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		id: grade?.id || "",
		name: grade?.name || "",
		level: grade?.level?.toString() || "0",
		description: grade?.description || "",
		salaryMin: grade?.salaryRange?.min?.toString() || "300000",
		salaryMax: grade?.salaryRange?.max?.toString() || "500000",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (value: string, field: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const gradeData = {
				name: formData.name,
				level: Number.parseInt(formData.level, 10),
				description: formData.description,
				salaryRange: {
					min: Number.parseInt(formData.salaryMin, 10),
					max: Number.parseInt(formData.salaryMax, 10),
				},
			};

			if (isNew) {
				// 新規作成
				const newGrade = await createGrade(gradeData);

				toast({
					title: "グレードを作成しました",
					description: `「${newGrade.name}」が正常に作成されました。`,
				});

				// 作成成功
				router.push(`/admin/grades/${newGrade.id}`);
			} else if (grade) {
				// 更新
				const updatedGrade = await updateGrade(grade.id, gradeData);

				toast({
					title: "グレードを更新しました",
					description: `「${updatedGrade?.name}」の情報が更新されました。`,
				});

				// 更新成功
				router.push(`/admin/grades/${grade.id}`);
			}

			router.refresh(); // データを更新するため
		} catch (error) {
			console.error(isNew ? "作成エラー:" : "更新エラー:", error);
			setError(error instanceof Error ? error.message : "エラーが発生しました");
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Card>
				<CardContent className="space-y-6">
					{error && (
						<div className="bg-red-50 p-4 rounded-md text-red-600 mb-4">
							{error}
						</div>
					)}

					{isNew ? null : (
						<div className="space-y-2">
							<Label htmlFor="id">グレードコード</Label>
							<Input
								id="id"
								name="id"
								value={formData.id}
								onChange={handleChange}
								placeholder="グレードコードを入力"
								className="max-w-[200px]"
								disabled
							/>
						</div>
					)}

					<div className="space-y-2">
						<Label htmlFor="name">グレード名</Label>
						<Input
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="グレード名を入力"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="level">レベル</Label>
						<Select
							value={formData.level}
							onValueChange={(value) => handleSelectChange(value, "level")}
						>
							<SelectTrigger className="max-w-[200px]">
								<SelectValue placeholder="レベルを選択" />
							</SelectTrigger>
							<SelectContent>
								{[0, 1, 2, 3, 4, 5, 6, 7].map((level) => (
									<SelectItem key={level} value={level.toString()}>
										レベル {level}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">説明</Label>
						<Textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="グレードの説明を入力"
							rows={3}
							required
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="salaryMin">給与範囲（最小）</Label>
							<div className="relative">
								<Input
									id="salaryMin"
									name="salaryMin"
									type="number"
									value={formData.salaryMin}
									onChange={handleChange}
									placeholder="最小給与額"
									required
									min="0"
									step="10000"
								/>
								<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
									<span className="text-gray-500">円</span>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="salaryMax">給与範囲（最大）</Label>
							<div className="relative">
								<Input
									id="salaryMax"
									name="salaryMax"
									type="number"
									value={formData.salaryMax}
									onChange={handleChange}
									placeholder="最大給与額"
									required
									min="0"
									step="10000"
								/>
								<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
									<span className="text-gray-500">円</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="flex gap-2 flex-wrap">
				<Button
					type="submit"
					disabled={isSubmitting}
					className="h-10 sm:max-w-32 w-full"
				>
					{isSubmitting
						? isNew
							? "作成中..."
							: "保存中..."
						: isNew
							? "作成"
							: "保存"}
				</Button>
				<Button
					type="button"
					variant="outline"
					className="h-10 sm:max-w-32 w-full"
					onClick={handleCancel}
					disabled={isSubmitting}
				>
					キャンセル
				</Button>
			</div>
		</form>
	);
}
