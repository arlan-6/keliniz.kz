import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { ConstructorSidebar } from "@/components/shared/constructor-sidebar";
import { MainCanvas } from "@/components/shared/main-canvas";
// import { TextTemplate } from "../store/template";

interface pageProps {
	className?: string;
}


const Page: FC<pageProps> = ({ className }) => {
	return (
		// <div className={cn('absolute',className)}>
		//     <Highlight className='' enableResize={false}><div className="cursor-default w-full h-full  bg-orange-600 flex-grow">a</div></Highlight>

		// </div>
		<div className={cn("flex", className)}>
			<ConstructorSidebar />
			<MainCanvas/>
		</div>
	);
};
export default Page;
