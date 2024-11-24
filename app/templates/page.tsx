import React, { FC } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { El_Messiri, Montserrat } from "next/font/google";
import { TemplateOrganaizer } from "@/components/shared/TemplateOrganaizer";
import { ArrowDown } from "lucide-react";
import { auth, getLikedTemplates } from "../auth";
import TemplatesSwitch from "@/components/shared/templatesSwitch";
import { UserEditedTemplates } from "@/components/shared/userEditedTemplates";
import Google from "next-auth/providers/google";
import Googlemaps from "@/components/shared/Googlemaps";

const elMesiri = El_Messiri({
	weight: "400",
	subsets: ["latin", "cyrillic"],
});
const montserrat = Montserrat({
	weight: "400",
	subsets: ["latin", "cyrillic"],
});

interface pageProps {
	className?: string;
	searchParams: {
		template?: string;
	};
}

const Page: FC<pageProps> = async ({ className, searchParams }) => {
	const session = await auth();
	const awaitedSearchParams = await searchParams;
	const showTemplates = awaitedSearchParams.template === "off";
	const likedTemplates =
		session && session.user
			? await getLikedTemplates(session.user.email as string)
			: [];
	const getTemplate = async () => {
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+"/templates");
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			return response.json();
		} catch (error) {
			console.error("Failed to fetch templates:", error);
			return [];
		}
	};
	const templates = await getTemplate();
	return (
		<div className={cn("", className)}>
			<header className="text-white lg:h-screen sm:h-screen h-1/2 w-full bg-gradient-to-tr from-[#2596be] to-[#768fda]">
				<div className="flex justify-around items-end h-full motion-preset-focus ">
					<div className="text-left p-12 mt-20">
						<h1
							className={` lg:text-8xl sm:text-6xl text-4xl font-bold ${elMesiri.className}  motion-preset-slide-right`}
						>
							Templates
						</h1>
						<p
							className={`flex items-center gap-2  lg:text-xl translate-x-2 ${montserrat.className}  motion-preset-slide-right motion-delay-75`}
						>
							Choose from a wide range of templates to get started{" "}
							<ArrowDown
								className="motion-preset-float "
								size={32}
								strokeWidth={1.5}
							/>
						</p>
					</div>
					<div className="hidden sm:block ">
						<Image
							className="select-none"
							src="/images/templatePage.jpg"
							width={600}
							height={600}
							alt="hero"
							priority
						/>
					</div>
				</div>
			</header>
			<section className="bg-white min-h-screen">
				{session && (
					<div className="mt-10 w-full flex justify-center">
						<TemplatesSwitch />
					</div>
				)}
				{showTemplates ? (
					<UserEditedTemplates email={session?.user?.email as string}/>
				) : (
					<TemplateOrganaizer
						templates={templates}
						likedTemplates={likedTemplates}
					/>
				)}
			</section>
			{/* <Link href="/templates/1">Home</Link> */}
			<section>
				<Googlemaps />
				<div className="flex justify-center items-center h-20 bg-gray-800 text-white">
					<p className="text-lg">© 2021 All rights reserved</p>
				</div>
			</section>
		</div>
	);
};
export default Page;
