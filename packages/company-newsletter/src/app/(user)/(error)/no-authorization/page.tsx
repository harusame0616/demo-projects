import { LockKeyholeIcon } from "lucide-react";

export default function NoAuthorization() {
  return (
    <h1 className="flex flex-col items-center gap-2 text-lg font-bold text-muted-foreground">
      <LockKeyholeIcon className="size-16" />
      権限がありません
    </h1>
  );
}
