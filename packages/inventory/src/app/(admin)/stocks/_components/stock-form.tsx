"use client";

import type { Stock } from "@/app/(admin)/stocks/type";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SaveIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as v from "valibot";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

// バリデーションスキーマの定義
const StockSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1, "商品名は必須です")),
	janCode: v.pipe(
		v.string(),
		v.minLength(1, "バーコード番号は必須です"),
		v.regex(/^\d+$/, "バーコード番号は数字のみ入力可能です"),
	),
	setCount: v.pipe(
		v.number(),
		v.minValue(1, "セット数は1以上の数値を入力してください"),
	),
});

type FormValues = v.InferOutput<typeof StockSchema>;

type StockFormMode = "create" | "edit";

interface StockFormProps {
	mode: StockFormMode;
	stock?: Stock;
	onSubmit: (data: FormValues) => Promise<Stock>;
}

export function StockForm({ mode, stock, onSubmit }: StockFormProps) {
	const router = useRouter();
	const isCreateMode = mode === "create";

	const form = useForm<FormValues>({
		resolver: valibotResolver(StockSchema),
		defaultValues: isCreateMode
			? {
					name: "",
					janCode: "",
					setCount: 1,
				}
			: {
					name: stock?.name || "",
					janCode: stock?.janCode || "",
					setCount: stock?.setCount || 1,
				},
	});

	const isSubmitting = form.formState.isSubmitting;

	const handleSubmit = async (values: FormValues) => {
		try {
			// データ処理（作成または更新）
			const result = await onSubmit(values);

			// 成功メッセージ
			toast.success(
				isCreateMode ? "商品を追加しました" : "在庫情報を更新しました",
			);

			// 詳細ページへリダイレクト
			router.push(`/stocks/${result.stockId}`);
		} catch (error) {
			// エラーメッセージ
			toast.error(
				isCreateMode ? "商品の追加に失敗しました" : "更新に失敗しました",
			);
			console.error(error);
		}
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-6"
					>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="name">商品名</FormLabel>
										<FormControl>
											<Input
												id="name"
												{...field}
												placeholder="商品名を入力"
												disabled={isSubmitting}
												className="max-w-64 w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="janCode"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="janCode">
											バーコード番号（JAN）
										</FormLabel>
										<FormControl>
											<Input
												id="janCode"
												{...field}
												placeholder="バーコード番号を入力"
												disabled={isSubmitting}
												className="max-w-36 w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="setCount"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="setCount">セット数</FormLabel>
										<FormControl>
											<Input
												id="setCount"
												type="number"
												min="1"
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
												placeholder="セット数を入力"
												disabled={isSubmitting}
												className="max-w-24 w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex items-center pt-4 gap-2">
							<Button type="submit" disabled={isSubmitting}>
								{isCreateMode ? (
									<>
										<SaveIcon className="h-4 w-4" />
										追加
									</>
								) : (
									<>
										<SaveIcon className="h-4 w-4" />
										保存
									</>
								)}
							</Button>
							<Button
								type="button"
								variant="outline"
								disabled={isSubmitting}
								asChild
							>
								<Link
									href={isCreateMode ? "/stocks" : `/stocks/${stock?.stockId}`}
								>
									キャンセル
								</Link>
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
