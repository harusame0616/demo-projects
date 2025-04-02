import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchFormPresenter } from "./_search-form";
import { UsersSkeleton } from "./_users";

export default function Loading() {
	return (
		<>
			<PageHeader
				title="ユーザー一覧"
				operations={[
					<Button key="new-user" asChild variant="outline">
						<Link href="/admin/users/new">新規作成</Link>
					</Button>,
				]}
			/>
			<SearchFormPresenter
				searchQuery={{
					query: "",
					role: "all",
					status: "all",
				}}
			/>
			<UsersSkeleton />
		</>
	);
}
