import { getDepartments } from "../_actions/department-actions";
import { SearchFormPresenter } from "./search-form-presenter";

interface Department {
	id: string;
	name: string;
}

interface SearchFormValues {
	query?: string;
	departmentId?: string;
	startDate?: string;
	endDate?: string;
	startYearMonth?: string;
	endYearMonth?: string;
	page?: string;
}

interface SearchFormContainerProps {
	searchParams: {
		query?: string;
		departmentId?: string;
		startDate?: string;
		endDate?: string;
		page?: string;
	};
}

export async function SearchFormContainer({
	searchParams,
}: SearchFormContainerProps) {
	let departments: Department[] = [];
	try {
		departments = await getDepartments();
	} catch (error) {
		console.error("部署データの取得に失敗しました:", error);
		// エラーが発生した場合は空の配列のままにする
	}

	// 日付をYYYY-MM形式に変換
	const formatDateToYearMonth = (dateString?: string) => {
		if (!dateString) return "";
		return dateString.substring(0, 7); // YYYY-MM-DD → YYYY-MM
	};

	// 検索フォームの初期値を設定
	const defaultValues = {
		query: searchParams.query || "",
		departmentId: searchParams.departmentId || "all",
		startYearMonth: formatDateToYearMonth(searchParams.startDate),
		endYearMonth: formatDateToYearMonth(searchParams.endDate),
	};

	return (
		<SearchFormPresenter
			departments={departments}
			defaultValues={defaultValues}
			isLoading={false}
		/>
	);
}
