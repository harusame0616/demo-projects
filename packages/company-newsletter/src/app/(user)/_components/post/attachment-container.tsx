import { createClientServiceRole } from "@/lib/supabase/service-role";

import { AttachmentPresenter } from "./attachment-presenter";

type Props = {
  path: string;
};
export async function AttachmentContainer({ path }: Props) {
  const client = createClientServiceRole();

  const getPublicUrlResult = await client.storage
    .from("attachments")
    .createSignedUrl(path, 60 * 60 * 24 * 7);

  if (getPublicUrlResult.error) {
    return <div>ファイルの取得に失敗しました</div>;
  }

  return (
    <AttachmentPresenter path={path} url={getPublicUrlResult.data.signedUrl} />
  );
}
