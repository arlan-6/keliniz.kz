import React, { FC } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
interface homePageCaruselProps {
	className?: string;

	slides: {
		src: string;
		title: string;
		description: string;
	}[];
	options?: EmblaOptionsType;
}

export const HomePageCarusel: FC<homePageCaruselProps> = ({
	className,
	slides,
	options,
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, loop: true }, [
		Autoplay(),
	]);

	return (
		<section className="embla max-w-full">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{slides.map((index) => (
						<div
							style={{ flex: " 0 0 40%" }}
							className="embla__slide w-1/2 mr-5 border p-6 rounded-xl shadow-xl select-none flex items-center bg-white bg-opacity-40 "
							key={index.title}
						>
							<div className="flex items-center">
								<div className="flex-shrink-0 mr-6 transition-transform transform hover:scale-105">
									<Image
										src={index.src}
										alt={index.title}
										width={250}
										height={150}
										className="rounded-xl embla__slide__img"
									/>
								</div>
								<div className="flex-grow transition-transform transform hover:scale-105">
									<h2 className="text-2xl font-bold mb-3 text-gray-900">
										{index.title}
									</h2>
									<p className="text-gray-700 text-lg">{index.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
