import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Human Resource Management",
	description: "人材管理システム",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" className="[scrollbar-gutter:stable]">
			<body
				// SelectBox で選択肢を表示するなどすると data-scroll-locked が追加されてマージンが右側に追加される
				// scrollbar-gutter:stable が設定されるとデザインが崩れてしまうため、data-[scroll-locked="1"]:mr-0! を追加してマージンを削除する
				className={`${geistSans.variable} ${geistMono.variable} antialiased data-[scroll-locked="1"]:mr-0!`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
