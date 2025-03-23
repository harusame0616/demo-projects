import type { Metadata } from "next";

import { createPage } from "@/lib/next-file/page";

import { LoginPage } from "./_components/login-page";

export const metadata: Metadata = {
	title: "ログイン",
};

export default createPage(() => <LoginPage />);
