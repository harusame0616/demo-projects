import { PageHeader } from "@/components/common/page-header";
import { getDepartments, getPositions } from "../_actions/employee-actions";
import { EmployeeFormWrapper } from "./_components/employee-form-wrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "従業員登録 | 人材管理システム",
	description: "新しい従業員情報を登録します",
};

export default async function NewEmployeePage() {
	// サーバーサイドで部署と役職のオプションを取得
	const departmentOptions = await getDepartments();
	const positionOptions = await getPositions();

	return (
		<>
			<PageHeader title="従業員新規登録" />
			<EmployeeFormWrapper
				departmentOptions={departmentOptions}
				positionOptions={positionOptions}
			/>
		</>
	);
}
