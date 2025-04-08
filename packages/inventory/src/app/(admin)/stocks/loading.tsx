import { PageHeader } from "@/components/common/page-header";
import { SearchFormPresenter } from "./_search-form";
import { StocksSkeleton } from "./_stocks";

export default function Loading() {
	return (
		<>
			<PageHeader title="在庫一覧" />
			<SearchFormPresenter
				searchQuery={{
					keyword: "",
					notInventoried: "",
				}}
			/>
			<StocksSkeleton />
		</>
	);
}
