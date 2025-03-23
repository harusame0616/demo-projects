import { HomeIcon, PlusIcon } from "lucide-react";
import { type PropsWithChildren, type ReactNode, Suspense } from "react";

import { Avatar } from "@/components/avatar/avatar";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { canPost, isRole } from "@/lib/user";

import { Role } from "../admin/(private)/users/role";
import { SideMenuContainer, SideMenuPresenter } from "./side-menu";

const MenuIcons = [
	{
		name: "Home",
		icon: HomeIcon,
		href: "/",
	},
];

interface LayoutProps {
	children: ReactNode;
	title: ReactNode;
}

export default function Layout({ children, title }: LayoutProps) {
	return (
		<SidebarProvider
			defaultOpen={false}
			className="relative h-full overflow-hidden"
		>
			<Suspense>
				<div className="absolute bottom-14 right-4">
					<NewPostLinkContainer />
				</div>
			</Suspense>
			<div className="grid size-full grid-rows-[auto,1fr,auto] overflow-hidden">
				<header className="grid grid-cols-[1fr,auto,1fr] px-8 py-4 shadow-md">
					<div className="flex items-center justify-center" />
					<h1 className="flex items-center justify-center text-lg font-bold">
						{title}
					</h1>
					<div className="flex justify-end">
						<SidebarTrigger>
							<Avatar name="test" src={""} />
						</SidebarTrigger>
					</div>
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

async function NewPostLinkContainer() {
	if (!(await canPost()) && !(await isRole(Role.Admin.value))) {
		return null;
	}

	return <NewPostLinkPresenter />;
}

function NewPostLinkPresenter() {
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
