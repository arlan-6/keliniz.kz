"use client";

import React, { FC, useState, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DeleteBtn } from "./DeleteBtn";
const UserEditedTemplateCard = React.lazy(() =>
	import("./UserEditedTemplateCard").then((module) => ({
		default: module.UserEditedTemplateCard,
	})),
);

interface userEditedTemplatesProps {
	className?: string;
	email: string;
}

export const UserEditedTemplates: FC<userEditedTemplatesProps> = ({
	className,
	email,
}) => {
	const [userEditedTemplates, setUserEditedTemplates] = useState([]);
	const fetchTemplates = async () => {
		const response = await fetch(
			process.env.NEXT_PUBLIC_SERVER_URL+`/edit/invites/email?email=${email}`,
		);
		const data = await response.json();
		setUserEditedTemplates(data);
	};
	useEffect(() => {
		fetchTemplates();
	}, [email]);

	const deleteHandler = async (inviteId: string) => {
		const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+`/edit/invites/${inviteId}`, {
			method: "DELETE",
		});
		if (res.ok) {
			const data = await res.json();
			const id = data.id;
			console.log(id);
			fetchTemplates();
		} else {
			throw new Error("Failed to delete invite");
		}
	};
	return (
		<div className="">
			<div className="text-center pt-10">
				{userEditedTemplates.length === 0 ? (
					<h1 className=" text-gray-500 ">No Templates</h1>
				) : (
					<h1 className=" text-gray-500 ">
						You have {userEditedTemplates.length} edited invites
					</h1>
				)}
			</div>
			<div className="flex w-full justify-center ">
				<div
					className={cn(
						" w-3/4 py-5  flex flex-wrap gap-5 justify-center",
						className,
					)}
				>
					<Suspense fallback={<div>Loading...</div>}>
						{userEditedTemplates.map((template: any) => {
							return (
								<div
									key={template.inviteId}
									className="p-3 min-w-80 shadow-sm rounded-lg hover:shadow-lg transition-shadow flex justify-between"
								>
									<Link href={`/templates/edit/${template.inviteId}`}>
										<UserEditedTemplateCard className="" template={template} />
									</Link>
									<DeleteBtn
										deleteHandler={deleteHandler}
										inviteId={template.inviteId}
									/>
								</div>
							);
						})}
					</Suspense>
				</div>
			</div>
		</div>
	);
};
