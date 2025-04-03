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
import { positionData } from "../_data/positions-data";
import type { PositionSearchQuery } from "../search-query";

// フォームのスキーマを定義
const formSchema = v.object(
	{
		query: v.string(),
		level: v.string(),
	},
	"検索フォームの入力が不正です",
);

interface SearchFormPresenterProps {
	searchQuery: PositionSearchQuery;
}

export function SearchFormPresenter({ searchQuery }: SearchFormPresenterProps) {
	const searchForm = useSearchForm(formSchema, searchQuery, {
		query: "",
		level: "all",
	});
	const levelOptions = positionData
		.map((position) => ({
			id: position.level.toString(),
			name: position.level.toString(),
		}))
		.reduce(
			(acc, curr) => {
				if (!acc.find((option) => option.id === curr.id)) {
					acc.push(curr);
				}
				return acc;
			},
			[] as { id: string; name: string }[],
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
							<Input className="h-10 rounded-lg border-gray-200" {...field} />
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
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger
									className="h-10 border-gray-200 w-full min-h-10 overflow-hidden"
									value={field.value}
								>
									<SelectValue placeholder="すべて" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべて</SelectItem>
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
