import { HomeIcon } from "lucide-react";
import { PropsWithChildren, Suspense } from "react";

import { Avatar } from "@/components/avatar/avatar";
import { Link } from "@/components/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { NewPostDrawer } from "./new-post-drawer";
import { SideMenuContainer, SideMenuPresenter } from "./side-menu";

const MenuIcons = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "About",
    icon: HomeIcon,
    href: "/about",
  },
  {
    name: "Contac1t",
    icon: HomeIcon,
    href: "/contact",
  },
  {
    name: "Contacr2t",
    icon: HomeIcon,
    href: "/contact",
  },
  {
    name: "Contact3",
    icon: HomeIcon,
    href: "/contact",
  },
];

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen={false} className="h-full overflow-hidden">
      <Suspense fallback={<SideMenuPresenter skeleton />}>
        <SideMenuContainer />
      </Suspense>
      <div className="grid size-full grid-rows-[auto,1fr,auto] overflow-hidden">
        <header className="grid grid-cols-[auto,1fr,auto] p-4 shadow-md">
          <div className="flex items-center justify-center">
            <SidebarTrigger className="shrink-0">
              <Avatar name="test" src={""} alt={""} />
            </SidebarTrigger>
          </div>
          <div className="text-center align-middle">App Name</div>
          <div className="size-[36px]">
            <NewPostDrawer />
          </div>
        </header>
        <main className="overflow-y-scroll">{children}</main>
        <footer className="shadow-md">
          <nav>
            <ul className="grid grid-cols-5">
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
    </SidebarProvider>
  );
}
