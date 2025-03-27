import { SearchFormPresenter } from "./search-form-presenter";

interface SearchFormContainerProps {
	defaultQuery: string;
}

export async function SearchFormContainer({
	defaultQuery,
}: SearchFormContainerProps) {
	return <SearchFormPresenter defaultQuery={defaultQuery} />;
}
