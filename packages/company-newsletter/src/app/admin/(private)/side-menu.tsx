import {
  AtSign,
  ChevronsUpDownIcon,
  LockKeyholeIcon,
  LogOutIcon,
  User,
} from "lucide-react";
import { redirect } from "next/navigation";

import { Link } from "@/components/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/sidebar";
import { UserMiniProfile } from "@/components/user-mini-profile";
import { createClient } from "@/lib/supabase/server";

const items = [
  {
    title: "ユーザー一覧",
    url: "/admin/users",
    icon: User,
  },
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
    <Sidebar>
      <SidebarHeader>Admin</SidebarHeader>
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
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="grid grid-cols-[1fr_auto] items-center">
              {props.skeleton ? (
                <UserMiniProfile skeleton />
              ) : (
                <UserMiniProfile name={props.name} email={props.email} />
              )}
              <ChevronsUpDownIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mb-2 ml-1 max-w-64" side="right">
            <DropdownMenuLabel>
              {props.skeleton ? (
                <UserMiniProfile skeleton />
              ) : (
                <UserMiniProfile name={props.name} email={props.email} />
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LockKeyholeIcon />
              パスワード更新
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AtSign />
              メールアドレス更新
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/admin/logout">
              <DropdownMenuItem>
                <LogOutIcon />
                ログアウト
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
