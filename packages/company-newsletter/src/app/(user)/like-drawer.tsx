import { useState } from "react";

import { LikeDto } from "@/app/(user)/_data/posts";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Likes } from "./likes";

type Props = {
  likes: LikeDto[];
  triggerLabel: string;
};
export function LikesDrawer({ likes, triggerLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <div className="px-2">{triggerLabel}</div>
      </DrawerTrigger>
      <DrawerContent className="grid h-full grid-rows-[auto,auto,1fr,auto] overflow-hidden">
        <DrawerHeader>
          <DrawerTitle>いいね</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto p-4">
          <Likes likes={likes} />
        </div>
        <DrawerFooter className="flex flex-row justify-end">
          <DrawerClose>
            <Button variant="outline">閉じる</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
