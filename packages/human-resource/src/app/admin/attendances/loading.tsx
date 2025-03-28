import { AttendancesSkeleton } from "./_components/attendances-skeleton";
import { SearchFormPresenter } from "./_components/search-form-presenter";

export default function Loading() {
	return (
		<div className="space-y-4">
			<header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<h1 className="text-2xl font-bold tracking-tight h-9">勤怠情報</h1>
			</header>

			<div className="flex flex-col space-y-6">
				<SearchFormPresenter defaultValues={{}} departments={[]} />

				<AttendancesSkeleton />
			</div>
		</div>
	);
}
