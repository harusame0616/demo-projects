import EditFormContainer from "./edit-form-container";

type Props = {
	postId: string;
};
export default async function PostEditionPage({ postId }: Props) {
	return <EditFormContainer postId={postId} />;
}
