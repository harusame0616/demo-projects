import {
	BadgeIcon,
	BuildingIcon,
	CalendarIcon,
	UserIcon,
	UserRoundIcon,
} from "lucide-react";

type Employee = {
	id: string;
	name: string;
	nameKana: string;
	department: string;
	position: string;
	grade?: string;
	joinDate: string;
};

type ProfileHeaderProps = {
	employee: Employee;
};

export function ProfileHeader({ employee }: ProfileHeaderProps) {
	return (
		<div className="mb-8">
			<div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-8">
				<div className="mx-auto max-w-4xl">
					<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
						<div>
							<p className="text-lg text-muted-foreground mb-0.5">
								{employee.nameKana}
							</p>
							<h1 className="text-4xl font-bold mb-3">{employee.name}</h1>

							<div className="flex flex-wrap gap-2 mb-4">
								<div className="bg-background/90 text-foreground rounded-md px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
									<BuildingIcon className="h-3.5 w-3.5 text-primary" />
									<span className="font-medium">{employee.department}</span>
								</div>
								<div className="bg-background/90 text-foreground rounded-md px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
									<UserRoundIcon className="h-3.5 w-3.5 text-primary" />
									<span className="font-medium">{employee.position}</span>
								</div>
								{employee.grade && (
									<div className="bg-background/90 text-foreground rounded-md px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
										<BadgeIcon className="h-3.5 w-3.5 text-primary" />
										<span className="font-medium">{employee.grade}</span>
									</div>
								)}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-6 md:text-right">
							<div>
								<p className="text-sm font-medium text-muted-foreground mb-1 flex items-center md:justify-end gap-1.5">
									<UserIcon className="h-3.5 w-3.5" />
									社員ID
								</p>
								<p className="text-2xl font-semibold">{employee.id}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground mb-1 flex items-center md:justify-end gap-1.5">
									<CalendarIcon className="h-3.5 w-3.5" />
									入社日
								</p>
								<p className="text-2xl font-semibold">{employee.joinDate}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
