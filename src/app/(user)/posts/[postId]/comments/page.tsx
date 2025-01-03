import { CommentsPage } from "./_components/comments-page";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default function NextPage({ searchParams }: Props) {
  return <CommentsPage page={1} />;
}
