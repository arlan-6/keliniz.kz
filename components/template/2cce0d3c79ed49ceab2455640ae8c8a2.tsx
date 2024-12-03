"use client";

import { format } from "date-fns";
import { kk } from "date-fns/locale";
import React, { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface InviteDetails {
	name1: string;
	name2: string;
	date: string;
	time: string;
	location: {
		lat: number;
		lng: number;
	};
}
import { useInviteEditStore } from "@/app/store/store";
import { Timer } from "../shared/Timer";
import { Calendar } from "../ui/calendar";
import GoogleMaps from "../shared/Googlemaps";
import { Rsvp } from "../shared/rsvp";
import { useParams } from "next/navigation";
interface TemplateProps {
	className?: string;
	inviteDetails: InviteDetails;
  }

// image path ⬇️
// /images/template/2cce0d3c79ed49ceab2455640ae8c8a2/
const Template: FC<TemplateProps> = ({ className, inviteDetails }) => {
	const params = useParams();
	const inviteId = params.invite; 
	
	
	const isCorrectTime = (time: string) => {
	  const hours = parseInt(time.slice(0, 2), 10);
	  const minutes = parseInt(time.slice(2), 10);
	  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
	};
  
	let hours = 0;
	let minutes = 0;
	const date = new Date(inviteDetails.date);
	if (inviteDetails.time.length === 4 && isCorrectTime(inviteDetails.time)) {
	  hours = parseInt(inviteDetails.time.slice(0, 2), 10);
	  minutes = parseInt(inviteDetails.time.slice(2), 10);
	  date.setHours(hours, minutes);
	}
  
	const weekdayName = format(date, "EEEE", { locale: kk });
	const monthName = format(date, "LLLL", { locale: kk });
	const capitalizedMonthName =
	  monthName.charAt(0).toUpperCase() + monthName.slice(1);
	const day = format(date, "d", { locale: kk });
	const year = format(date, "yyyy", { locale: kk });
  
	return (
		<div className={cn("", className)}>
			<header>
				
				<div className="max-h-[900px] bg-[url('/images/template/2cce0d3c79ed49ceab2455640ae8c8a2/1.jpg')] bg-cover bg-center w-full aspect-[3/5] text-white flex justify-center items-center">
					<div className="">
						<div className="text-2xl flex gap-4">
							<span>{inviteDetails.name1}</span>
							<span>&</span>
							<span>{inviteDetails.name2}</span>
						</div>
						<div className="text-center mt-8">{date.toLocaleDateString()}</div>
					</div>
				</div>
			</header>
			<main>
				<section className="text-center">
				<Timer className="text-2xl" expiryTimestamp={date} />

				</section>
				<section className="p-4 py-14 bg-[#fcf8e4] text-center">
					<h1 className="pb-10 text-3xl font-bold">Құрметті қонақтар! </h1>
					<p className="text-xl">
						Біздің өміріміздегі ең маңызды мерей тойымызға сізді шақыруымызға
						қуаныштымыз!
					</p>
					<div className="m-5 flex justify-center">
						<Image
							src="/images/template/2cce0d3c79ed49ceab2455640ae8c8a2/t.webp"
							alt=""
							width={120}
							height={100}
						/>
					</div>
					<p className="text-xl">
						Ұлымыз Бақдаулет пен келініміз Айяның үйлену тойларына арналған
						салтанатты дастарханымыздың қадірлі қонағы болуға шағырамыз.
					</p>
				</section>
				<section className="p-10 text-center">
					<div className="flex gap-4 justify-center items-center">
						<div className="border-t-2 border-b-2 border-black w-20 py-2">
							{hours}:{minutes}
						</div>
						<div className=" flex flex-col">
							<div className="text-xl">{day}</div>
							<div className="text-2xl">{capitalizedMonthName}</div>
							<div className="">{year}</div>
						</div>
						<div className="border-t-2 border-b-2 border-black w-20 py-2">
							{weekdayName.toUpperCase()}
						</div>
					</div>
					<div className="flex justify-center p-6 text-lg">
						<Calendar
							components={{
								Caption: () => null,
							}}
							month={date}
							disableNavigation
							locale={kk}
							weekStartsOn={1}
							toDate={date}
							selected={date}
							defaultMonth={date}
						/>
					</div>
				</section>
				<section>{inviteDetails.location.lat}</section>
				<section></section>
				<section>rsvp</section>
				<section>inviteDetails</section>
				{/* <Map /> */}
				<GoogleMaps location={inviteDetails.location}/>
				<Rsvp id={inviteId as string}/>
			</main>
			<footer>
				<p>Footer content</p>
			</footer>
		</div>
	);
};
export default Template;
