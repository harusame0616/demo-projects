"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUser } from "../../../_actions/user-actions";
import { UserForm } from "../../../_edit-form/user-form";

interface UserFormWrapperProps {
	user: {
		id: string;
		email: string;
		role: string;
		status: string;
		employeeId: string | null;
	};
	roleOptions: { id: string; name: string }[];
	statusOptions: { id: string; name: string }[];
	employeeOptions: { id: string; name: string }[];
}

export function UserFormWrapper({
	user,
	roleOptions,
	statusOptions,
	employeeOptions,
}: UserFormWrapperProps) {
	const router = useRouter();

	const handleSubmit = async (values: {
		id?: string;
		email: string;
		role: string;
		status: string;
		employeeId: string | null;
	}) => {
		try {
			if (!user.id) {
				throw new Error("ユーザーIDが見つかりません");
			}

			await updateUser(user.id, {
				email: values.email,
				role: values.role as "admin" | "user",
				status: values.status as "active" | "inactive",
				employeeId: values.employeeId,
			});

			toast.success("ユーザー情報を更新しました");
			router.push("/admin/users");
		} catch (error) {
			console.error("ユーザー情報の更新に失敗しました", error);
			toast.error("ユーザー情報の更新に失敗しました");
		}
	};

	return (
		<UserForm
			user={user}
			roleOptions={roleOptions}
			statusOptions={statusOptions}
			employeeOptions={employeeOptions}
			onSubmit={handleSubmit}
		/>
	);
}
