"use client";

import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import {
	createSkillCertification,
	updateSkillCertification,
} from "../../skills-certifications/_actions/skill-certification-actions";
import type { SkillCertification } from "../../skills-certifications/_data/skills-certifications-data";

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
	levelOrAuthority: v.pipe(
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
	levelOrAuthority: string;
	requirements: string;
}

interface SkillFormProps {
	skill?: SkillCertification;
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
		levelOrAuthority: skill?.levelOrAuthority || "",
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
				const newSkill = await createSkillCertification({
					...values,
					type: "skill",
				});

				toast({
					title: "スキルを登録しました",
					description: `「${newSkill.name}」が正常に登録されました。`,
				});

				router.push(`/admin/skills/${newSkill.id}`);
			} else if (skill) {
				// 更新の場合
				const updatedSkill = await updateSkillCertification(skill.id, {
					...values,
					type: "skill",
				});

				toast({
					title: "スキルを更新しました",
					description: `「${updatedSkill?.name}」の情報が更新されました。`,
				});

				router.push(`/admin/skills/${skill.id}`);
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{error && (
					<div className="bg-red-50 p-4 rounded-md text-red-600 mb-4">
						{error}
					</div>
				)}

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
					name="levelOrAuthority"
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

				<div className="flex justify-between">
					<Button
						type="button"
						variant="outline"
						onClick={handleCancel}
						disabled={isSubmitting}
					>
						キャンセル
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting
							? isNew
								? "登録中..."
								: "更新中..."
							: isNew
								? "登録"
								: "更新"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
