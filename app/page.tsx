import { cn } from "@/lib/utils";
import { Tittle } from "@/components/shared";
import Link from "next/link";

import { Abril_Fatface, Rubik_80s_Fade } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import Image from "next/image";
import { Contact, HomeIcon, LogIn } from "lucide-react";
const abrilFatface = Abril_Fatface({
	weight: "400",
	subsets: ["latin"],
});
const Rubik80sFade = Rubik_80s_Fade({
  weight: "400",
  subsets: ["cyrillic"],
});
const notoSansKR = Noto_Sans_KR({
	weight: "400",
	subsets: ["cyrillic"],
});
export default function Home() {
	return (
		<div className="">
			<header className="text-white h-screen w-full bg-gradient-to-tr from-[#f49726] to-[#fbc291]">
				<nav className="z-50 motion-preset-fade fixed top-3 left-1/2 transform -translate-x-1/2 w-5/6 rounded-sm bg-slate-50 bg-opacity-10 backdrop-blur-lg p-4 shadow-sm border border-white border-opacity-40">
					<ul className="flex justify-around items-center">
						<li className="flex gap-1 text-lg hover:motion-preset-seesaw hover:text-xl cursor-pointer  transition duration-300 ease-in-out">
							Logo <HomeIcon size={24} />
						</li>
						<li className="flex gap-1 text-lg hover:motion-preset-seesaw hover:text-xl cursor-pointer duration-300 ease-in-out">
							Home <HomeIcon size={24} />
						</li>
						<li className="text-lg hover:motion-preset-seesaw hover:text-xl cursor-pointer duration-300 ease-in-out">
							About Us 
						</li>
						<li className="flex gap-1 text-lg hover:motion-preset-seesaw hover:text-xl cursor-pointer duration-300 ease-in-out">
							Contact <Contact size={24} />
						</li>
						<li className="flex text-lg hover:motion-preset-seesaw hover:text-xl cursor-pointer duration-300 ease-in-out">
            LogIn  <LogIn size={24} />
						</li>
					</ul>
				</nav>
				<div className="flex justify-around items-end h-full motion-preset-focus ">
					<div className="text-left p-12 ">
						<h1 className={`text-8xl font-bold ${abrilFatface.className}  motion-preset-slide-right`}>
							Keliniz.kz
						</h1>
						<p className={`text-4xl ${notoSansKR.className}  motion-preset-slide-right motion-delay-75`}>
            Шақырудың жаңа деңгейі!
						</p>
					</div>
          <div className="hidden sm:block ">
            <Image src="/images/img3.jpg" width={600} height={600} alt="hero" priority />
          </div>
				</div>
			</header>
			<main className="h-screen">
				<section className="flex justify-center items-center ">
					<div className="w-3/4 p-8 bg-white bg-opacity-80 rounded-lg ">
						<h1
							className={`text-4xl text-gray-800 text-center m-8 ${notoSansKR.className}`}
						>
							Шақырулар әлеміне қош келдіңіз!
						</h1>
						<div className="flex gap-12">
							<p
								className={`text-lg text-gray-800 leading-relaxed ${notoSansKR.className}`}
							>
								Дәстүрлі қағаз шақырулармен қош айтысыңыз. Keliniz.kz арқылы
								сіздің ерекше шараларыңыз әдемі және стильді электронды
								шақырулармен әсерлі болмақ!
							</p>
							<p
								className={`text-lg text-gray-800 leading-relaxed ${notoSansKR.className}`}
							>
								Қазақтың дәстүрлі үйлену тойы ма, әлде заманауи туған күн
								мерекесі ме — бізбен бірге бәрі де ерекше болады! Қонақтарыңызды
								қазақы нақыштағы интерактивті шақырулармен қуантаңыз!
							</p>
						</div>
					</div>
				</section>
				<section className="">
					<div className="">
						<h1 className="text-4xl">Hello</h1>
					</div>
				</section>
			</main>

			<Tittle text="asdf" />
			<Tittle text="asdf" />
			<Link href="/constructor">constructor</Link>
		</div>
	);
}
