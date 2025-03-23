"use client";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { type ComponentProps, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = ComponentProps<typeof Input>;
export function PasswordInput(props: Props) {
	const [visible, setVisible] = useState(false);

	return (
		<div className="relative">
			<Input type={visible ? "text" : "password"} {...props} className="pr-9" />
			<div className="absolute inset-y-0 right-0">
				<Button
					size="icon"
					variant="ghost"
					type="button"
					onClick={() => setVisible((prev) => !prev)}
				>
					{visible ? (
						<EyeClosedIcon role="img" aria-label="to visible" />
					) : (
						<EyeIcon role="img" aria-label="to invisible" />
					)}
				</Button>
			</div>
		</div>
	);
}
