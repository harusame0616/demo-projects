"use client";

import {
	Building2,
	Briefcase,
	Users,
	Award,
	BookOpenCheck,
	LayoutDashboard,
	PanelLeftIcon,
	PanelRightIcon,
	MenuIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
	const pathname = usePathname();
	const { open } = useSidebar();

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			{open && (
				<SidebarHeader className="flex items-center">
					<h2 className="text-xl font-bold px-4 py-2">メニュー</h2>
				</SidebarHeader>
			)}
			<SidebarContent className={open ? "" : "pt-4"}>
				<SidebarMenu>
					<SidebarMenuItem>
						<Link href="/dashboard">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/dashboard"}
								tooltip="ダッシュボード"
							>
								<div className={open ? "" : "flex justify-center"}>
									<LayoutDashboard className="h-5 w-5" />
									<span>ダッシュボード</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/employees">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/employees"}
								tooltip="従業員管理"
							>
								<div className={open ? "" : "flex justify-center"}>
									<Users className="h-5 w-5" />
									<span>従業員管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/departments">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/departments"}
								tooltip="部署管理"
							>
								<div className={open ? "" : "flex justify-center"}>
									<Building2 className="h-5 w-5" />
									<span>部署管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/positions">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/positions"}
								tooltip="役職管理"
							>
								<div className={open ? "" : "flex justify-center"}>
									<Briefcase className="h-5 w-5" />
									<span>役職管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/grades">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/grades"}
								tooltip="グレード管理"
							>
								<div className={open ? "" : "flex justify-center"}>
									<Award className="h-5 w-5" />
									<span>グレード管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/skills-certifications">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/skills-certifications"}
								tooltip="スキル・資格管理"
							>
								<div className={open ? "" : "flex justify-center"}>
									<BookOpenCheck className="h-5 w-5" />
									<span>スキル・資格管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
}

export function CustomSidebarTrigger({ className }: { className?: string }) {
	const { toggleSidebar, open } = useSidebar();

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleSidebar}
			className={cn("h-10 w-10 z-20", className)}
			aria-label={open ? "サイドバーを閉じる" : "サイドバーを開く"}
		>
			{open ? (
				<PanelLeftIcon className="h-5 w-5" />
			) : (
				<PanelRightIcon className="h-5 w-5" />
			)}
		</Button>
	);
}

export function MobileSidebarTrigger() {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleSidebar}
			className="md:hidden h-10 w-10 z-20"
			aria-label="モバイルメニューを開く"
		>
			<MenuIcon className="h-5 w-5" />
		</Button>
	);
}

export function DesktopSidebarTrigger() {
	return <CustomSidebarTrigger className="hidden md:flex" />;
}
