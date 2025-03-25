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
	name: string;
	description: string;
	levelOrAuthority: string;
	requirements: string;
}

interface CertificationFormProps {
	certification?: Partial<CertificationFormValues>;
	onSubmit?: (values: CertificationFormValues) => void;
}

export function CertificationForm({
	certification,
	onSubmit = () => {
		// デフォルトは何もしない
	},
}: CertificationFormProps) {
	const router = useRouter();

	// フォームの初期値設定
	const defaultValues: CertificationFormValues = {
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

	// キャンセルボタンのハンドラ
	const handleCancel = () => {
		router.push("/admin/certifications");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
