import { HomeIcon, MessageCirclePlusIcon } from "lucide-react";
import { PropsWithChildren, ReactNode, Suspense } from "react";

import { Avatar } from "@/components/avatar/avatar";
import { Link } from "@/components/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { SideMenuContainer, SideMenuPresenter } from "./side-menu";

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
    <SidebarProvider defaultOpen={false} className="h-full overflow-hidden">
      <div className="grid size-full grid-rows-[auto,1fr,auto] overflow-hidden">
        <header className="grid grid-cols-[auto,1fr,auto] px-8 py-4 shadow-md">
          <div className="flex items-center justify-center">
            <Link href="/posts/new">
              <MessageCirclePlusIcon role="img" aria-label="新しい投稿" />
            </Link>
          </div>
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
