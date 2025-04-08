"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserForm } from "../../../_edit-form/user-form";
import { editUser } from "../_actions/edit-user";

interface UserFormWrapperProps {
	user: {
		userId: string;
		name: string;
		email: string;
		role: string;
	};
}

export function UserFormWrapper({ user }: UserFormWrapperProps) {
	const router = useRouter();

	const handleSubmit = async ({
		name,
		email,
		role,
	}: {
		name: string;
		email: string;
		role: string;
	}) => {
		try {
			await editUser(user.userId, {
				name,
				email,
				role: role as "admin" | "user",
			});

			toast.success("ユーザー情報を更新しました");
			router.push("/users");
		} catch (error) {
			console.error("ユーザー情報の更新に失敗しました", error);
			toast.error("ユーザー情報の更新に失敗しました");
		}
	};

	return <UserForm user={user} onSubmit={handleSubmit} />;
}
