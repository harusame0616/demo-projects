import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "役職の新規作成 | 人材管理システム",
	description: "人材管理システムの役職新規作成ページ",
};

export default function NewPositionLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
