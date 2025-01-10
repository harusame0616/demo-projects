import { AtSignIcon, LockKeyholeIcon, LogOutIcon } from "lucide-react";
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
  { title: "ログアウト", url: "/admin/users", icon: LogOutIcon },
];

export async function SideMenuContainer() {
  const supabaseClient = await createClient();
  const getUserResult = await supabaseClient.auth.getUser();
  if (getUserResult.error || !getUserResult.data) {
    redirect("/admin/login");
  }

  const name = getUserResult.data.user.user_metadata.name;
  const email = getUserResult.data.user.email!;

  return <SideMenuPresenter name={name} email={email} />;
}

export function SideMenuPresenter(
  props:
    | {
        skeleton?: false;
        email: string;
        name: string;
      }
    | { skeleton: true },
) {
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
