interface PageHeaderProps {
	title: string;
	operations?: React.ReactNode[];
}

export function PageHeader({ title, operations }: PageHeaderProps) {
	return (
		<header className="flex justify-between items-center h-9">
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			{operations && operations.length > 0 && (
				<div className="flex gap-2">{operations}</div>
			)}
		</header>
	);
}
