"use client";
import React, { FC, use } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "./Modal";
import { useLikedTemplateIdStore, useModalStore, useSessionStore } from "@/app/store/store";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import EmblaCarousel from "../ui/EmblaCarousel";
import { HeartOff, HeartIcon, X, EditIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { El_Messiri } from "next/font/google";
import Link from "next/link";
interface TemplateModalProps {
	className?: string;
}

const elMesiri = El_Messiri({
	weight: "400",
	subsets: ["latin", "cyrillic"],
});

export const TemplateModal: FC<TemplateModalProps> = ({ className }) => {
	const isOpen = useModalStore((state) => state.isOpen);
	const closeModal = useModalStore((state) => state.closeModal);
	const modalValue = useModalStore((state) => state.modalValue);
	const clickHandler = () => {
		closeModal();
	};
	const likedTemplates = useLikedTemplateIdStore(
		(state) => state.likedTemplateIds,
	);
	const isLiked = modalValue ? likedTemplates.includes(modalValue.id) : false;
	const addLikedTemplateId = useLikedTemplateIdStore(
		(state) => state.addLikedTemplateId,
	);
	const removeLikedTemplateId = useLikedTemplateIdStore(
		(state) => state.removeLikedTemplateId,
	);
	const handleLike = () => {
		if (modalValue) {
			likedTemplates.includes(modalValue.id)
				? removeLikedTemplateId(modalValue.id)
				: addLikedTemplateId(modalValue.id);
		}
	};
	const session = useSessionStore((state) => state.user);
	return (
		isOpen &&
		modalValue && (
			<div
				className={cn(
					"motion-preset-focus  top-0 backdrop-blur-sm bg-opacity-50 bg-gray-400 w-screen h-screen flex items-center justify-center fixed z-[51] overflow-hidden",
					className,
				)}
			>
				<div onClick={clickHandler} className="absolute inset-0" />
				<div className="flex gap-4 bg-white w-3/6 p-5 rounded-lg shadow-2xl relative z-10">
					<div className="flex-1">
						{/* <Image
							className="rounded-sm"
							src={modalValue.imageUrl}
							width={200}
							height={550}
							alt={modalValue.description}
						/> */}
						<EmblaCarousel
							slides={modalValue.imagesUrl}
							options={{ loop: true }}
						/>
					</div>
					<div className="flex-1">
						<div className="flex justify-between">
							<h1 className={`text-2xl font-bold mb-1 ${elMesiri.className}`}>
								{modalValue.name}
							</h1>
							<div className="cursor-pointer flex gap-2">
								{session && (
									isLiked ? (
										<div className="group motion-preset-confetti" onClick={handleLike}>
											<span className="group-hover:hidden">
												<HeartIcon size={32} color="#ff0033" />
											</span>
											<span className="hidden group-hover:block">
												<HeartOff size={30} color="#ff0033" />
											</span>
										</div>
									) : (
										<div onClick={handleLike}>
											<HeartIcon size={32} />
										</div>
									)
								)}
								{/* <HeartIcon size={32} color="#ff0033" />{" "}
								<HeartOff size={30} />{" "} */}
								<div onClick={clickHandler} className="">
									{" "}
									<X size={30} />
								</div>
							</div>
						</div>

						<p className=" min-h-4/5  ">{modalValue.description}</p>
						<div className="flex gap-2 cursor-default">
							{modalValue.tags.map((tag) => (
								// <span className=' bg-slate-500 text-white p-1 px-2 rounded-sm' key={tag}>{tag}</span>
								<Badge
									key={tag}
									variant="default"
									className="mt-2 bg-[#2596be]"
								>
									{tag}
								</Badge>
							))}
						</div>
						{session && (<div className="flex justify-end w-full">
							<Link onClick={clickHandler} href={`/templates/edit/${modalValue.id}?template=true`} className="flex gap-4 bg-[#2596be] text-white rounded-sm py-2 px-4 hover:motion-preset-stretch  motion-ease-spring-smooth">
								Edit <EditIcon size={24} />
							</Link>
						</div>)}
						
					</div>
				</div>
			</div>
		)
	);
};
