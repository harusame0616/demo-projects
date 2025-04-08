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

interface StockEditFormProps {
	stock: Stock;
	updateStock: (stockId: string, data: Partial<Stock>) => Promise<void>;
}

export function StockEditForm({ stock, updateStock }: StockEditFormProps) {
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: valibotResolver(StockSchema),
		defaultValues: {
			name: stock.name,
			janCode: stock.janCode,
			setCount: stock.setCount,
		},
	});

	const isSubmitting = form.formState.isSubmitting;

	const onSubmit = async (values: FormValues) => {
		try {
			// 更新処理
			await updateStock(stock.stockId, values);

			toast.success("在庫情報を更新しました");
			router.push(`/stocks/${stock.stockId}`);
		} catch (error) {
			toast.error("更新に失敗しました");
			console.error(error);
		}
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
								<SaveIcon className="h-4 w-4" />
								保存
							</Button>
							<Button
								type="button"
								variant="outline"
								disabled={isSubmitting}
								asChild
							>
								<Link href={`/stocks/${stock.stockId}`}>キャンセル</Link>
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
