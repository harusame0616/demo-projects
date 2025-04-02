export const UserRole = {
	Admin: "admin",
	User: "user",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserRoleLabel: Record<UserRole, string> = {
	[UserRole.Admin]: "管理者",
	[UserRole.User]: "一般ユーザー",
} as const;

export type UserRoleLabel = (typeof UserRoleLabel)[keyof typeof UserRoleLabel];

export const UserStatus = {
	Active: "active",
	Inactive: "inactive",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const UserStatusLabel: Record<UserStatus, string> = {
	[UserStatus.Active]: "有効",
	[UserStatus.Inactive]: "無効",
} as const;

export type UserStatusLabel =
	(typeof UserStatusLabel)[keyof typeof UserStatusLabel];
