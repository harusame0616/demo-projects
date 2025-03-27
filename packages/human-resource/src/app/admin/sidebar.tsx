"use client";

import { cn } from "@/lib/utils";
import {
	Award,
	BadgeCheck,
	BookOpenCheck,
	Briefcase,
	Building2,
	ClipboardCheck,
	Clock,
	LayoutDashboard,
	LogOut,
	MenuIcon,
	PanelLeftIcon,
	PanelRightIcon,
	UserCog,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const MENU_ITEMS = [
	{
		href: "/admin/employees",
		label: "従業員管理",
		icon: Users,
	},
	{
		href: "/admin/users",
		label: "ユーザー管理",
		icon: UserCog,
	},
	{
		href: "/admin/attendances",
		label: "勤怠集計",
		icon: Clock,
	},
	{
		href: "/admin/departments",
		label: "部署管理",
		icon: Building2,
	},
	{
		href: "/admin/positions",
		label: "役職管理",
		icon: Briefcase,
	},
	{
		href: "/admin/grades",
		label: "グレード管理",
		icon: Award,
	},
	{
		href: "/admin/skills",
		label: "スキル管理",
		icon: BookOpenCheck,
	},
	{
		href: "/admin/certifications",
		label: "資格管理",
		icon: BadgeCheck,
	},
	{
		href: "/admin/applications",
		label: "申請管理",
		icon: ClipboardCheck,
	},
] as const;

export function AppSidebar() {
	const pathname = usePathname();
	const { open } = useSidebar();

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader className="flex items-center">
				<div className="flex gap-2 w-full items-center justify-between">
					{open && <h2 className="text-xl font-bold px-4 py-2">メニュー</h2>}
					<SidebarTrigger />
				</div>
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<SidebarMenu>
					{MENU_ITEMS.map((item) => (
						<SidebarMenuItem key={item.href}>
							<Link href={item.href}>
								<SidebarMenuButton
									asChild
									isActive={pathname === item.href}
									tooltip={item.label}
									className="h-10"
								>
									<div>
										<item.icon className="h-5 w-5" />
										<span>{item.label}</span>
									</div>
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="mt-auto">
				<SidebarMenu>
					<SidebarMenuItem>
						<Link href="/login">
							<SidebarMenuButton asChild tooltip="ログアウト">
								<div>
									<LogOut className="h-5 w-5" />
									<span>ログアウト</span>
								</div>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
