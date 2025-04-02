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
	{
		id: "016",
		email: "yamamoto.kenji@example.com",
		role: "user",
		status: "active",
		employeeId: "016",
		lastLogin: "2023-03-21T13:45:00Z",
		createdAt: "2023-02-05T00:00:00Z",
		updatedAt: "2023-02-05T00:00:00Z",
	},
	{
		id: "017",
		email: "nakamura.yuki@example.com",
		role: "user",
		status: "active",
		employeeId: "017",
		lastLogin: "2023-03-20T14:30:00Z",
		createdAt: "2023-02-06T00:00:00Z",
		updatedAt: "2023-02-06T00:00:00Z",
	},
	{
		id: "018",
		email: "saito.mai@example.com",
		role: "admin",
		status: "active",
		employeeId: "018",
		lastLogin: "2023-03-19T09:15:00Z",
		createdAt: "2023-02-07T00:00:00Z",
		updatedAt: "2023-02-07T00:00:00Z",
	},
	{
		id: "019",
		email: "kondo.akira@example.com",
		role: "user",
		status: "inactive",
		employeeId: "019",
		lastLogin: null,
		createdAt: "2023-02-08T00:00:00Z",
		updatedAt: "2023-02-08T00:00:00Z",
	},
	{
		id: "020",
		email: "matsuda.rin@example.com",
		role: "user",
		status: "active",
		employeeId: "020",
		lastLogin: "2023-03-18T16:20:00Z",
		createdAt: "2023-02-09T00:00:00Z",
		updatedAt: "2023-02-09T00:00:00Z",
	},
	{
		id: "021",
		email: "abe.taro@example.com",
		role: "user",
		status: "active",
		employeeId: "021",
		lastLogin: "2023-03-17T11:30:00Z",
		createdAt: "2023-02-10T00:00:00Z",
		updatedAt: "2023-02-10T00:00:00Z",
	},
	{
		id: "022",
		email: "goto.hanako@example.com",
		role: "admin",
		status: "active",
		employeeId: "022",
		lastLogin: "2023-03-16T10:45:00Z",
		createdAt: "2023-02-11T00:00:00Z",
		updatedAt: "2023-02-11T00:00:00Z",
	},
	{
		id: "023",
		email: "inoue.ryo@example.com",
		role: "user",
		status: "inactive",
		employeeId: null,
		lastLogin: "2023-03-15T14:20:00Z",
		createdAt: "2023-02-12T00:00:00Z",
		updatedAt: "2023-02-12T00:00:00Z",
	},
	{
		id: "024",
		email: "fujita.sakura@example.com",
		role: "user",
		status: "active",
		employeeId: "024",
		lastLogin: "2023-03-14T15:10:00Z",
		createdAt: "2023-02-13T00:00:00Z",
		updatedAt: "2023-02-13T00:00:00Z",
	},
	{
		id: "025",
		email: "ogawa.kaito@example.com",
		role: "user",
		status: "active",
		employeeId: "025",
		lastLogin: "2023-03-13T09:30:00Z",
		createdAt: "2023-02-14T00:00:00Z",
		updatedAt: "2023-02-14T00:00:00Z",
	},
	{
		id: "026",
		email: "hayashi.momoko@example.com",
		role: "admin",
		status: "active",
		employeeId: "026",
		lastLogin: "2023-03-12T13:15:00Z",
		createdAt: "2023-02-15T00:00:00Z",
		updatedAt: "2023-02-15T00:00:00Z",
	},
	{
		id: "027",
		email: "aoki.sho@example.com",
		role: "user",
		status: "active",
		employeeId: "027",
		lastLogin: "2023-03-11T16:45:00Z",
		createdAt: "2023-02-16T00:00:00Z",
		updatedAt: "2023-02-16T00:00:00Z",
	},
	{
		id: "028",
		email: "mori.yuta@example.com",
		role: "user",
		status: "inactive",
		employeeId: "028",
		lastLogin: null,
		createdAt: "2023-02-17T00:00:00Z",
		updatedAt: "2023-02-17T00:00:00Z",
	},
	{
		id: "029",
		email: "ikeda.aya@example.com",
		role: "user",
		status: "active",
		employeeId: "029",
		lastLogin: "2023-03-10T10:20:00Z",
		createdAt: "2023-02-18T00:00:00Z",
		updatedAt: "2023-02-18T00:00:00Z",
	},
	{
		id: "030",
		email: "yoshida.takeshi@example.com",
		role: "admin",
		status: "active",
		employeeId: "030",
		lastLogin: "2023-03-09T11:30:00Z",
		createdAt: "2023-02-19T00:00:00Z",
		updatedAt: "2023-02-19T00:00:00Z",
	},
	{
		id: "031",
		email: "yamada.kenta@example.com",
		role: "user",
		status: "active",
		employeeId: "031",
		lastLogin: "2023-03-08T14:15:00Z",
		createdAt: "2023-02-20T00:00:00Z",
		updatedAt: "2023-02-20T00:00:00Z",
	},
	{
		id: "032",
		email: "sasaki.miku@example.com",
		role: "user",
		status: "active",
		employeeId: "032",
		lastLogin: "2023-03-07T15:45:00Z",
		createdAt: "2023-02-21T00:00:00Z",
		updatedAt: "2023-02-21T00:00:00Z",
	},
	{
		id: "033",
		email: "yamaguchi.hiroshi@example.com",
		role: "admin",
		status: "active",
		employeeId: "033",
		lastLogin: "2023-03-06T09:20:00Z",
		createdAt: "2023-02-22T00:00:00Z",
		updatedAt: "2023-02-22T00:00:00Z",
	},
	{
		id: "034",
		email: "matsumoto.nana@example.com",
		role: "user",
		status: "inactive",
		employeeId: null,
		lastLogin: "2023-03-05T10:30:00Z",
		createdAt: "2023-02-23T00:00:00Z",
		updatedAt: "2023-02-23T00:00:00Z",
	},
	{
		id: "035",
		email: "ishikawa.jun@example.com",
		role: "user",
		status: "active",
		employeeId: "035",
		lastLogin: "2023-03-04T13:40:00Z",
		createdAt: "2023-02-24T00:00:00Z",
		updatedAt: "2023-02-24T00:00:00Z",
	},
	{
		id: "036",
		email: "nomura.riku@example.com",
		role: "user",
		status: "active",
		employeeId: "036",
		lastLogin: "2023-03-03T16:15:00Z",
		createdAt: "2023-02-25T00:00:00Z",
		updatedAt: "2023-02-25T00:00:00Z",
	},
	{
		id: "037",
		email: "kikuchi.aoi@example.com",
		role: "admin",
		status: "active",
		employeeId: "037",
		lastLogin: "2023-03-02T11:50:00Z",
		createdAt: "2023-02-26T00:00:00Z",
		updatedAt: "2023-02-26T00:00:00Z",
	},
	{
		id: "038",
		email: "maeda.shin@example.com",
		role: "user",
		status: "active",
		employeeId: "038",
		lastLogin: "2023-03-01T14:25:00Z",
		createdAt: "2023-02-27T00:00:00Z",
		updatedAt: "2023-02-27T00:00:00Z",
	},
	{
		id: "039",
		email: "fujiwara.mei@example.com",
		role: "user",
		status: "inactive",
		employeeId: "039",
		lastLogin: null,
		createdAt: "2023-02-28T00:00:00Z",
		updatedAt: "2023-02-28T00:00:00Z",
	},
	{
		id: "040",
		email: "nakajima.ren@example.com",
		role: "user",
		status: "active",
		employeeId: "040",
		lastLogin: "2023-02-28T15:30:00Z",
		createdAt: "2023-03-01T00:00:00Z",
		updatedAt: "2023-03-01T00:00:00Z",
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
