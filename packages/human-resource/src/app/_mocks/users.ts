// ユーザーの役割
export type UserRole = "admin" | "user";

// ユーザーステータス
export type UserStatus = "active" | "inactive";

// ユーザー情報の型定義
export interface User {
	id: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	employeeId: string | null; // 従業員ID (紐づいていない場合はnull)
	lastLogin: string | null;
	createdAt: string;
	updatedAt: string;
}

// ユーザーの権限情報
export interface UserPermission {
	id: string;
	name: string;
	description: string;
}

// モックユーザーデータ
export const mockUsers: User[] = [
	{
		id: "001",
		email: "admin@example.com",
		role: "admin",
		status: "active",
		employeeId: "001", // 山田 太郎
		lastLogin: "2023-03-25T10:30:00Z",
		createdAt: "2023-01-01T00:00:00Z",
		updatedAt: "2023-01-01T00:00:00Z",
	},
	{
		id: "002",
		email: "manager1@example.com",
		role: "admin",
		status: "active",
		employeeId: "002", // 佐藤 花子
		lastLogin: "2023-03-24T15:45:00Z",
		createdAt: "2023-01-02T00:00:00Z",
		updatedAt: "2023-01-02T00:00:00Z",
	},
	{
		id: "003",
		email: "manager2@example.com",
		role: "admin",
		status: "active",
		employeeId: "003", // 鈴木 一郎
		lastLogin: "2023-03-23T09:15:00Z",
		createdAt: "2023-01-03T00:00:00Z",
		updatedAt: "2023-01-03T00:00:00Z",
	},
	{
		id: "004",
		email: "user1@example.com",
		role: "user",
		status: "active",
		employeeId: "004", // 田中 美咲
		lastLogin: "2023-03-22T11:20:00Z",
		createdAt: "2023-01-04T00:00:00Z",
		updatedAt: "2023-01-04T00:00:00Z",
	},
	{
		id: "005",
		email: "user2@example.com",
		role: "user",
		status: "inactive",
		employeeId: "005", // 伊藤 健太
		lastLogin: "2023-03-10T08:30:00Z",
		createdAt: "2023-01-05T00:00:00Z",
		updatedAt: "2023-03-15T00:00:00Z",
	},
	{
		id: "006",
		email: "external1@example.com",
		role: "user",
		status: "active",
		employeeId: null, // 従業員と紐づいていない
		lastLogin: null,
		createdAt: "2023-03-20T00:00:00Z",
		updatedAt: "2023-03-20T00:00:00Z",
	},
	{
		id: "007",
		email: "external2@example.com",
		role: "user",
		status: "active",
		employeeId: null, // 従業員と紐づいていない
		lastLogin: "2023-03-21T14:10:00Z",
		createdAt: "2023-02-01T00:00:00Z",
		updatedAt: "2023-02-01T00:00:00Z",
	},
	{
		id: "008",
		email: "admin2@example.com",
		role: "admin",
		status: "active",
		employeeId: null, // 従業員と紐づいていない
		lastLogin: "2023-03-24T16:45:00Z",
		createdAt: "2023-02-10T00:00:00Z",
		updatedAt: "2023-02-10T00:00:00Z",
	},
	{
		id: "009",
		email: "user5@example.com",
		role: "user",
		status: "inactive",
		employeeId: null, // 従業員と紐づいていない
		lastLogin: "2023-02-28T09:30:00Z",
		createdAt: "2023-02-15T00:00:00Z",
		updatedAt: "2023-03-01T00:00:00Z",
	},
	{
		id: "010",
		email: "user6@example.com",
		role: "user",
		status: "inactive",
		employeeId: "006", // 中村 真由美
		lastLogin: null,
		createdAt: "2023-03-18T00:00:00Z",
		updatedAt: "2023-03-18T00:00:00Z",
	},
	{
		id: "011",
		email: "suzuki.ichiro@example.com",
		role: "admin",
		status: "active",
		employeeId: "003", // 鈴木 一郎（重複）
		lastLogin: "2023-03-26T08:15:00Z",
		createdAt: "2023-01-10T00:00:00Z",
		updatedAt: "2023-01-10T00:00:00Z",
	},
	{
		id: "012",
		email: "kobayashi.daisuke@example.com",
		role: "user",
		status: "active",
		employeeId: "007", // 小林 大輔
		lastLogin: "2023-03-20T14:30:00Z",
		createdAt: "2023-02-05T00:00:00Z",
		updatedAt: "2023-02-05T00:00:00Z",
	},
	{
		id: "013",
		email: "takahashi.megumi@example.com",
		role: "admin",
		status: "active",
		employeeId: "010", // 高橋 恵
		lastLogin: "2023-03-18T09:45:00Z",
		createdAt: "2023-01-15T00:00:00Z",
		updatedAt: "2023-01-15T00:00:00Z",
	},
	{
		id: "014",
		email: "kato.kenichi@example.com",
		role: "admin",
		status: "active",
		employeeId: "008", // 加藤 健一
		lastLogin: "2023-03-15T16:20:00Z",
		createdAt: "2023-01-20T00:00:00Z",
		updatedAt: "2023-01-20T00:00:00Z",
	},
	{
		id: "015",
		email: "kimura.takuya@example.com",
		role: "admin",
		status: "active",
		employeeId: "013", // 木村 拓也
		lastLogin: "2023-03-22T11:10:00Z",
		createdAt: "2023-02-01T00:00:00Z",
		updatedAt: "2023-02-01T00:00:00Z",
	},
];

// 権限一覧
export const userRoles = [
	{ id: "admin", name: "管理者" },
	{ id: "user", name: "一般ユーザー" },
];

// ステータス一覧
export const userStatuses = [
	{ id: "active", name: "有効" },
	{ id: "inactive", name: "無効" },
];

// ユーザー権限リスト
export const userPermissions: UserPermission[] = [
	{
		id: "user_create",
		name: "ユーザー作成",
		description: "システムに新しいユーザーを追加できる権限",
	},
	{
		id: "user_read",
		name: "ユーザー閲覧",
		description: "システム内のユーザー情報を閲覧できる権限",
	},
	{
		id: "user_update",
		name: "ユーザー編集",
		description: "既存ユーザーの情報を編集できる権限",
	},
	{
		id: "user_delete",
		name: "ユーザー削除",
		description: "システムからユーザーを削除できる権限",
	},
	{
		id: "role_manage",
		name: "権限管理",
		description: "ユーザーの役割と権限を管理できる権限",
	},
];
