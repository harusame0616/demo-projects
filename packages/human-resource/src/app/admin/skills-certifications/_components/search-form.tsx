"use client";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SkillCertificationSearchParams } from "../_actions/skill-certification-actions";

// フォームのスキーマを定義
const skillSearchSchema = v.object({
	query: v.string(),
	type: v.string(),
});

type SkillSearchFormValues = {
	query: string;
	type: string;
};

interface SearchFormProps {
	searchParams: SkillCertificationSearchParams;
}

export function SearchForm({ searchParams }: SearchFormProps) {
	const router = useRouter();
	const pathname = usePathname();

	// フォームの初期値を設定
	const defaultValues: SkillSearchFormValues = {
		query: searchParams.query || "",
		type: searchParams.type || "all",
	};

	// フォームを初期化
	const form = useForm<SkillSearchFormValues>({
		resolver: valibotResolver(skillSearchSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: searchParams.query || "",
			type: searchParams.type || "all",
		});
	}, [searchParams, form]);

	// 検索処理
	const handleSearch = (values: SkillSearchFormValues) => {
		const params = new URLSearchParams();

		if (values.query) {
			params.set("query", values.query);
		}

		if (values.type !== "all") {
			params.set("type", values.type);
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
			type: "all",
		});
		router.push(pathname);
	};

	return (
		<div className="w-full mb-6 bg-white rounded-xl border p-6 shadow-sm">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6">
					{/* 検索フィールド行 */}
					<div className="flex flex-col gap-4">
						{/* 検索入力エリア */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							{/* 検索入力フィールド */}
							<div className="col-span-2">
								<FormField
									control={form.control}
									name="query"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm font-medium mb-1 block">
												キーワード（名称、説明）
											</FormLabel>
											<FormControl>
												<div className="relative w-full">
													<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
													<Input
														className="pl-10 w-full h-10 rounded-lg"
														{...field}
														aria-label="スキル・資格を検索"
													/>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							{/* タイプ選択 */}
							<div className="w-full">
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="text-sm font-medium mb-1 block">
												種別
											</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}
												>
													<SelectTrigger
														className="h-10 rounded-lg w-full min-w-0"
														aria-label="種別"
													>
														<SelectValue placeholder="種別" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="all">すべて</SelectItem>
														<SelectItem value="skill">スキル</SelectItem>
														<SelectItem value="certification">資格</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* ボタン */}
						<div className="flex gap-4">
							<Button
								type="submit"
								className="bg-black text-white h-10 rounded-lg w-32"
							>
								検索
							</Button>
							<Button
								onClick={handleClear}
								variant="outline"
								type="button"
								className="border-gray-300 h-10 rounded-lg w-32"
							>
								クリア
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
