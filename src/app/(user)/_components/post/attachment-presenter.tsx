import { FileIcon } from "lucide-react";

type Props = {
  path: string;
  url: string;
};
export async function AttachmentPresenter({ path, url }: Props) {
  return (
    <a href={url} className="flex items-center gap-1 underline-offset-1">
      <FileIcon className="size-4" />
      {path}
    </a>
  );
}
