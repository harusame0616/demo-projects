"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserForm } from "../../_edit-form/user-form";
import { createUser } from "../_actions/create-user";

export function UserFormWrapper() {
	const router = useRouter();

	const handleSubmit = async (values: {
		name: string;
		email: string;
		role: string;
	}) => {
		try {
			await createUser({
				name: values.name,
				email: values.email,
				role: values.role as "admin" | "user",
			});

			toast.success("ユーザーを登録しました");
			router.push("/admin/users");
		} catch (error) {
			console.error("ユーザーの登録に失敗しました", error);
			toast.error("ユーザーの登録に失敗しました");
		}
	};

	return <UserForm onSubmit={handleSubmit} />;
}
