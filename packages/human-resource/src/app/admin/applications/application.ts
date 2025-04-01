export const ApplicationStatus = {
	Pending: "pending",
	Approved: "approved",
	Rejected: "rejected",
} as const;

export type ApplicationStatus =
	(typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export const ApplicationType = {
	PaidHoliday: "paid_holiday",
	AttendanceCorrection: "attendance_correction",
} as const;

export type ApplicationType =
	(typeof ApplicationType)[keyof typeof ApplicationType];

export const ApplicationStatusLabel = {
	[ApplicationStatus.Pending]: "承認待ち",
	[ApplicationStatus.Approved]: "承認済み",
	[ApplicationStatus.Rejected]: "却下",
} as const;

export const ApplicationTypeLabel = {
	[ApplicationType.PaidHoliday]: "有給休暇",
	[ApplicationType.AttendanceCorrection]: "勤怠修正",
} as const;
