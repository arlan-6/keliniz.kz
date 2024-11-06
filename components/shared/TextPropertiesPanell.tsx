import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { TextConfig } from "@/app/store/store";
import { InputNumber } from "../ui/inputNumber";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface TextPropertiesPanellProps {
	className?: string;
	element: TextConfig;
}

export const TextPropertiesPanell: FC<TextPropertiesPanellProps> = ({
	className,
	element,
}) => {
	return (
		<div className={cn("", className)}>
			<InputNumber value={element.name} beforeInput="Name" />
			<Input value={element.text} />
			<div className="">
				Position
				<div className="flex">
					<InputNumber value={element.x} beforeInput="X" />
					<InputNumber value={element.y} beforeInput="Y" />
				</div>
				<InputNumber value={element.zIndex} beforeInput="Z" />
			</div>
			<div className="">
				Size
				<div className="flex">
					<InputNumber value={element.width} beforeInput="Width" />
					<InputNumber value={element.height} beforeInput="Height" />
				</div>
			</div>

			<div className="">
				Scale
				<div className="flex">
					<InputNumber value={element.scaleX} beforeInput="X" />
					<InputNumber value={element.scaleY} beforeInput="Y" />
				</div>
			</div>
			<div className="">
				Opacity
				<InputNumber value={element.opacity} beforeInput="Opacity" />
			</div>
			<div className="">
				<Badge>Text</Badge>
				<InputNumber value={element.fontSize} beforeInput="Font Size" />
                <InputNumber value={element.lineHeight} beforeInput="Line Height" />
                <InputNumber value={element.letterSpacing} beforeInput="Letter Spacing" />
                <InputNumber value={element.fontWeight} beforeInput="Font Weight" />
                <InputNumber value={element.fontStyle} beforeInput="Font Style" />
                <InputNumber value={element.textDecoration} beforeInput="Text Decoration" />
                <InputNumber value={element.textAlign} beforeInput="Text Align" />
                
			</div>


		</div>
	);
};
