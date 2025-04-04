import { PageHeader } from "@/components/common/page-header";
import { AttendancesSkeleton } from "./_attendances/attendances-skeleton";
import { SearchFormPresenter } from "./_search-form/search-form-presenter";

export default function Loading() {
	return (
		<>
			<PageHeader title="勤怠情報" />

			<div className="flex flex-col space-y-6">
				<SearchFormPresenter defaultValues={{}} departments={[]} />

				<AttendancesSkeleton />
			</div>
		</>
	);
}
