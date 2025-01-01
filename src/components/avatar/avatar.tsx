import Image from "next/image";
import { ComponentProps } from "react";

import { Skeleton } from "../ui/skeleton";
import UserImage from "./user.png";

type Props = {
  skeleton?: boolean;
  name: string;
};

export function Avatar({
  name,
  skeleton,
  ...props
}: Props & ComponentProps<typeof Image>) {
  return skeleton ? (
    <Skeleton className="size-8 rounded-full" />
  ) : (
    <Image
      {...props}
      alt={props.alt ?? name}
      width={32}
      height={32}
      src={UserImage}
      className="rounded-full"
    />
  );
}
