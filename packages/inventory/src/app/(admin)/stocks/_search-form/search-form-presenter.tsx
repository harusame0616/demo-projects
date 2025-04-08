"use client";

import { useSearchForm } from "@/components/common/use-search-form";
import { SearchForm } from "@/components/common/search-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SearchQuery, searchParamsQuerySchema } from "../search-query";
import { Button } from "@/components/ui/button";

interface Params {
	searchQuery: SearchQuery;
}

export function SearchFormPresenter({ searchQuery }: Params) {
	const searchForm = useSearchForm(searchParamsQuerySchema, searchQuery, {
		keyword: "",
		notInventoried: "",
	});

	return (
		<SearchForm {...searchForm}>
			<FormField
				name="keyword"
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>キーワード（商品名、JANコード）</FormLabel>
						<FormControl>
							<Input {...field} value={field.value || ""} />
						</FormControl>
					</FormItem>
				)}
			/>
			<div className="grid grid-cols-2 col-span-4 sm:col-span-2 items-end gap-2">
				<div>
					<FormField
						name="notInventoried"
						control={searchForm.form.control}
						render={({ field }) => (
							<FormItem className="col-span-4 sm:col-span-2">
								<FormLabel>未棚卸し月</FormLabel>
								<FormControl>
									<Input type="month" {...field} value={field.value || ""} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="button"
					variant="secondary"
					className="w-fit"
					onClick={() => {
						searchForm.form.setValue(
							"notInventoried",
							new Date().toISOString().slice(0, 7),
						);
					}}
				>
					今月
				</Button>
			</div>
		</SearchForm>
	);
}
