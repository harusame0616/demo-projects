import { LoginForm } from "@/app/login/login-form";

export const metadata = {
	title: "ログイン | 人材管理システム",
	description: "人材管理システムへのログインページ",
};

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold">人材管理システム</h1>
					<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
						従業員情報管理・評価・育成支援
					</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
