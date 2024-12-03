"use client";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DashBoardcard } from "./DashBoardcard";
import { UserEditedTemplates } from "./userEditedTemplates";
import { InvitesManager } from "./InvitesManager";

interface DashboardProps {
	className?: string;
}

export const Dashboard: FC<DashboardProps> = ({ className }) => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "unauthenticated") {
		console.log("no session");
		redirect("/auth");
	}

	return (
		<div className={cn("block p-6", className)}>
			Name: {session?.user?.name}
			<br />
			Email: {session?.user?.email}
			<br />
			<div className="p-3">
				<div className="bg-primary rounded-sm p-1 px-2 max-w-20 text-ellipsis text-center text-white">
					{/* @ts-ignore */}
					{session?.user?.role}
				</div>
			</div>
			<div className="flex flex-wrap">
				<DashBoardcard className="w-screen">
					<div className="text-xl">Manage invites</div>
					<InvitesManager email={session?.user?.email as string} />
				</DashBoardcard>{" "}
				<DashBoardcard>
					<UserEditedTemplates
						className=" "
						email={session?.user?.email as string}
					/>
				</DashBoardcard>
			</div>
		</div>
	);
};
