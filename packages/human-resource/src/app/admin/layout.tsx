import { AppSidebar } from "@/app/admin/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<div className="flex flex-col min-h-screen">
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
