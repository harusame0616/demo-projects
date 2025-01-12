import { decodeBase64 } from "@/lib/base64";
import { createClientServiceRole } from "@/lib/supabase/service-role";

import { AttachmentPresenter } from "./attachment-presenter";

type Props = {
  path: string;
};
export async function AttachmentContainer({ path }: Props) {
  const client = createClientServiceRole();

  const fileName = decodeBase64(path.split("/")[1]);
  const createSignedUrlResult = await client.storage
    .from("attachments")
    .createSignedUrl(path, 60 * 60 * 24 * 7, {
      download: fileName,
    });

  return createSignedUrlResult.error ? (
    <AttachmentPresenter brokenLink={true} fileName={fileName} />
  ) : (
    <AttachmentPresenter
      fileName={fileName}
      url={createSignedUrlResult.data.signedUrl}
    />
  );
}
