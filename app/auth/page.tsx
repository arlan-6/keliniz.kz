import React, { FC } from "react";
import { cn } from "@/lib/utils";
import AuthButton from "@/components/shared/AuthButton";

interface PageProps {
	className?: string;
}

const repetitions = Array.from({ length: 60 });
const phrases = [
	"Login", 
	"SignIn", 
	"Welcome", 
	"Hello", 
	"JoinUs", 
	"Register", 
	"Access", 
	"Enter", 
	"Authenticate", 
	"Verify", 
	"Create", 
	"Explore", 
	"Connect", 
	"Engage", 
	"Discover", 
	"Begin", 
	"Subscribe", 
	"Enroll", 
	"Continue", 
	"Start", 
	"Unlock", 
	"Join", 
	"Stay", 
	"Participate", 
	"Ready", 
	"Dive"
  ];
const Page: FC<PageProps> = ({ className }) => (
	<section
		className={cn(
			"relative h-screen bg-gradient-to-br from-gray-500 to-gray-400  ",
			className,
		)}
	>
		{/* Background */}
		<div className="absolute inset-0 overflow-hidden w-full h-screen z-0">
			<div className="absolute inset-0 transform flex flex-wrap gap-10 justify-between z-0">
				{repetitions.map((_, index) => (
		  <div
			key={index}
			className="motion-preset-bounce motion-preset-seesaw motion-duration-1000 hover:motion-preset-oscillate cursor-default select-none -rotate-12 text-5xl font-extrabold text-white"
			style={{ 
			  animationDelay: `${Math.random() * 1.3}s`,
			  opacity: `${Math.random() * 0.25 + 0.05}`
			}}
		  >
	  {[...phrases ][Math.floor(Math.random() * phrases.length)]}
		  </div>
				))}
			</div>
		</div>

		{/* Main block */}
		<div className=" flex justify-center items-center h-full z-10 ">
			<main className="motion-preset-bounce relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-10 rounded-xl shadow-xl text-center border">
				<h1 className="motion-preset-bounce text-4xl font-bold text-white mb-4">
					Welcome Back!
				</h1>
				<p className="motion-preset-bounce text-lg text-white mb-6 delay-75">
					Please sign in to continue.
				</p>

				<div className="motion-preset-bounce delay-150 w-full justify-center">
					<AuthButton className="rounded"/>
				</div>
			</main>
		</div>
	</section>
);

export default Page;
