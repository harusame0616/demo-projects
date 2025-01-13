import {
  AtSignIcon,
  LockKeyholeIcon,
  LogOutIcon,
  WrenchIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

import { Link } from "@/components/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserMiniProfile } from "@/components/user-mini-profile";
import { createClient } from "@/lib/supabase/server";
import { isRole } from "@/lib/user";

import { Role } from "../admin/(private)/users/role";

export async function SideMenuContainer() {
  const supabaseClient = await createClient();
  const getUserResult = await supabaseClient.auth.getUser();
  if (getUserResult.error || !getUserResult.data) {
    redirect("/admin/login");
  }

  const name = getUserResult.data.user.user_metadata.name;
  const email = getUserResult.data.user.email!;
  const isAdmin = await isRole(Role.Admin.value);

  return <SideMenuPresenter name={name} email={email} isAdmin={isAdmin} />;
}

export function SideMenuPresenter(
  props:
    | {
        skeleton?: false;
        email: string;
        name: string;
        isAdmin: boolean;
      }
    | { skeleton: true },
) {
  const items = [
    {
      title: "パスワード更新",
      url: "/admin/users",
      icon: LockKeyholeIcon,
    },
    {
      title: "メールアドレス更新",
      url: "/admin/users",
      icon: AtSignIcon,
    },
    ...(props.skeleton !== true && props.isAdmin
      ? [
          {
            title: "管理画面",
            url: "/admin",
            icon: WrenchIcon,
          },
        ]
      : []),
    { title: "ログアウト", url: "/admin/users", icon: LogOutIcon },
  ];

  return (
    <Sidebar side="right">
      <SidebarHeader>
        {props.skeleton ? (
          <UserMiniProfile skeleton />
        ) : (
          <UserMiniProfile name={props.name} email={props.email} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menus</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="no-underline">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex justify-stretch">
        <SidebarTrigger className="w-full" variant="outline">
          閉じる
        </SidebarTrigger>
      </SidebarFooter>
    </Sidebar>
  );
}
