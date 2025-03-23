import { redirect } from "next/navigation";
import { type Mock, beforeEach, describe, expect, test, vi } from "vitest";

import { login } from "./login";
import { loginAction } from "./login-action";

vi.mock("./login", () => ({
	login: vi.fn().mockResolvedValue({ success: true }),
}));
vi.mock("next/navigation");
vi.mock("@/lib/supabase/server.ts", () => ({
	createClient: vi.fn().mockReturnValue({
		auth: {
			getUser() {
				return {
					data: {
						user: {
							id: "test",
							email: "test@example.com",
							user_metadata: {
								name: "テスト太郎",
								role: "admin",
							},
						},
					},
				};
			},
		},
	}),
}));

describe("loginAction", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test.each([
		// 不要なパラメーターがあっても取り除かれる
		{ email: "m@e.com", password: "123456", garbage: "garbage" },
		{
			email:
				"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com",
			password:
				"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		},
	])(
		"正しいパラメーターを渡すとログイン処理が実行し、処理が成功するとリダイレクトする %s",
		async (params) => {
			await loginAction(params);

			const { email, password } = params;

			expect((login as Mock).mock.lastCall?.[0]).toEqual({ email, password });
			expect(redirect).toHaveBeenCalledWith("/admin");
		},
	);

	test.each([
		// メールアドレスエラー
		{ email: "", password: "123456" },
		{ email: "a", password: "123456" },
		{
			email:
				"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com",
			password: "123456",
		},
		{ password: "123456" },
		// パスワードエラー
		{ email: "a@example.com", password: "" },
		{ email: "a@example.com", password: "12345" },
		{ email: "a@example.com" },
		// その他（API として自由に呼び出せるので、型チェックでエラーになる値も確認しておく）
		"string",
		12345,
		null,
		undefined,
	])(
		"パラメーターが正しくないとログイン処理は実行せず、バリデーション失敗を返す %s",
		async (params) => {
			// biome-ignore lint/suspicious/noExplicitAny: テストでの型チェック回避のため
			const result = await loginAction(params as any);

			expect(login).not.toHaveBeenCalled();
			expect(redirect).not.toHaveBeenCalled();
			expect(result).toEqual(
				expect.objectContaining({
					success: false,
					// 基本フロントでバリデーションを行ってそのエラーを表示するため、バリデーションエラーのメッセージのチェックは行わない
				}),
			);
		},
	);
});
