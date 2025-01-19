import { Metadata } from "next";

import { DemoDescription } from "@/app/demo-description";

import { LoginCard } from "./login-card";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function Page() {
  return (
    <>
      <LoginCard />
      <div className="py-4">
        <DemoDescription />
      </div>
    </>
  );
}
