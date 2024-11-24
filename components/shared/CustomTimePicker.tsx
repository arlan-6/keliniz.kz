'use client';
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Clock } from "lucide-react";

interface CustomTimePickerProps {
	className?: string;
    onChange?: (e: any) => void;
    value: string;
}

const isCorrectTime = (time: string) => {
	if(time.length !== 4) return false  
    const hours = parseInt(time.slice(0, 2), 10);
    const minutes = parseInt(time.slice(2), 10);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export const CustomTimePicker: FC<CustomTimePickerProps> = ({ className, onChange,value }) => {
    const [correctTime, SetCorrectTime] = React.useState(true);
	return (
		<div className={cn(`${!correctTime ? 'text-red-500':'text-black'}`, className)}>
			<InputOTP
            value={value}
				maxLength={4}
				className="max-w-full "
				pattern={REGEXP_ONLY_DIGITS}
				onChange={(e) => {
                    // if (e.length===4 && isCorrectTime(e)){
					onChange && onChange(e);
                    SetCorrectTime(isCorrectTime(e));
				}}
			>
				<Clock strokeWidth={1} />
				<InputOTPGroup >
					<InputOTPSlot index={0}/>
					<InputOTPSlot index={1} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	);
};
