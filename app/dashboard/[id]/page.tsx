import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { getPublishedInviteServer } from "@/lib/getPublishedInvite";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { RsvpList } from "@/components/shared/rsvpList";
import Link from "next/link";

interface pageProps {
	className?: string;
	params: { id: string };
}

const Page: FC<pageProps> = async ({ className, params }) => {
	const { id } = await params;
	let data, error;

	try {
		data = await getPublishedInviteServer(id);
	} catch (err) {
		error = err;
	}

	if (error) return <div>Error loading invite</div>;

	return (
		<div className={cn("", className)}>
			<div className="">
        <Link href="/dashboard">{'<'}-back</Link>
				<h1>{data?.inviteName}</h1>
				<p>{data?.email}</p>
				<div className="p-3">
          {/* @ts-ignore */}
          {            data.rsvp && 	<RsvpList data={data} inviteId={id}/>
          }
				
				</div>
			</div>
		</div>
	);
};
export default Page;
