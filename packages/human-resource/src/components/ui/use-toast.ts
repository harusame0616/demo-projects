"use client";

interface ToastProps {
	title: string;
	description?: string;
	variant?: "default" | "destructive";
}

// 実際のToastコンポーネントがない場合のモック実装
export function toast(props: ToastProps) {
	// 実際の実装では、画面上にトースト通知を表示
	console.log("Toast表示:", props.title, props.description);
}
