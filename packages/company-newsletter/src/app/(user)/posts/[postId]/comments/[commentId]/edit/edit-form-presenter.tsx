"use client";

import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

import { CommentInputForm } from "../../new/comment-input-form";

export default function EditFormPresenter(
  props: ComponentProps<typeof CommentInputForm>,
) {
  const router = useRouter();

  return <CommentInputForm {...props} onSuccess={() => router.back()} />;
}
