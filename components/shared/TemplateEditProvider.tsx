'use client'
import React, { FC, JSXElementConstructor } from "react";
import { cn } from "@/lib/utils";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "../ui/resizable";
import { useInviteEditStore } from "@/app/store/store";

interface TemplateEditProviderProps {
	className?: string;
	Template: JSXElementConstructor<any>;
}

// Update TemplateEditProvider to pass props
export const TemplateEditProvider: FC<TemplateEditProviderProps> = ({
	className,
	Template,
  }) => {
	const inviteDetails = useInviteEditStore((s) => s.inviteDetails);
  
	return (
	  <div
		className={cn(
		  "p-4 md:p-20 min-h-screen w-full flex justify-center",
		  className,
		)}
	  >
		<ResizablePanelGroup direction="horizontal">
		  <ResizablePanel minSize={35} defaultSize={100}>
			<div className="w-full max-w-[1300px] bg-slate-50">
			  <Template inviteDetails={inviteDetails} />
			</div>
		  </ResizablePanel>
		  <ResizableHandle withHandle />
		  <ResizablePanel></ResizablePanel>
		</ResizablePanelGroup>
	  </div>
	);
  };