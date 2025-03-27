interface PageHeaderProps {
	heading: string;
}

export function PageHeader({ heading }: PageHeaderProps) {
	return <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>;
}
