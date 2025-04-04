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
import type { SkillSearchQuery } from "../search-query";

// フォームのスキーマを定義
const schema = v.object(
	{
		query: v.string(),
	},
	"検索フォームの入力が不正です",
);

type Props = {
	searchQuery: SkillSearchQuery;
};

export function SearchFormPresenter({ searchQuery }: Props) {
	const searchForm = useSearchForm(schema, searchQuery, { query: "" });

	return (
		<SearchForm {...searchForm}>
			<FormField
				control={searchForm.form.control}
				name="query"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>キーワード（スキル名、説明）</FormLabel>
						<FormControl>
							<Input className="h-10 rounded-lg border-gray-200" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
		</SearchForm>
	);
}
