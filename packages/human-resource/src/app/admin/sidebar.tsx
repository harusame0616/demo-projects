"use client";

import { cn } from "@/lib/utils";
import {
	Award,
	BookOpenCheck,
	Briefcase,
	Building2,
	ClipboardCheck,
	LayoutDashboard,
	MenuIcon,
	PanelLeftIcon,
	PanelRightIcon,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
					<SidebarMenuItem>
						<Link href="/admin/approvals">
							<SidebarMenuButton
								asChild
								isActive={pathname === "/admin/approvals"}
								tooltip="承認管理"
							>
								<div>
									<ClipboardCheck className="h-5 w-5" />
									<span>承認管理</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
}
