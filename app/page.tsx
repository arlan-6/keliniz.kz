"use client";
import { cn } from "@/lib/utils";
import { Tittle } from "@/components/shared";
import Link from "next/link";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Cinzel, El_Messiri, Montserrat } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { use, useRef } from "react";
import { Navigation } from "@/components/shared/Navigation";
import { AnimatedText } from "@/components/shared/TextAnimation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useSessionStore } from "./store/store";
import { HomePageCarusel } from "@/components/shared/homePageCarusel";

const elMesiri = El_Messiri({
	weight: "400",
	subsets: ["latin", "cyrillic"],
});
const montserrat = Montserrat({
	weight: "400",
	subsets: ["latin", "cyrillic"],
});
const sixHandsBlack = Cinzel({
	weight: "400",
	subsets: ["latin"],
});
const notoSansKR = Noto_Sans_KR({
	weight: "400",
	subsets: ["cyrillic"],
});
const CarouselItems =
[
	{
		src: "/images/fredomtodesign.jpg",
		title: "Freedom to Design",
		description:
			"Get access to thousands of customizable designs at your fingertips.",
		bgClass:
			"bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
	},
	{
		src: "/images/sharing.jpg",
		title: "Sharing made simple",
		description:
			"Effortlessly share your e-invites via email, social media, or any platform of choosing.",
		bgClass: "bg-slate-500",
	},
	{
		src: "/images/fredomtodesign.jpg",
		title: "Mobile Friendly",
		description:
			"Access your designs on the go from any device.",
		bgClass: "bg-slate-500",
	},
	{
		src: "/images/user_friendly.jpg",
		title: "User-Friendly",
		description:
			"Easily craft your e-invite even if you‘re not tech-savvy. It’s that simple.",
		bgClass: "bg-slate-500",
	},
	{
		src: "/images/up_to_date.jpg",
		title: "Always up-to-date",
		description:
			"We always keep our templates fresh and trendy for all occasions.",
		bgClass: "bg-slate-500",
	},
	{
		src: "/images/customizable.jpg",
		title: "Customizable",
		description:
			"Make your e-invite truly yours with our easy-to-use editor.",
		bgClass: "bg-slate-500",
	},
	{
		src: "/images/support.jpg",
		title: "24/7 support",
		description:
			"Our team is here for you around the clock. We value your time.",
		bgClass: "bg-slate-500",
	},
]
export default function Home() {
	const { data: session } = useSession();

	const setSesion = useSessionStore((state) => state.setSession);
	// @ts-ignore
	session?.user && setSesion(session.expires, session.user);
	// session?.user && console.log(session);
	const plugin = useRef(Autoplay({ delay: 1000, stopOnInteraction: true }));
	return (
		<div className="">
			<header className="text-white lg:h-screen sm:h-screen h-1/2 w-full bg-gradient-to-tr from-[#f49726] to-[#fbc291]">
				<Navigation />
				<div className="flex justify-around items-end h-full motion-preset-focus ">
					<div className="text-left p-12 mt-20">
						<h1
							className={`lg:text-8xl sm:text-6xl text-4xl font-bold ${elMesiri.className}  motion-preset-slide-right`}
						>
							Kelińiz.kz
						</h1>
						<p
							className={`lg:text-xl translate-x-2 ${montserrat.className}  motion-preset-slide-right motion-delay-75`}
						>
							Шақырудың жаңа деңгейі!
						</p>
					</div>
					<div className="hidden sm:block ">
						<Image
							className="select-none"
							src="/images/img3.jpg"
							width={600}
							height={600}
							alt="hero"
							priority
						/>
					</div>
				</div>
			</header>
			<main className="bg-gradient-to-tr from-[#768fda] to-[#2596be]">
				<section className="">
					<div className="p-8">
						<h1
							className={`flex-row text-4xl text-[#fbfbff] text-center m-8 ${notoSansKR.className}`}
						>
							Шақырулар әлеміне қош келдіңіз!
						</h1>
						<div className="flex justify-center ">
							<div className="w-3/4 lg:flex ">
								<div
									className={`m-2 text-lg text-[#fbfbff] leading-relaxed ${notoSansKR.className} p-5 rounded-sm`}
								>
									<AnimatedText text="Дәстүрлі қағаз шақырулармен қош айтысыңыз. Keliniz.kz арқылы сіздің ерекше шараларыңыз әдемі және стильді электронды шақырулармен әсерлі болмақ!"/>
								</div>
								<div
									className={`m-2 text-lg text-[#fbfbff] leading-relaxed ${notoSansKR.className} p-5 rounded-sm`}
								>
									<AnimatedText text="Қазақтың дәстүрлі үйлену тойы ма, әлде заманауи туған күн мерекесі ме — бізбен бірге бәрі де ерекше болады! Қонақтарыңызды қазақы нақыштағы интерактивті шақырулармен қуантаңыз!" />
								</div>
							</div>
						</div>
						<div className="fleex justify-center items-center m-8 mt-12 lg:text-lg md:text-sm w-full">
							{/* <h1>Master the Essentials</h1> */}
							<HomePageCarusel slides={CarouselItems}/>
						</div>
					</div>
				</section>
				<div className="motion-preset-focus  w-full flex justify-center my-7">
					<div className="w-4/5 h-1 bg-white rounded-sm"></div>
				</div>
				<section className="flex justify-center w-full">
					<div className="w-4/5 text-white text-2xl m-5">
						<div className="w-3/4">
							<AnimatedText text="Шаблон - бұл алдын ала дайындалған шақыру дизайны, оны жеке қалауыңызға сай өзгерте аласыз. Басқаша айтқанда, шаблон сізге дайын құрылымды ұсынады, онда сізге тек өз мәтініңізді, фотоларыңызды немесе қосымша ақпаратты қосу жеткілікті. Шаблондар шақыру жасауды оңай әрі тез етеді, себебі дизайн мен орналасу элементтері дайын болады." />
						</div>
					</div>
				</section>
				<div className="motion-preset-focus  w-full flex justify-center my-7">
					<div className="w-4/5 h-1 bg-white rounded-sm"></div>
				</div>
				<section className="flex justify-center text-white text-3xl">
					<div className="flex justify-between w-4/5 items-end">
						<h2>Шаблонdar</h2>
						<span className="flex gap-2 group/arrow text-lg items-center underline cursor-pointer">
							{" "}
							see all{" "}
							<ArrowRight
								className="group-hover/arrow:motion-preset-wobble "
								size={20}
							/>
						</span>
					</div>
				</section>
				<section className="flex justify-center">
					<div className="w-4/5 flex gap-10 my-10">
						<div className="">
							<Skeleton className="w-64 h-96" />
							<Skeleton className="mt-5 w-64 h-7" />
						</div>
						<div className="">
							<Skeleton className="w-64 h-96" />
							<Skeleton className="mt-5 w-64 h-7" />
						</div>
						<div className="">
							<Skeleton className="w-64 h-96" />
							<Skeleton className="mt-5 w-64 h-7" />
						</div>
						<div className="">
							<Skeleton className="w-24 h-96 " />
							<Skeleton className="mt-5 w-24 h-7" />
						</div>
					</div>
				</section>
				<section>
					<div className="w-full flex justify-center">
						<div className="w-4/5 flex justify-around">
							<div className="w-1/4 p-4">
								<div className=" mb-7 text-6xl text-[#005f99] flex justify-center">
									<span className="motion-preset-oscillate motion-duration-2000  w-28 h-28 flex justify-center items-center bg-white rounded-full p-4 px-4">
										1
									</span>
								</div>
								<div className="text-center text-white text-lg">
									Өзіңізге ұсынылған шаблондар арасынан 🖼️ мақсатыңыз бен
									талғамыңызға сай келетінін таңдаңыз. ✅ Әрбір шаблонның
									ерекшеліктерін 🔍 қарап, өз стиліңізге сай келетінін
									анықтаңыз.
									<br />
									<Link className="hover:underline" href="/templates">
										<Button className="text-xl">Шаблондарды қарау!</Button>
									</Link>
								</div>
							</div>
							<div className="w-1/4 p-4">
								<div className=" mb-7 text-6xl text-[#005f99] flex justify-center">
									<span className="motion-preset-oscillate motion-duration-2000 motion-delay-300 w-28 h-28 flex justify-center items-center bg-white rounded-full p-4 px-4">
										2
									</span>
								</div>

								<div className="text-center text-white text-lg">
									Сізге ұсынылған шаблондар арасынан 🖼️ мақсатыңыз бен
									талғамыңызға сай келетінін таңдаңыз. ✅ Қажет болса, шаблонды
									өзгертіңіз немесе қосымша ақпарат қосыңыз.
								</div>
							</div>
							<div className="w-1/4 p-4">
								<div className=" mb-7 text-6xl text-[#005f99] flex justify-center">
									<span className="motion-preset-oscillate motion-duration-2000 motion-delay-700 w-28 h-28 flex justify-center items-center bg-white rounded-full p-4 px-4">
										3
									</span>
								</div>

								<div className="text-center text-white text-lg">
									Шақыруды толықтай дайындап, оны 📩 туыстарыңызға жіберіңіз.
									Олардың барлығын маңызды оқиға туралы хабардар етіп, қатысуға
									шақырыңыз 👨‍👩‍👧‍👦. Қажет болған жағдайда қосымша ақпарат немесе
									өзгерістер енгізуге болады.
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Tittle text="asdf" />
			<Tittle text="asdf" />
			<Link href="/constructor">constructor</Link>
			<br />
		</div>
	);
}
