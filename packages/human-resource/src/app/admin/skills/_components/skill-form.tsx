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

// フォームのバリデーションスキーマ
const formSchema = v.object({
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
	name: string;
	description: string;
	levelOrAuthority: string;
	requirements: string;
}

interface SkillFormProps {
	skill?: Partial<SkillFormValues>;
	onSubmit?: (values: SkillFormValues) => void;
}

export function SkillForm({
	skill,
	onSubmit = () => {
		// デフォルトは何もしない
	},
}: SkillFormProps) {
	const router = useRouter();

	// フォームの初期値設定
	const defaultValues: SkillFormValues = {
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

	// キャンセルボタンのハンドラ
	const handleCancel = () => {
		router.push("/admin/skills");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
					<Button type="button" variant="outline" onClick={handleCancel}>
						キャンセル
					</Button>
					<Button type="submit">保存</Button>
				</div>
			</form>
		</Form>
	);
}
