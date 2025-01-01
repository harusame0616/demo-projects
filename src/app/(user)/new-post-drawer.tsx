"use client";

import { MessageCirclePlus } from "lucide-react";
import { useId, useState } from "react";

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

import { postNewPostAction } from "./_actions/post-new-post";
import { usePosts } from "./_hooks/use-posts";
import { PostInputForm } from "./post-input-form";

export function NewPostDrawer() {
  const [open, setOpen] = useState(false);
  const formId = useId();

  const { mutate } = usePosts();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <MessageCirclePlus />
      </DrawerTrigger>
      <DrawerContent className="grid h-full grid-rows-[auto,auto,1fr,auto] overflow-hidden">
        <DrawerHeader>
          <DrawerTitle>新しい投稿</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto p-4">
          <PostInputForm
            formId={formId}
            action={postNewPostAction}
            onSuccess={() => {
              setOpen(false);
              mutate();
            }}
          />
        </div>
        <DrawerFooter className="flex flex-row justify-end">
          <DrawerClose>
            <Button variant="outline">キャンセル</Button>
          </DrawerClose>
          <Button form={formId}>投稿する</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
