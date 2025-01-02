import { useState } from "react";

import { LikeDto } from "@/app/(user)/posts";
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
};
export function LikesDrawer({ likes }: Props) {
  const [open, setOpen] = useState(false);
  console.log(likes);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <div className="px-2">{likes.length}</div>
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
