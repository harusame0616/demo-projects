"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

// フォームのスキーマを定義
const skillSearchSchema = v.object({
	query: v.string(),
});

type SkillSearchFormValues = {
	query: string;
};

interface SearchFormPresenterProps {
	defaultQuery: string;
}

export function SearchFormPresenter({
	defaultQuery = "",
}: SearchFormPresenterProps) {
	const router = useRouter();
	const pathname = usePathname();

	// フォームの初期値を設定
	const defaultValues: SkillSearchFormValues = {
		query: defaultQuery,
	};

	// フォームを初期化
	const form = useForm<SkillSearchFormValues>({
		resolver: valibotResolver(skillSearchSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: defaultQuery || "",
		});
	}, [defaultQuery, form]);

	// 検索処理
	const handleSearch = (values: SkillSearchFormValues) => {
		const params = new URLSearchParams();

		if (values.query) {
			params.set("query", values.query);
		}

		// 検索時はページをリセット
		params.delete("page");

		const newPath = `${pathname}?${params.toString()}`;
		router.push(newPath);
	};

	// フォームをクリア
	const handleClear = () => {
		form.reset({
			query: "",
		});
		router.push(pathname);
	};

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSearch)}
						className="gap-4 grid grid-cols-4"
					>
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-2">
									<FormLabel className="text-sm font-medium mb-1 block">
										キーワード（スキル名、説明）
									</FormLabel>
									<FormControl>
										<Input
											className="h-10 rounded-lg border-gray-200"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* ボタン */}
						<div className="col-span-4 flex gap-2 flex-wrap">
							<Button type="submit" className="h-10 sm:max-w-32 w-full">
								検索
							</Button>
							<Button
								onClick={handleClear}
								variant="outline"
								type="button"
								className="h-10 sm:max-w-32 w-full"
							>
								クリア
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
