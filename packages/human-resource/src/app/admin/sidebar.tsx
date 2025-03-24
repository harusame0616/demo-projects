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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
	const pathname = usePathname();
	const { open } = useSidebar();

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader className="flex items-center">
				<div className="flex gap-2 w-full items-center">
					{open && <h2 className="text-xl font-bold px-4 py-2">メニュー</h2>}
					<SidebarTrigger />
				</div>
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<Link href="/admin/dashboard">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/admin/dashboard"}
								tooltip="ダッシュボード"
							>
								<div>
									<LayoutDashboard className="h-5 w-5" />
									<span>ダッシュボード</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/admin/employees">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/admin/employees"}
								tooltip="従業員管理"
							>
								<div>
									<Users className="h-5 w-5" />
									<span>従業員管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/admin/departments">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/admin/departments"}
								tooltip="部署管理"
							>
								<div>
									<Building2 className="h-5 w-5" />
									<span>部署管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/admin/positions">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/admin/positions"}
								tooltip="役職管理"
							>
								<div>
									<Briefcase className="h-5 w-5" />
									<span>役職管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/admin/grades">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/admin/grades"}
								tooltip="グレード管理"
							>
								<div>
									<Award className="h-5 w-5" />
									<span>グレード管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href="/admin/skills-certifications">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/admin/skills-certifications"}
								tooltip="スキル・資格管理"
							>
								<div>
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
