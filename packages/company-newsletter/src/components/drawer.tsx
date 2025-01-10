import { PropsWithChildren, useState } from "react";

import { LikeDto } from "@/app/(user)/_data/posts";
import { Button } from "@/components/ui/button";
import {
  Drawer as ShadcnDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = {
  likes: LikeDto[];
  triggerLabel: string;
  title: string;
};
export function Drawer({
  title,
  triggerLabel,
  children,
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);

  return (
    <ShadcnDrawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <div className="px-2">{triggerLabel}</div>
      </DrawerTrigger>
      <DrawerContent className="grid h-full grid-rows-[auto,auto,1fr,auto] overflow-hidden">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto p-4">{children}</div>
        <DrawerFooter className="flex flex-row justify-end">
          <DrawerClose>
            <Button variant="outline">閉じる</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </ShadcnDrawer>
  );
}
