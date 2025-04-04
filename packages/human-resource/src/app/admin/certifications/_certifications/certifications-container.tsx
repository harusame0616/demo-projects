import { getCertifications } from "../_actions/certification-actions";
import { CertificationsPresenter } from "./certifications-presenter";

type Props = Parameters<typeof getCertifications>[0];

export async function CertificationsContainer(props: Props) {
	const { items, pagination } = await getCertifications(props);

	return (
		<CertificationsPresenter
			certifications={items}
			pagination={pagination}
			order={props.order}
		/>
	);
}
