"use client";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";

import { deleteCommentAction } from "./delete-post";

type Props = {
  commentId: string;
};
export function DeleteButton(props: Props) {
  const [deletionDialog, setDeletionDialog] = useState(false);
  const router = useRouter();

  return (
    <>
      <AlertDialog
        title="コメント削除"
        description={`コメントを削除しますがよろしいですか？`}
        primaryButtonLabel={"削除する"}
        open={deletionDialog}
        onOpenChange={setDeletionDialog}
        onPrimaryButtonClick={async () => {
          await deleteCommentAction(props);
          router.refresh();
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setDeletionDialog(true)}
        type="button"
      >
        <TrashIcon />
      </Button>
    </>
  );
}
