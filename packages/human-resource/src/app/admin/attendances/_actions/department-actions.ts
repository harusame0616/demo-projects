// 一時的なサンプルデータ
export const departments = [
	{ id: "1", name: "営業部" },
	{ id: "2", name: "開発部" },
	{ id: "3", name: "人事部" },
	{ id: "4", name: "総務部" },
	{ id: "5", name: "経理部" },
];

export async function getDepartments() {
	// TODO: Supabase からデータを取得するように修正
	return departments;
}
