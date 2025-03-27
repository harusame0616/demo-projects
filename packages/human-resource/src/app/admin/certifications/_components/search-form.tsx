"use client";

import { Input } from "@/components/ui/input";
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
import type { SkillCertificationSearchParams } from "../../skills-certifications/_actions/skill-certification-actions";
import { Card, CardContent } from "@/components/ui/card";

// フォームのスキーマを定義
const certificationSearchSchema = v.object({
	query: v.string(),
});

type CertificationSearchFormValues = {
	query: string;
};

interface CertificationSearchFormProps {
	searchParams: SkillCertificationSearchParams;
}

export function CertificationSearchForm({
	searchParams,
}: CertificationSearchFormProps) {
	const router = useRouter();
	const pathname = usePathname();

	// フォームの初期値を設定
	const defaultValues: CertificationSearchFormValues = {
		query: searchParams.query || "",
	};

	// フォームを初期化
	const form = useForm<CertificationSearchFormValues>({
		resolver: valibotResolver(certificationSearchSchema),
		defaultValues,
	});

	// 外部からのpropsが変更されたらフォームの値をリセット
	useEffect(() => {
		form.reset({
			query: searchParams.query || "",
		});
	}, [searchParams, form]);

	// 検索処理
	const handleSearch = (values: CertificationSearchFormValues) => {
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
						className="grid grid-cols-4 gap-4"
					>
						<FormField
							control={form.control}
							name="query"
							render={({ field }) => (
								<FormItem className="col-span-4 sm:col-span-2">
									<FormLabel>キーワード（名称、説明）</FormLabel>
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
