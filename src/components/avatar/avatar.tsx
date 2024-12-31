import Image from "next/image";
import { ComponentProps } from "react";

import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

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
  return (
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
