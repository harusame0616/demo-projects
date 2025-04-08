"use client";

import { userRoles } from "@/app/_mocks/users";
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
import {
	type UserSearchQuery,
	searchParamsUserQuerySchema,
} from "../search-query";
// 検索フォームのスキーマ

interface Props {
	searchQuery: UserSearchQuery;
}

export function SearchFormPresenter({ searchQuery }: Props) {
	const searchForm = useSearchForm(searchParamsUserQuerySchema, searchQuery, {
		query: "",
		role: "all",
	});
	return (
		<SearchForm {...searchForm}>
			<FormField
				name="query"
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-2">
						<FormLabel>キーワード（名前、メールアドレス）</FormLabel>
						<FormControl>
							<Input
								className="rounded-lg border-gray-200"
								{...field}
								value={field.value || ""}
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				name="role"
				control={searchForm.form.control}
				render={({ field }) => (
					<FormItem className="col-span-4 sm:col-span-1">
						<FormLabel>権限</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger className="border-gray-200 w-full overflow-hidden">
									<SelectValue placeholder="すべての権限" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="all">すべて</SelectItem>
								{userRoles.map((role) => (
									<SelectItem key={role.id} value={role.id}>
										{role.name}
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
