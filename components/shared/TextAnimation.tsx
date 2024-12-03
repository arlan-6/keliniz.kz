import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const AnimatedText = ({ text }:{text:string}) => {
	const controls = useAnimation();
	const [ref, inView] = useInView({ triggerOnce: true });

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	const wordAnimation = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				staggerChildren: 0.01,
			},
		},
	};

	const letterAnimation = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={wordAnimation}
			className="flex flex-wrap"
		>
			{text.split(" ").map((word, index) => (
				<motion.span key={index} variants={letterAnimation} className="mr-2">
					{word}
				</motion.span>
			))}
		</motion.div>
	);
};
