import { FileIcon } from "lucide-react";

import { Link } from "@/components/link";

type Props = {
  path: string;
  url: string;
};
export async function AttachmentPresenter({ path, url }: Props) {
  return (
    <Link href={url} className="flex items-center gap-1" prefetch={false} >
      <FileIcon className="size-4" />
      {path.split("/")[1]}
    </Link>
  );
}
