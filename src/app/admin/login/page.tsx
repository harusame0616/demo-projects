import { Metadata } from "next";

import { createPage } from "@/lib/next-file/page";

import { LoginCard } from "./_components/login-card";

export const metadata: Metadata = {
  title: "ログイン",
};

export default createPage(function () {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="max-h-[120px] grow" />
      <div className="w-full max-w-sm">
        <LoginCard />
      </div>
    </div>
  );
});
