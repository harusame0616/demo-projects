import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
	title: "ダッシュボード | 人材管理システム",
	description: "人材管理システムのダッシュボード",
};

export default function DashboardPage() {
	redirect("/admin/employees");
}
