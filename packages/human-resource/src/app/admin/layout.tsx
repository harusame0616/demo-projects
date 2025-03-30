import { AppSidebar } from "@/app/admin/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Loading from "./loading";

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<div className="flex flex-col min-h-screen w-full">
				<header className="border-b bg-background sticky top-0 z-50 md:hidden">
					<div className="flex h-16 items-center justify-between px-6 transition-[margin] duration-200 ease-linear">
						<div className="flex items-center gap-4">
							<div className="md:hidden">
								<SidebarTrigger />
							</div>
							<h1 className="text-xl font-bold">人材管理システム</h1>
						</div>
					</div>
				</header>
				<div className="flex-1 flex overflow-hidden w-full">
					<AppSidebar />
					<main className="flex-1 p-6 overflow-auto w-full max-w-full transition-[margin] duration-200 ease-linear [scrollbar-gutter:stable] gap-4 flex flex-col">
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
