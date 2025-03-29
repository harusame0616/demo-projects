"use client";

import * as v from "valibot";

import { SearchForm } from "@/components/common/search-form";
import { useSearchForm } from "@/components/common/use-search-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// フォームのスキーマを定義
const schema = v.object(
	{
		query: v.string(),
		level: v.string(),
	},
	"検索フォームの入力が不正です",
);

interface LevelOption {
	id: string;
	name: string;
}

interface SearchFormPresenterProps {
	defaultQuery?: string;
	defaultLevel?: string;
	levelOptions?: LevelOption[];
	isLoading?: boolean;
}

export function SearchFormPresenter({
	defaultQuery = "",
	defaultLevel = "all",
	levelOptions = [],
	isLoading = false,
}: SearchFormPresenterProps) {
	const searchForm = useSearchForm(
		schema,
		{
			query: defaultQuery,
			level: defaultLevel,
		},
		{
			query: "",
			level: "all",
		},
	);
	return (
		<SearchForm {...searchForm}>
			<FormField
				control={searchForm.form.control}
				name="query"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>キーワード（ポジション名）</FormLabel>
						<FormControl>
							<Input
								className="h-10 rounded-lg border-gray-200"
								{...field}
								disabled={isLoading}
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={searchForm.form.control}
				name="level"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>レベル</FormLabel>
						<Select
							onValueChange={field.onChange}
							value={field.value}
							disabled={isLoading}
						>
							<FormControl>
								<SelectTrigger
									className="h-10 border-gray-200 w-full min-h-10 overflow-hidden"
									value={field.value}
								>
									<SelectValue placeholder="すべてのレベル" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべてのレベル</SelectItem>
								{levelOptions.map((level) => (
									<SelectItem key={level.id} value={level.id}>
										{level.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>
		</SearchForm>
	);
}
