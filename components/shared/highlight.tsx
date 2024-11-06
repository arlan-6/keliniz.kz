"use client";
import React, { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { NumberSize, Resizable } from "re-resizable";
import Draggable, { DraggableData } from "react-draggable";
import { MainPropertiesType, MultipleType, ObjectTtype, SingleType } from "@/app/store/store";

interface highlightProps {
	className?: string;
	children: React.ReactNode;
	enableResize: false | "Enable" | undefined;
	bounds: string | false;
	posMain:(ObjectTtype | SingleType | MultipleType)
	sizeMain:(ObjectTtype | SingleType | MultipleType)
}
type ResizeCallback = (
	event: MouseEvent | TouchEvent,
	direction: string,
	refToElement: HTMLElement,
	delta: { width: number; height: number },
) => void;
type DraggableEventHandler = (
	e: MouseEvent,
	data: DraggableData,
) => void | false;

const Highlight: FC<highlightProps> = ({
	className,
	children,
	enableResize,
	bounds,
	posMain,
	sizeMain
}) => {
	const [pos, setPos] = useState<{ x: number; y: number }>({ x: posMain.values[0][1], y: posMain.values[1][1] });
	const [size, setSize] = useState<{ width: number; height: number }>({
		width: sizeMain.values[0][1],
		height:  sizeMain.values[1][1],
	});
	const [additionalPos, setAdditionalPos] = useState<{ x: number; y: number }>(
		pos,
	);

	const resizeHandlerStart = (
		event: MouseEvent | TouchEvent,
		direction: string,
		refToElement: HTMLElement,
	) => {
		setAdditionalPos(pos);
	};

	const resizeHandler: ResizeCallback = (
		event,
		direction,
		refToElement,
		delta,
	) => {
		if (direction == "top" || direction == "left" || direction == "topLeft") {
			const d = {
				...additionalPos,
			};
			setPos((prev) => {
				// console.log(d.x - (delta.width))

				return {
					x: d.x - delta.width,
					y: d.y - delta.height,
				};
			});
		} else if (direction == "bottomLeft") {
			const d = {
				...additionalPos,
			};
			setPos((prev) => {
				return {
					x: d.x - delta.width,
					y: d.y - 0,
				};
			});
		} else if (direction == "topRight") {
			const d = {
				...additionalPos,
			};
			setPos((prev) => {
				return {
					x: d.x - 0,
					y: d.y - delta.height,
				};
			});
		}

		// console.log(event)
		// // console.log(delta)
		// console.log(direction)
	};
	const resizeHandlerStop: ResizeCallback = (
		event,
		direction,
		refToElement,
		delta,
	) => {
		setSize((prev) => ({
			width: prev.width + delta.width,
			height: prev.height + delta.height,
		}));
		// setPos(additionalPos)
	};

	const dragHandler: DraggableEventHandler = (e, data) => {
		// console.log(data.x+'=x')
		const d = { x: data.x, y: data.y };
		setPos(d);
	};

	return (
		<Draggable
			handle=".handler"
			bounds={bounds}
			position={pos}
			onStop={dragHandler}
		>
			<Resizable
				enable={enableResize}
				onResizeStart={resizeHandlerStart}
				onResize={resizeHandler}
				onResizeStop={resizeHandlerStop}
				maxHeight={400}
				maxWidth={600}
				minHeight={20}
				minWidth={20}
				size={size}
				defaultSize={{ width: 200, height: 100 }}
				className={cn("", className)}
			>
				<div className="h-1 w-1 bg-teal-800 -top-1 -left-1 -z-10 absolute after:block after:content-[''] after:absolute after:top-1 after:bg-teal-800 after:h-1 after:w-1  before:block before:content-[''] before:absolute before:left-1 before:bg-teal-800 before:h-1 before:w-1"></div>
				<div className="h-1 w-1 bg-teal-800 -top-1 -right-1 -z-10 absolute after:block after:content-[''] after:absolute after:top-1 after:bg-teal-800 after:h-1 after:w-1  before:block before:content-[''] before:absolute before:right-1 before:bg-teal-800 before:h-1 before:w-1"></div>
				<div className="h-1 w-1 bg-teal-800 -bottom-1 -left-[4px] -z-10 absolute after:block after:content-[''] after:absolute after:bottom-1 after:bg-teal-800 after:h-1 after:w-1  before:block before:content-[''] before:absolute before:left-1 before:bg-teal-800 before:h-1 before:w-1"></div>
				<div className="h-1 w-1 bg-teal-800 -bottom-1 -right-1 -z-10 absolute after:block after:content-[''] after:absolute after:bottom-1 after:bg-teal-800 after:h-1 after:w-1  before:block before:content-[''] before:absolute before:right-1 before:bg-teal-800 before:h-1 before:w-1"></div>
				<div className="flex justify-center items-center w-full h-full absolute z-[1]">
					<div className="handler h-2 w-2 rounded-md cursor-move bg-indigo-500    inset-0"></div>
				</div>

				<main className="bg-transparent ">{children}</main>
				<div className="absolute -bottom-5 text-[10px] backdrop-blur-sm min-w-48">
					x={pos.x} | y={pos.y} | width={size.width} | height={size.height}
				</div>
			</Resizable>
		</Draggable>
	);
};
export default Highlight;
