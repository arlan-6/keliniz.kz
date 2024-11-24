'use client';
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { FilterPannel } from "./FilterPannel";
import { ShowTemplates } from "./ShowTemplates";
import { setToStore } from "@/app/templates/getTemplates";
import { useLikedTemplateIdStore, useSessionStore, useTemplateStore } from "@/app/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
interface TemplateOrganaizerProps {
	className?: string;
	templates: any;
	likedTemplates: string[];
}	

export const TemplateOrganaizer: FC<TemplateOrganaizerProps> =  ({
	className, templates,likedTemplates
}) => {
	const { data: session } = useSession();

const setSesion = useSessionStore((state) => state.setSession);
const addLikedTemplates = useLikedTemplateIdStore((state) => state.addLikedTemplate);
const addList = useTemplateStore((state) => state.addList);

useEffect(() => {
  if (session?.user) {
    setSesion(session.expires, session.user as { email: string; image: string; name: string; role: "user" | "admin" | "viewer"; });
  }
}, [session]);
	
useEffect(() => {
    addList(templates);
    addLikedTemplates(likedTemplates);
  }, [templates, likedTemplates, addList, addLikedTemplates]);

	return (
		<div className={cn("pt-20", className)}>
			<FilterPannel />
			<div className="flex justify-center p-15">
				<ShowTemplates/>
			</div>
		</div>
	);
};
