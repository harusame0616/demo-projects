"use client";

import type { Skill } from "@/app/_mocks/skills";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { createSkill, updateSkill } from "../_action/skill-actions";

// フォームのバリデーションスキーマ
const formSchema = v.object({
	code: v.pipe(
		v.string(),
		v.minLength(1, "コードは必須です"),
		v.maxLength(10, "コードは10文字以内で入力してください"),
	),
	name: v.pipe(
		v.string(),
		v.minLength(1, "スキル名は必須です"),
		v.maxLength(50, "スキル名は50文字以内で入力してください"),
	),
	description: v.pipe(
		v.string(),
		v.minLength(1, "説明は必須です"),
		v.maxLength(500, "説明は500文字以内で入力してください"),
	),
	level: v.pipe(
		v.string(),
		v.minLength(1, "レベルは必須です"),
		v.maxLength(50, "レベルは50文字以内で入力してください"),
	),
	requirements: v.pipe(
		v.string(),
		v.maxLength(500, "要件は500文字以内で入力してください"),
	),
});

interface SkillFormValues {
	code: string;
	name: string;
	description: string;
	level: string;
	requirements: string;
}

interface SkillFormProps {
	skill?: Skill;
	isNew?: boolean;
}

export function SkillForm({ skill, isNew = true }: SkillFormProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// フォームの初期値設定
	const defaultValues: SkillFormValues = {
		code: skill?.code || "",
		name: skill?.name || "",
		description: skill?.description || "",
		level: skill?.level.toString() || "",
		requirements: skill?.requirements || "",
	};

	// フォーム定義
	const form = useForm<SkillFormValues>({
		resolver: valibotResolver(formSchema),
		defaultValues,
	});

	// フォーム送信ハンドラ
	const onSubmit = async (values: SkillFormValues) => {
		setIsSubmitting(true);
		setError(null);

		try {
			if (isNew) {
				// 新規作成の場合
				const newSkill = await createSkill({
					...values,
					level: Number.parseInt(values.level, 10),
					category: "プログラミング言語",
					categoryId: "CAT_001",
				});

				toast({
					title: "スキルを登録しました",
					description: `「${newSkill.name}」が正常に登録されました。`,
				});

				router.push(`/admin/skills/${newSkill.code}`);
			} else if (skill) {
				// 更新の場合
				const updatedSkill = await updateSkill(skill.code, {
					...values,
					level: Number.parseInt(values.level, 10),
				});

				toast({
					title: "スキルを更新しました",
					description: `「${updatedSkill?.name}」の情報が更新されました。`,
				});

				router.push(`/admin/skills/${skill.code}`);
			}

			router.refresh();
		} catch (err) {
			console.error("エラー:", err);
			setError(err instanceof Error ? err.message : "エラーが発生しました");
		} finally {
			setIsSubmitting(false);
		}
	};

	// キャンセルボタンのハンドラ
	const handleCancel = () => {
		router.back();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{error && (
					<div className="bg-red-50 p-4 rounded-md text-red-600 mb-4">
						{error}
					</div>
				)}

				<Card>
					<CardContent className="space-y-6">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>スキルコード *</FormLabel>
									<FormControl>
										<Input placeholder="S001" {...field} disabled={!isNew} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>スキル名 *</FormLabel>
									<FormControl>
										<Input placeholder="TypeScript" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>説明 *</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Microsoft社が開発した静的型付けプログラミング言語"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="level"
							render={({ field }) => (
								<FormItem>
									<FormLabel>レベル *</FormLabel>
									<FormControl>
										<Input placeholder="上級" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="requirements"
							render={({ field }) => (
								<FormItem>
									<FormLabel>要件</FormLabel>
									<FormControl>
										<Textarea
											placeholder="3年以上の開発経験、大規模プロジェクトでの使用経験"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<div className="flex gap-2 flex-wrap">
					<Button type="submit" className="h-10 sm:max-w-32 w-full">
						{isSubmitting
							? isNew
								? "登録中..."
								: "更新中..."
							: isNew
								? "登録"
								: "更新"}
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
		</Form>
	);
}
