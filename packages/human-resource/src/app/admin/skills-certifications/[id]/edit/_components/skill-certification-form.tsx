"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
	type SkillCertification,
	type SkillCertificationType,
	updateSkillCertification,
} from "../../../_data/skills-certifications-data";

// フォームのバリデーションスキーマ
const formSchema = z.object({
	name: z.string().min(1, {
		message: "名前は必須です",
	}),
	type: z.enum(["skill", "certification"], {
		required_error: "種類を選択してください",
	}),
	description: z.string().min(1, {
		message: "説明は必須です",
	}),
	levelOrAuthority: z.string().min(1, {
		message: "レベルまたは認定機関は必須です",
	}),
	requirements: z.string().optional(),
});

const TYPE_LABELS = {
	skill: "スキル",
	certification: "資格",
};

type FormValues = z.infer<typeof formSchema>;

interface SkillCertificationFormProps {
	skillCertification: SkillCertification;
}

export function SkillCertificationForm({
	skillCertification,
}: SkillCertificationFormProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// フォームの初期化
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: skillCertification.name,
			type: skillCertification.type,
			description: skillCertification.description,
			levelOrAuthority: skillCertification.levelOrAuthority,
			requirements: skillCertification.requirements || "",
		},
	});

	// フォーム送信処理
	const onSubmit = async (data: FormValues) => {
		try {
			setIsSubmitting(true);

			// データ更新処理（実際はAPIリクエストになる）
			const updatedItem = updateSkillCertification(skillCertification.id, data);

			if (!updatedItem) {
				throw new Error("更新に失敗しました");
			}

			toast.success("スキル・資格を更新しました");
			router.push(`/skills-certifications/${skillCertification.id}`);
		} catch (error) {
			console.error(error);
			toast.error("更新に失敗しました");
		} finally {
			setIsSubmitting(false);
		}
	};

	// キャンセル処理
	const handleCancel = () => {
		router.back();
	};

	// タイプに基づいたラベル名の取得
	const getTypeBasedLabel = (field: string) => {
		const type = form.watch("type");
		if (field === "levelOrAuthority") {
			return type === "skill" ? "レベル" : "認定機関";
		}
		if (field === "requirements") {
			return type === "skill" ? "習得条件" : "取得条件";
		}
		return "";
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>名前</FormLabel>
							<FormControl>
								<Input placeholder="スキル・資格の名前" {...field} />
							</FormControl>
							<FormDescription>
								スキルまたは資格の正式名称を入力してください
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>種類</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="種類を選択" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="skill">{TYPE_LABELS.skill}</SelectItem>
									<SelectItem value="certification">
										{TYPE_LABELS.certification}
									</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								技術的なスキルか公的な資格かを選択してください
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>説明</FormLabel>
							<FormControl>
								<Textarea
									placeholder="スキル・資格の説明"
									className="min-h-[120px]"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								スキル・資格の詳細な説明を入力してください
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="levelOrAuthority"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{getTypeBasedLabel("levelOrAuthority")}</FormLabel>
							<FormControl>
								<Input
									placeholder={
										form.watch("type") === "skill"
											? "スキルレベル（例：初級、中級、上級）"
											: "認定機関（例：IPA、AWS）"
									}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{form.watch("type") === "skill"
									? "スキルの熟練度を示すレベルを入力してください"
									: "資格を認定している機関名を入力してください"}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="requirements"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{getTypeBasedLabel("requirements")}</FormLabel>
							<FormControl>
								<Textarea
									placeholder="取得条件の詳細"
									className="min-h-[100px]"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{form.watch("type") === "skill"
									? "このスキルを習得するために必要な条件を入力してください"
									: "この資格を取得するために必要な条件を入力してください"}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-4 justify-end mt-8">
					<Button type="button" variant="outline" onClick={handleCancel}>
						キャンセル
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "更新中..." : "保存"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
