import { AtSignIcon, LockKeyholeIcon, LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { Link } from "@/components/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Skeleton } from "@/components/ui/skeleton";
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
    <Sidebar>
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
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}

type UserMiniProfileProps =
  | { skeleton?: false; name: string; email: string }
  | { skeleton: true };
function UserMiniProfile(props: UserMiniProfileProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
      <Avatar>
        {/* <Image src="" alt={""} /> */}
        <AvatarFallback>
          {props.skeleton ? "" : props.name.at(0)}
        </AvatarFallback>
      </Avatar>
      <div className="grid grid-rows-2 font-normal">
        <div className="truncate ">
          {props.skeleton ? <Skeleton className="my-1 h-4 w-12" /> : props.name}
        </div>
        <div className="truncate text-muted-foreground">
          {props.skeleton ? (
            <Skeleton className="my-1 h-4 w-24" />
          ) : (
            props.email
          )}
        </div>
      </div>
    </div>
  );
}
