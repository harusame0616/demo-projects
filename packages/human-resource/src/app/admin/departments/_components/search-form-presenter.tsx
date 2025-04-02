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
import { DepartmentSearchQuery } from "../search-query";

const formSchema = v.object({
	query: v.string(),
});

interface Props {
	searchQuery: DepartmentSearchQuery;
}

export function SearchFormPresenter({ searchQuery }: Props) {
	const searchForm = useSearchForm(formSchema, searchQuery, {
		query: "",
	});

	return (
		<SearchForm {...searchForm}>
			<FormField
				name="query"
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>キーワード（部署名）</FormLabel>
						<FormControl>
							<Input className="h-10 rounded-lg border-gray-200" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
		</SearchForm>
	);
}
