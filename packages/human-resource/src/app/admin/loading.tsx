import { Loader2Icon, LoaderIcon } from "lucide-react";

export default function Loading() {
	return (
		<div className="h-full w-full flex items-center justify-center">
			<Loader2Icon className="w-10 h-10 animate-spin" />
		</div>
	);
}
