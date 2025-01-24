import { Metadata } from "next";

import { LogoutPage } from "@/app/admin/(private)/logout/logout-page";

export const metadata: Metadata = {
  title: "ログアウト",
};

export default function NextPage() {
  return <LogoutPage />;
}
