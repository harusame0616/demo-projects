import { SearchFormPresenter } from "./search-form-presenter";
import type { ApplicationSearchParams } from "../_actions/application-actions";

interface SearchFormContainerProps {
	defaultQuery?: ApplicationSearchParams;
}

export function SearchFormContainer({
	defaultQuery,
}: SearchFormContainerProps) {
	return <SearchFormPresenter defaultQuery={defaultQuery} />;
}
