"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser } from "../../_actions/user-actions";
import { UserForm } from "../../_components/user-form";

interface UserFormWrapperProps {
	roleOptions: { id: string; name: string }[];
	statusOptions: { id: string; name: string }[];
	employeeOptions: { id: string; name: string }[];
}

export function UserFormWrapper({
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
			await createUser({
				email: values.email,
				role: values.role as "admin" | "user",
				status: values.status as "active" | "inactive",
				employeeId: values.employeeId,
				lastLogin: null,
			});

			toast.success("ユーザーを登録しました");
			router.push("/admin/users");
		} catch (error) {
			console.error("ユーザーの登録に失敗しました", error);
			toast.error("ユーザーの登録に失敗しました");
		}
	};

	return (
		<UserForm
			roleOptions={roleOptions}
			statusOptions={statusOptions}
			employeeOptions={employeeOptions}
			onSubmit={handleSubmit}
		/>
	);
}
