import { getPositions } from "../_actions/position-actions";
import type { PositionSearchParams } from "../_actions/position-actions";
import { PositionsPresenter } from "./positions-presenter";

interface PositionsContainerProps {
	searchParams: PositionSearchParams;
}

export async function PositionsContainer({
	searchParams,
}: PositionsContainerProps) {
	// データ取得
	const { items: positions, pagination } = await getPositions(searchParams);

	return <PositionsPresenter positions={positions} pagination={pagination} />;
}
