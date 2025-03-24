"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SkillCertificationType } from "../_data/skills-certifications-data";

// フォームのスキーマを定義
const skillSearchSchema = v.object({
	query: v.string(),
	type: v.string(),
});

type SkillSearchFormValues = v.InferType<typeof skillSearchSchema>;

interface SkillSearchProps {
	initialQuery?: string;
	initialType?: SkillCertificationType | "all";
}

export function SkillSearch({
	initialQuery = "",
	initialType = "all",
}: SkillSearchProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	// フォームの初期値を設定
	const defaultValues: SkillSearchFormValues = {
		query: initialQuery,
		type: initialType,
	};

	// フォームを初期化
	const form = useForm<SkillSearchFormValues>({
		resolver: valibotResolver(skillSearchSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: initialQuery,
			type: initialType,
		});
	}, [initialQuery, initialType, form]);

	// フォーム送信時の処理
	const handleSearch = (values: SkillSearchFormValues) => {
		const updatedParams = new URLSearchParams(params.toString());

		if (values.query) {
			updatedParams.set("query", values.query);
		} else {
			updatedParams.delete("query");
		}

		if (values.type === "all") {
			updatedParams.delete("type");
		} else {
			updatedParams.set("type", values.type);
		}

		// 検索時はページをリセット
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	// クリア処理
	const handleClear = () => {
		form.reset({
			query: "",
			type: "all",
		});

		const updatedParams = new URLSearchParams(params.toString());
		updatedParams.delete("query");
		updatedParams.delete("type");
		updatedParams.delete("page");
		router.push(`${pathname}?${updatedParams.toString()}`);
	};

	return (
		<div className="w-full mb-4 bg-white rounded-3xl shadow-sm p-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSearch)} className="w-full">
					<div className="flex flex-col space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
													placeholder="名称または説明で検索..."
													className="pl-10 h-10 rounded-lg border-gray-200"
													{...field}
													aria-label="名称または説明で検索"
												/>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium mb-1 block">
											種類
										</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger
													className="h-10 rounded-lg border-gray-200"
													aria-label="種類でフィルター"
												>
													<SelectValue placeholder="種類でフィルター" />
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

						<div className="flex gap-4 justify-end">
							<Button
								type="submit"
								className="bg-black text-white h-10 rounded-lg w-24"
							>
								検索
							</Button>
							<Button
								onClick={handleClear}
								variant="outline"
								type="button"
								className="border-gray-300 h-10 rounded-lg w-24"
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
