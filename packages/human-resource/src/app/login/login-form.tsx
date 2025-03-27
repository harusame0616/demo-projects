"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// ログインフォームのバリデーションスキーマ
const loginSchema = v.object({
	email: v.pipe(v.string(), v.email("有効なメールアドレスを入力してください")),
	password: v.pipe(
		v.string(),
		v.minLength(8, "パスワードは8文字以上である必要があります"),
	),
});

type LoginFormValues = v.InferOutput<typeof loginSchema>;

// デフォルト値（開発用）
const defaultValues: Partial<LoginFormValues> = {
	email: "",
	password: "",
};

export function LoginForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginFormValues>({
		resolver: valibotResolver(loginSchema),
		defaultValues,
	});

	async function onSubmit(data: LoginFormValues) {
		setIsLoading(true);
		setError(null);

		try {
			// ログイン処理をモック
			console.log("ログイン情報:", data);

			// 成功したふりをする（1秒待機）
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// ダッシュボードにリダイレクト
			router.push("/admin");
		} catch (error) {
			console.error("ログインエラー:", error);
			setError(
				"ログインに失敗しました。メールアドレスとパスワードを確認してください。",
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">ログイン</CardTitle>
				<CardDescription>アカウント情報でログインしてください</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>メールアドレス</FormLabel>
									<FormControl>
										<Input
											placeholder="your-email@example.com"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>パスワード</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="••••••••"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{error && <div className="text-red-500 text-sm">{error}</div>}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "ログイン中..." : "ログイン"}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col space-y-2">
				<div className="text-sm text-muted-foreground text-center">
					アカウントをお持ちでない場合は、管理者にお問い合わせください。
				</div>
			</CardFooter>
		</Card>
	);
}
