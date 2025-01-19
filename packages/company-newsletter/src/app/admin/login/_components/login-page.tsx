import { DemoDescription } from "@/app/demo-description";

import { LoginCard } from "./login-card";

export function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="max-h-[120px] grow" />
      <div className="w-full max-w-sm">
        <LoginCard />
      </div>
      <DemoDescription />
    </div>
  );
}
