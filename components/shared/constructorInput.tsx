"use client";
import React, {
	FC,
	ForwardRefExoticComponent,
	RefAttributes,
	useEffect,
	useState,
} from "react";
import { cn } from "@/lib/utils";
import { InputNumber } from "../ui/inputNumber";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { textAlign, typography } from "@/app/store/main-data";
import { icons, LucideProps } from "lucide-react";
import { useBloksList } from "@/app/store/store";

interface ConstructorInputProps {
	className?: string;
	title?: string;
	units?: string;
	// params: [string, number][] ;
}

interface ConstructorInputObjectProps {
	params: [string, number, string][];
	cols?: number;
	activeElemevtId:number
}

export const ConstructorInputObject: FC<
	ConstructorInputProps & ConstructorInputObjectProps
> = ({ className, title, units, params, cols = 1,activeElemevtId }) => {

	
	const updateProp = useBloksList(state=>state.updateProp)

	const [val, setVal] = useState<[string, number, string][]>(params);

	// Update the handler to properly update the state
	const OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newValue = parseFloat(e.target.value);
		// Update the state by creating a new array with the updated value
		const updatedVal = [...val];
		updatedVal[index] = [updatedVal[index][0], newValue, updatedVal[index][2]];
		setVal(updatedVal);
		updateProp(activeElemevtId,index,{values:[...val]})
	};

	return (
		<div className={`flex flex-wrap ${params.length == 1 ? "w-1/2" : ""}`}>
			{val.map((str: [string, number, string], index) => (
				<div key={index} className={`${params.length != 1 ? `w-1/${cols}` : ""}`}>
					<InputNumber
						className="appearance-none"
						type="number"
						placeholder="123.."
						beforeInput={str[0]}
						value={str[1]}
						afterInput={units}
						onChange={(e) => OnChangeHandler(e, index)} // Correctly call the handler
					/>
				</div>
			))}
		</div>
	);
};

interface ConstructorInputSingleProps {
	params: string | number;
	type: "multiple" | "single" | "";
	listKey: string;
}

export const ConstructorInputSingle: FC<
	ConstructorInputProps & ConstructorInputSingleProps
> = ({ className, title, units, params, type, listKey }) => {
	if (listKey !== "color" && type != "") {
		var buttonsList: {
			value: string;
			icon: ForwardRefExoticComponent<
				Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
			>;
			strokeWidth: number;
		}[] = [];
		if (listKey == "textAlign") {
			buttonsList = textAlign;
		} else if (listKey == "typography") {
			buttonsList = typography;
		}
		return (
			<div className="flex w-1/2">
				<ToggleGroup type={type}>
					{buttonsList.map((o) => {
						return (
							<ToggleGroupItem key={o.value} value={o.value}>
								<o.icon size={16} strokeWidth={o.strokeWidth} />
							</ToggleGroupItem>
						);
					})}
					{/* <ToggleGroupItem value="a">A</ToggleGroupItem>
				<ToggleGroupItem value="b">B</ToggleGroupItem>
				<ToggleGroupItem value="c">C</ToggleGroupItem> */}
				</ToggleGroup>
			</div>
		);
	} else {
		const [color, setColor] = useState("");
		const colorPeekHandle = (e: any) => {
			var value: string = e.target.value;
			setColor("#" + value);
		};
		return (
			<div className="flex w-1/1">
				<Input
					className="w-1/3 p-1"
					type="color"
					onChange={(e) => {
						setColor(e.target.value);
					}}
					value={color}
				/>
				<InputNumber
					beforeInput="#"
					value={color.slice(1)}
					onChange={colorPeekHandle}
					placeholder="131313"
				/>
			</div>
		);
	}
};
{
	/* <AlignStartVertical size={16} strokeWidth={1} /> */
}
