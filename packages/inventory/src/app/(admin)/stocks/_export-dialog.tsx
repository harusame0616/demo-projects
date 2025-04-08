"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export function ExportDialog() {
	const handleExport = () => {
		// 直接CSVダウンロードAPIを呼び出す
		window.location.href = "/api/stocks/export";
	};

	return (
		<Button variant="outline" size="sm" onClick={handleExport}>
			<DownloadIcon className="h-4 w-4" />
			CSV出力
		</Button>
	);
}
