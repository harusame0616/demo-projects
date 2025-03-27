import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmployeeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="border-b bg-background sticky top-0 z-10">
				<div className="container flex h-16 items-center justify-between py-4">
					<div className="flex items-center gap-4">
						<h1 className="text-xl font-bold">人材管理システム</h1>
					</div>
					<nav className="flex items-center gap-6">
						<Link
							href="/time-recorder"
							className="text-sm font-medium hover:text-primary"
						>
							勤怠管理
						</Link>
						<Link
							href="/evaluation"
							className="text-sm font-medium hover:text-primary"
						>
							目標管理
						</Link>
						<Button asChild variant="outline">
							<Link href="/login">ログアウト</Link>
						</Button>
					</nav>
				</div>
			</header>

			<main className="flex-1">{children}</main>

			<footer className="border-t bg-background">
				<div className="container flex h-16 items-center justify-center py-4">
					<p className="text-sm text-muted-foreground">
						© 2024 人材管理システム All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
