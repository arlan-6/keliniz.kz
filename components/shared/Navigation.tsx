"use client";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { Contact, HomeIcon, LogIn, SwatchBook, UserIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { NavProfile } from "./NavProfile";
import { LanguageSelect } from "./Language";
import { useSessionStore } from "@/app/store/store";
import Headroom from "react-headroom";

interface NavigationProps {
	className?: string;
}

export const Navigation: FC<NavigationProps> = ({ className }) => {
	const isAuthenticated = false; // Replace with your authentication logic
	const { data: session } = useSession();
	const setSesion = useSessionStore((state) => state.setSession);

	React.useEffect(() => {
		if (session?.user) {
			setSesion(session.expires, session.user);
		}
	}, [session, setSesion]);
	return (
		<Headroom className="absolute   overflow-x-hidden">
			<div className="w-screen text-white">
				<nav className="md:text-sm lg:text-xl text-xs min-h-12 z-50 motion-preset-fade bg-slate-900 bg-opacity-25 backdrop-blur-lg p-4 shadow-sm">
					<ul className="flex justify-around items-center">
						<li className="flex gap-1 text-lg hover:motion-preset-seesaw  cursor-pointer  transition duration-300 ease-in-out">
							<span className="hidden md:block lg:block"> Logo </span>
							<HomeIcon size={24} className="md:hidden block lg:block" />
						</li>
						<li className="flex gap-1 text-lg hover:motion-preset-seesaw  cursor-pointer duration-300 ease-in-out">
							<Link className="flex gap-1" href="/">
								<span className="hidden md:block lg:block"> Home </span>
								<HomeIcon size={24} className="md:hidden block lg:block" />
							</Link>
						</li>
						<li className="text-lg hover:motion-preset-seesaw  cursor-pointer duration-300 ease-in-out">
							<Link className="flex gap-1" href="/templates">
								<span className="hidden md:block lg:block"> Teamplates </span>
								<SwatchBook size={24} className="md:hidden block lg:block" />
							</Link>
						</li>
						<li className="flex gap-1 text-lg hover:motion-preset-seesaw  cursor-pointer duration-300 ease-in-out">
							<span className="hidden md:block lg:block"> Contact </span>
							<Contact size={24} className="md:hidden block lg:block" />
						</li>
						<li className="flex gap-5 items-center text-lg   cursor-pointer duration-300 ease-in-out">
							{session ? (
								<span className=" hover:motion-preset-seesaw">
									<NavProfile />
								</span>
							) : (
								<Link className="flex gap-1" href="/auth">
									<span className="hidden md:block lg:block"> Login </span>
									<LogIn size={24} className="md:hidden block lg:block" />
								</Link>
							)}{" "}
							<span>
								{" "}
								<LanguageSelect />
							</span>
						</li>
					</ul>
				</nav>
			</div>
		</Headroom>
	);
};
