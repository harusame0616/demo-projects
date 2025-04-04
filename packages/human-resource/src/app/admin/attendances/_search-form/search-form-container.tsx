import { getDepartments } from "../_actions/department-actions";
import { SearchFormPresenter } from "./search-form-presenter";

interface Department {
	id: string;
	name: string;
}

interface SearchFormContainerProps {
	searchQuery?: string;
	departmentId?: string;
	startYearMonth?: string;
	endYearMonth?: string;
}

export async function SearchFormContainer({
	searchQuery,
	startYearMonth,
	endYearMonth,
	departmentId,
}: SearchFormContainerProps) {
	let departments: Department[] = [];
	try {
		departments = await getDepartments();
	} catch (error) {
		console.error("部署データの取得に失敗しました:", error);
		// エラーが発生した場合は空の配列のままにする
	}

	// 検索フォームの初期値を設定
	const defaultValues = {
		query: searchQuery || "",
		departmentId: departmentId || "all",
		startYearMonth: startYearMonth || "",
		endYearMonth: endYearMonth || "",
	};

	return (
		<SearchFormPresenter
			departments={departments}
			defaultValues={defaultValues}
			isLoading={false}
		/>
	);
}
