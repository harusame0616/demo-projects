"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as v from "valibot";

// フォームのバリデーションスキーマ
const formSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1, "名前は必須です")),
	email: v.pipe(
		v.string(),
		v.minLength(1, "メールアドレスは必須です"),
		v.email("有効なメールアドレスを入力してください"),
	),
	role: v.pipe(v.string(), v.minLength(1, "権限は必須です")),
});

interface UserFormProps {
	user?: v.InferInput<typeof formSchema>;
	onSubmit: (values: v.InferOutput<typeof formSchema>) => void;
}

export function UserForm({ user, onSubmit }: UserFormProps) {
	const isEditing = !!user;

	const form = useForm<v.InferOutput<typeof formSchema>>({
		resolver: valibotResolver(formSchema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			role: user?.role || "",
		},
	});

	// フォーム送信ハンドラ
	const handleSubmit = (values: v.InferOutput<typeof formSchema>) => {
		onSubmit(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				noValidate
				className="space-y-4"
			>
				{/* ユーザー基本情報フォーム */}
				<Card className="shadow-sm">
					<CardContent>
						<div className="grid grid-cols-1 gap-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>名前</FormLabel>
										<FormControl>
											<Input
												className="max-w-[240px]"
												{...field}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>メールアドレス</FormLabel>
										<FormControl>
											<Input
												placeholder="例: user@example.com"
												className="max-w-md"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>権限</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="max-w-[240px]">
													<SelectValue placeholder="権限を選択" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="admin">管理者</SelectItem>
													<SelectItem value="user">一般ユーザー</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				<div className="flex justify-start gap-2 flex-wrap">
					<Button type="submit" className="h-10 sm:max-w-32 w-full">
						{isEditing ? "更新" : "登録"}
					</Button>
					<Button variant="outline" asChild className="h-10 sm:max-w-32 w-full">
						<Link href="/users">キャンセル</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
