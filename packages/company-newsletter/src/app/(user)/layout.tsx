import { createServerClient } from "@supabase/ssr";
import { HomeIcon, MessageCirclePlusIcon, PlusIcon } from "lucide-react";
import { PropsWithChildren, ReactNode, Suspense } from "react";

import { Avatar } from "@/components/avatar/avatar";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";

import { SideMenuContainer, SideMenuPresenter } from "./side-menu";
import { canPost } from "@/lib/user";

const MenuIcons = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/",
  },
];

export default function Layout({
  children,
  title,
}: PropsWithChildren<{ title: ReactNode }>) {
  return (
    <SidebarProvider
      defaultOpen={false}
      className="relative h-full overflow-hidden"
    >
      <Suspense>
        <div className="absolute bottom-14 right-4">
          <NewPostLink />
        </div>
      </Suspense>
      <div className="grid size-full grid-rows-[auto,1fr,auto] overflow-hidden">
        <header className="grid grid-cols-[auto,1fr,auto] px-8 py-4 shadow-md">
          <div className="flex items-center justify-center"></div>
          <h1 className="flex items-center justify-center text-lg font-bold">
            {title}
          </h1>
          <SidebarTrigger className="shrink-0">
            <Avatar name="test" src={""} />
          </SidebarTrigger>
        </header>
        <main className="overflow-y-scroll p-4">{children}</main>
        <footer className="border-t">
          <nav>
            <ul className="grid grid-cols-1">
              {MenuIcons.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-center"
                >
                  <Link href={item.href}>
                    <item.icon className="size-12 p-2" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </div>
      <Suspense fallback={<SideMenuPresenter skeleton />}>
        <SideMenuContainer />
      </Suspense>
    </SidebarProvider>
  );
}

async function NewPostLink() {
  if (!(await canPost())) {
    return null;
  }

  return (
    <Button
      className="size-12 rounded-full p-0 [&_svg]:size-8"
      role="img"
      aria-label="新しい投稿"
      asChild
    >
      <Link href="/posts/new">
        <PlusIcon />
      </Link>
    </Button>
  );
}
