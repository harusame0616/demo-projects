"use client";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, Package, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
	{
		href: "/stocks",
		label: "在庫管理",
		icon: Package,
	},
	{
		href: "/users",
		label: "ユーザー管理",
		icon: Users,
	},
] as const;

export function AppSidebar() {
	const pathname = usePathname();
	const { open } = useSidebar();

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader className="flex items-center h-14 justify-center">
				<div className="flex gap-2 w-full items-center justify-between">
					{open && <h2 className="font-bold px-4 py-2">メニュー</h2>}
					<SidebarTrigger className="py-2" />
				</div>
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<SidebarMenu>
					{MENU_ITEMS.map((item) => (
						<SidebarMenuItem key={item.href}>
							<Link href={item.href} className="flex h-10 items-center">
								<SidebarMenuButton
									asChild
									isActive={pathname === item.href}
									tooltip={item.label}
									className="h-10"
								>
									<div>
										<item.icon className="h-5 w-5 ml-2" />
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
