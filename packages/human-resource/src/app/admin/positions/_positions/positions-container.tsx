import { getPositions } from "../_actions/position-actions";
import { PositionsPresenter } from "./positions-presenter";

type Props = Parameters<typeof getPositions>[0];

export async function PositionsContainer(props: Props) {
	const { items: positions, pagination } = await getPositions(props);

	return (
		<PositionsPresenter
			positions={positions}
			pagination={pagination}
			order={props.order}
		/>
	);
}
