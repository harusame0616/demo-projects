import type { Metadata } from "next";

import SendMessagePage from "@/app/(message-layout)/send-message-page";
import { createPage } from "@/lib/next-file/page";

export const metadata: Metadata = {
	title: "リセットメール送信完了",
};

export default createPage(() => (
	<SendMessagePage
		title="リセットメールを送信しました"
		message="メールに記載されたURLをクリックして新しいパスワードに更新してください。"
	/>
));
