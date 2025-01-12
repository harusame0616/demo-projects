import { FileIcon, FileX2Icon } from "lucide-react";

import { Link } from "@/components/link";

type Props =
  | {
      fileName: string;
      url: string;
      brokenLink?: false;
    }
  | {
      fileName: string;
      brokenLink: true;
    };
export async function AttachmentPresenter(props: Props) {
  return props.brokenLink ? (
    <div className="flex items-center gap-1">
      <FileX2Icon className="size-4" aria-hidden />
      {props.fileName}
    </div>
  ) : (
    <Link href={props.url} className="flex items-center gap-1" prefetch={false}>
      <FileIcon className="size-4" aria-hidden />
      {props.fileName}
    </Link>
  );
}
