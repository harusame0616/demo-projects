"use client";

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
import {
	createSkillCertification,
	updateSkillCertification,
} from "../../skills-certifications/_actions/certification-actions";
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
		v.minLength(1, "資格名は必須です"),
		v.maxLength(100, "資格名は100文字以内で入力してください"),
	),
	description: v.pipe(
		v.string(),
		v.minLength(1, "説明は必須です"),
		v.maxLength(500, "説明は500文字以内で入力してください"),
	),
	levelOrAuthority: v.pipe(
		v.string(),
		v.minLength(1, "認定機関は必須です"),
		v.maxLength(100, "認定機関は100文字以内で入力してください"),
	),
	requirements: v.pipe(
		v.string(),
		v.maxLength(500, "取得条件は500文字以内で入力してください"),
	),
});

interface CertificationFormValues {
	code: string;
	name: string;
	description: string;
	levelOrAuthority: string;
	requirements: string;
}

interface CertificationFormProps {
	certification?: SkillCertification;
	isNew?: boolean;
}

export function CertificationForm({
	certification,
	isNew = true,
}: CertificationFormProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// フォームの初期値設定
	const defaultValues: CertificationFormValues = {
		code: certification?.code || "",
		name: certification?.name || "",
		description: certification?.description || "",
		levelOrAuthority: certification?.levelOrAuthority || "",
		requirements: certification?.requirements || "",
	};

	// フォーム定義
	const form = useForm<CertificationFormValues>({
		resolver: valibotResolver(formSchema),
		defaultValues,
	});

	// フォーム送信ハンドラ
	const onSubmit = async (values: CertificationFormValues) => {
		setIsSubmitting(true);
		setError(null);

		try {
			if (isNew) {
				// 新規作成の場合
				const newCertification = await createSkillCertification({
					...values,
					type: "certification",
				});

				toast({
					title: "資格を登録しました",
					description: `「${newCertification.name}」が正常に登録されました。`,
				});

				router.push(`/admin/certifications/${newCertification.id}`);
			} else if (certification) {
				// 更新の場合
				const updatedCertification = await updateSkillCertification(
					certification.id,
					{
						...values,
						type: "certification",
					},
				);

				toast({
					title: "資格を更新しました",
					description: `「${updatedCertification?.name}」の情報が更新されました。`,
				});

				router.push(`/admin/certifications/${certification.id}`);
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
									<FormLabel>資格コード *</FormLabel>
									<FormControl>
										<Input placeholder="C001" {...field} disabled={!isNew} />
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
									<FormLabel>資格名 *</FormLabel>
									<FormControl>
										<Input
											placeholder="AWS認定ソリューションアーキテクト - アソシエイト"
											{...field}
										/>
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
											placeholder="AWSのサービスに関する設計と導入の知識を証明する資格"
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
									<FormLabel>認定機関 *</FormLabel>
									<FormControl>
										<Input placeholder="Amazon Web Services" {...field} />
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
									<FormLabel>取得条件</FormLabel>
									<FormControl>
										<Textarea
											placeholder="模擬試験で80%以上のスコア、1年以上の実務経験推奨"
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
					<Button
						type="submit"
						disabled={isSubmitting}
						className="h-10 sm:max-w-32 w-full"
					>
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
						onClick={handleCancel}
						disabled={isSubmitting}
						className="h-10 sm:max-w-32 w-full"
					>
						キャンセル
					</Button>
				</div>
			</form>
		</Form>
	);
}
