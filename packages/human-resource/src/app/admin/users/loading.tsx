import { PageHeader } from "@/components/common/page-header";
import { SearchFormPresenter } from "./_components/search-form-presenter";
import { UsersSkeleton } from "./_components/users-skeleton";

export default function Loading() {
	return (
		<>
			<PageHeader title="ユーザー一覧" />

			<SearchFormPresenter />

			<UsersSkeleton />
		</>
	);
}
