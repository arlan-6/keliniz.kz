"use client";
import React, { FC, useId } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { InputNumber } from "../ui/inputNumber";
import { TextPropertiesPanell } from "./TextPropertiesPanell";
import { useStore } from "@/app/store/store";

interface constructorSidebarProps {
	className?: string;
}

export const ConstructorSidebar: FC<constructorSidebarProps> = ({
	className,
}) => {
	const getElement = useStore((state) => state.getActiveElement);
	console.log(getElement());
	return (
		<div
			className={cn(
				"scrollbar-custom bg-scroll h-screen min-w-40 w-2/5 max-w-80 bg-slate-300 border-r-4 border-stone-800 p-7 fixed top-0 right-0 z-50 overflow-auto",
				className,
			)}
		>
			{getElement() ? (<TextPropertiesPanell element={getElement()} />):null}
			
		</div>
	);
};
