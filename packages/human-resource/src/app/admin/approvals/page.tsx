import { redirect } from "next/navigation";

export default function ApprovalsPage() {
	// 申請管理画面にリダイレクト
	redirect("/admin/applications");
}
