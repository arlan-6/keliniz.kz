"use client";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

interface DeleteBtnProps {
	className?: string;
	deleteHandler: (inviteId: string) => void;
	inviteId: string;
}

export const DeleteBtn: FC<DeleteBtnProps> = ({
	className,
	deleteHandler,
	inviteId,
}) => {
	return (
		<Button
			onClick={() => {
				deleteHandler(inviteId);
			}}
			variant={"ghost"}
			className="hover:bg-red-200 transition-colors rounded-sm p-2"
		>
			<Trash2Icon className=" w-6 h-6 text-red-600 " />
		</Button>
	);
};
