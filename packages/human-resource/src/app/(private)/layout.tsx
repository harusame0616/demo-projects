import { AppSidebar } from "@/app/(private)/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<div className="flex flex-col min-h-screen">
				<header className="border-b bg-background sticky top-0 z-10">
					<div className="container flex h-16 items-center justify-between py-4">
						<div className="flex items-center gap-4">
							<h1 className="text-xl font-bold">人材管理システム</h1>
						</div>
						<nav className="flex items-center gap-4">
							<Button asChild variant="outline">
								<Link href="/login">ログアウト</Link>
							</Button>
						</nav>
					</div>
				</header>
				<div className="flex-1 flex">
					<AppSidebar />
					<main className="flex-1 py-6 px-6 md:container">{children}</main>
				</div>
				<footer className="border-t bg-background">
					<div className="container flex h-16 items-center justify-center py-4">
						<p className="text-sm text-muted-foreground">
							© 2024 人材管理システム All rights reserved.
						</p>
					</div>
				</footer>
			</div>
		</SidebarProvider>
	);
}
