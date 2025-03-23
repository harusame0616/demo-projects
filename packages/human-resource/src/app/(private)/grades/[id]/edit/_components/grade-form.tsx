"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type Grade } from "../../../_data/grades-data";

interface GradeFormProps {
	grade: Grade;
}

export function GradeForm({ grade }: GradeFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: grade.name,
		level: grade.level.toString(),
		description: grade.description,
		salaryMin: grade.salaryRange.min.toString(),
		salaryMax: grade.salaryRange.max.toString(),
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

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

		try {
			// ここで実際のAPIリクエストを行う
			// 今回はモックデータなので、成功したふりをする
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// 更新成功
			router.push(`/grades/${grade.id}`);
			router.refresh(); // データを更新するため
		} catch (error) {
			console.error("更新エラー:", error);
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>グレード情報</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
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
							<SelectTrigger>
								<SelectValue placeholder="レベルを選択" />
							</SelectTrigger>
							<SelectContent>
								{[0, 1, 2, 3, 4, 5].map((level) => (
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
				<CardFooter className="flex justify-end">
					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={handleCancel}
							disabled={isSubmitting}
						>
							キャンセル
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "保存中..." : "保存"}
						</Button>
					</div>
				</CardFooter>
			</Card>
		</form>
	);
}
