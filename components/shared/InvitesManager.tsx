"use client";
import React, { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { getUserInvites } from "@/lib/getUserInvites";
import { deleteInviteById } from "@/lib/deleteInviteById";
import { Copy, PenLine, SquareArrowUpRight, Trash2 } from "lucide-react";
import Link from "next/link";

interface InvitesManagerProps {
	className?: string;
	email: string;
}

export const InvitesManager: FC<InvitesManagerProps> = ({
	className,
	email,
}) => {
	const { invites, isLoading, isError } = getUserInvites(email);
	const [deletedInvites, setDeletedInvites] = useState<string[]>([]);

	const handleDelete = async (inviteId: string) => {
		const { isSuccess } = await deleteInviteById(inviteId);
		if (isSuccess) {
			setDeletedInvites([...deletedInvites, inviteId]);
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading invites</div>;
	if (!invites) return <div>No invites</div>;

	const filteredInvites = invites.filter(
		(invite: any) => !deletedInvites.includes(invite.id),
	);

	return (
		<div className={cn("", className)}>
			{filteredInvites.map((invite: any) => (
				<div
					key={invite.id}
					className="flex gap-2 group  p-1 rounded"
				>
					<div className="border group-hover:border-black p-2 text-sm flex items-center gap-3 rounded w-full">
						<div title="Name" className="flex ">
							{invite.inviteName}
						</div>
						{/* <div title="Email" className="text-sm">
							{invite.email}
						</div> */}
						<div title="Id" className="text-gray-400 text-sm text-ellipsis">
							{invite.id}
						</div>
					</div>
					<div title="" className=" text-xs rounded group-hover:border-black flex gap-1 items-center">
						<div
							className=" cursor-pointer hover:border-black border p-2 rounded  "
							title="to invite"
						>
							<Link href={`/dashboard/${invite.id}`}>
								<PenLine strokeWidth={1} />
							</Link>
						</div>
						<div
							className=" cursor-pointer hover:border-black border p-2 rounded  "
							title="to invite"
						>
							<Link
								href={`/invite/${invite.id}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<SquareArrowUpRight strokeWidth={1} />
							</Link>
						</div>
						<div
							className=" cursor-pointer hover:border-black border p-2 rounded  "
							onClick={() => {
								navigator.clipboard.writeText(
									`${process.env.NEXT_PUBLIC_CLIENT_URL}/invite/${invite.id}`,
								);
							}}
							title="copy invite link"
						>
							<Copy strokeWidth={1} />
						</div>
						<div
							className=" cursor-pointer hover:border-black border p-2 rounded  "
							onClick={() => handleDelete(invite.id)}
							title="delete invite"
						>
							<Trash2 strokeWidth={1} />
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
