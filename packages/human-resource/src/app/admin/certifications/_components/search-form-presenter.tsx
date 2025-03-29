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

// フォームのスキーマを定義
const schema = v.object(
	{
		query: v.string(),
	},
	"検索フォームの入力が不正です",
);

interface SearchFormPresenterProps {
	defaultQuery?: string;
}

export function SearchFormPresenter({
	defaultQuery = "",
}: SearchFormPresenterProps) {
	const searchForm = useSearchForm(
		schema,
		{ query: defaultQuery },
		{ query: "" },
	);

	return (
		<SearchForm {...searchForm}>
			<FormField
				name="query"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>キーワード（資格名、説明、認定機関）</FormLabel>
						<FormControl>
							<Input className="h-10 rounded-lg border-gray-200" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
		</SearchForm>
	);
}
