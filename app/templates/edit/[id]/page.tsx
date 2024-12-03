"use client";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import Link from "next/link";
import { createInvite } from "@/lib/createInvite";
import { useInviteEditStore, useSessionStore } from "@/app/store/store";
import { getInvite } from "@/lib/getInvite";
import dynamic from "next/dynamic";
import { TemplateEditProvider } from "@/components/shared/TemplateEditProvider";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { InviteShareModal } from "@/components/shared/InviteShareModal";

interface pageProps {
	className?: string;
}

const Page: FC<pageProps> = ({ className }) => {
	const setAll = useInviteEditStore((s) => s.setAll);
	const inviteData = useInviteEditStore((s) => s.inviteDetails);
	const templateId = useInviteEditStore((s) => s.templateId);
	const inviteId = useInviteEditStore((s) => s.inviteId);
	const params = useParams();
	const router = useRouter();
	const searchParams = useSearchParams();
	const isTemplate = searchParams.has("template");

	if (isTemplate) {
		const session = useSessionStore((s) => s.user)?.email;
		React.useEffect(() => {
			const fetchInvite = async () => {
				if (params.id) {
					try {
						const res = await createInvite(
							params.id as string,
							session as string,
						);
						// console.log(res);
						router.replace(`/templates/edit/${res}`);
					} catch (error) {
						console.error(error);
					}
				}
			};
			fetchInvite();
		}, [params.id]);
	}

	// const [inviteData, setInviteData] = React.useState<any>(null);

	React.useEffect(() => {
		const fetchInviteData = async () => {
			const data = await getInvite(params.id as string);
			// console.log(data);
			setAll(data);
			// setInviteData(data);
		};
		fetchInviteData();
	}, [params.id]);

	const InviteTemplate =
		inviteData && templateId
			? dynamic(
					() =>
						import(`@/components/template/${templateId}`).catch(() => () => (
							<p>Template not found</p>
						)),
					{
						loading: () => <p>Loading...</p>,
						// ssr: false,
					},
			  )
			: () => <p>Loading...</p>;

	//   React.useEffect(() => {
	//   if (!inviteData || !inviteData.templateId) {
	//     router.replace('/not-found');
	//   }
	//   }, [inviteData]);

	return (
		<div className={cn("min-w-full block  bg-fixed bg-cover backdrop:grayscale", className)}>
			<TemplateEditProvider Template={InviteTemplate }/>
				
			<div className="fixed top-7 right-7 z-30">
				
				<InviteShareModal inviteId={inviteId}/>
			</div>
		</div>
	);
};
export default Page;
