import { Avatar, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type UserMiniProfileProps =
	| { skeleton?: false; name: string; email: string }
	| { skeleton: true };
export function UserMiniProfile(props: UserMiniProfileProps) {
	return (
		<div className="grid grid-cols-[auto_1fr] items-center gap-2">
			<Avatar>
				{/* <Image src="" alt={""} /> */}
				<AvatarFallback>
					{props.skeleton ? "" : props.name?.at(0) || ""}
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
