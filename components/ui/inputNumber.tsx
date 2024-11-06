import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	beforeInput?: React.ReactNode | string;
	afterInput?: React.ReactNode | string;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, beforeInput, afterInput, type, ...props }, ref) => {
		return (
			<div className={cn("flex items-center justify-center ",className)}>
				<span className="mx-1 flex-row flex text-xs">{beforeInput}</span>

				<input
					type={type}
					className={cn(
						`m-1  w-1/2  h-5 border-b-2 border-input bg-transparent border-gray-400 px-1 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50`,
						
					)}
					ref={ref}
					{...props}
				/>
				<span className=" mx-1 flex-row flex text-[12px]">{afterInput}</span>
			</div>
		);
	},
);
InputNumber.displayName = "Input";

export { InputNumber };
