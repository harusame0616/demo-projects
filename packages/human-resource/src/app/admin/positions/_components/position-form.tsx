"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { Position } from "../_data/positions-data";

// フォームのバリデーションスキーマ
const formSchema = z.object({
	id: z
		.string()
		.min(1, { message: "役職コードは必須です" })
		.max(10, { message: "役職コードは10文字以内で入力してください" }),
	name: z
		.string()
		.min(1, { message: "役職名は必須です" })
		.max(50, { message: "役職名は50文字以内で入力してください" }),
	level: z
		.number({ invalid_type_error: "役職レベルは数値で入力してください" })
		.min(1, { message: "役職レベルは1以上で入力してください" })
		.max(10, { message: "役職レベルは10以下で入力してください" }),
	description: z
		.string()
		.max(500, { message: "説明は500文字以内で入力してください" }),
});

type FormValues = z.infer<typeof formSchema>;

interface PositionFormProps {
	position?: Position; // 編集時に使用する既存データ
	onSubmit: (values: FormValues) => void;
}

export function PositionForm({ position, onSubmit }: PositionFormProps) {
	const router = useRouter();
	const isEditing = !!position;

	// フォームの初期値設定
	const defaultValues = isEditing
		? {
				id: position.id,
				name: position.name,
				level: position.level,
				description: position.description,
			}
		: {
				id: "",
				name: "",
				level: 1,
				description: "",
			};

	// フォーム定義
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	// キャンセルボタンのハンドラ
	const handleCancel = () => {
		if (isEditing) {
			router.push(`/admin/positions/${position.id}`);
		} else {
			router.push("/admin/positions");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
				noValidate
			>
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>役職コード</FormLabel>
							<FormControl>
								<Input
									placeholder="例: P001"
									{...field}
									className="max-w-[200px]"
									disabled={isEditing} // 編集時は変更不可
								/>
							</FormControl>
							<FormDescription>
								役職を識別するコードを入力してください
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>役職名</FormLabel>
							<FormControl>
								<Input placeholder="例: 課長" {...field} />
							</FormControl>
							<FormDescription>
								役職の正式名称を入力してください
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="level"
					render={({ field }) => (
						<FormItem>
							<FormLabel>役職レベル</FormLabel>
							<FormControl>
								<Input
									type="number"
									min={1}
									max={10}
									placeholder="1-10"
									{...field}
									onChange={(e) =>
										field.onChange(Number.parseInt(e.target.value) || "")
									}
								/>
							</FormControl>
							<FormDescription>
								役職の階層レベルを1-10で入力してください（10が最上位）
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
									placeholder="役職の説明や責任範囲などを入力してください"
									{...field}
									rows={5}
								/>
							</FormControl>
							<FormDescription>
								役職の詳細な説明を記入してください
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-between">
					<Button type="button" variant="outline" onClick={handleCancel}>
						<ArrowLeftIcon className="h-4 w-4 mr-2" />
						キャンセル
					</Button>
					<Button type="submit">
						<SaveIcon className="h-4 w-4 mr-2" />
						{isEditing ? "更新" : "作成"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
