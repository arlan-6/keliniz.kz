"use client";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useInviteEditStore } from "@/app/store/store";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { TimePickerDemo } from "./time-picker-demo";
import { TimePickerInput } from "./time-picker-input";
import { Button } from "../ui/button";
import { CustomTimePicker } from "./CustomTimePicker";
import { SelectPlace } from "./SelectPlace";
import { use, useEffect, useState } from "react";
import { InputNumber } from "../ui/inputNumber";
import { set } from "date-fns";
import { Ban, Save, SpellCheck } from "lucide-react";
import { Toaster } from "../ui/sonner";
export function AppSidebar() {
	const [isInviteNameChanged, setIsInviteNameChanged] = useState(false);
	const inviteDetails = useInviteEditStore((s) => s.inviteDetails);
	const inviteName = useInviteEditStore((s) => s.inviteName);
	const setInvitename = useInviteEditStore((s) => s.setInviteName);
	const setName1 = useInviteEditStore((s) => s.setName1);
	const setName2 = useInviteEditStore((s) => s.setName2);
	const setDate = useInviteEditStore((s) => s.setDate);
	const setTime = useInviteEditStore((s) => s.setTime);
	const setChanged = useInviteEditStore((s) => s.setChanged);
	const isChanged = useInviteEditStore((s) => s.isChanged);
	const setLocation = useInviteEditStore((s) => s.setLocation);
	const save = useInviteEditStore((s) => s.save);
	const [invitenamevalue, setInviteNameValue] = useState("");
	useEffect(() => {
		setInviteNameValue(inviteName);
	}, [inviteName]);
	return (
		<Sidebar className="pt-20">
			<SidebarContent
				className="[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
			>
				<SidebarGroup className=" p-8">
					<SidebarGroupContent className="border-b-2 pb-3 ">
						<SidebarGroupLabel>
							Invite Name:
							{/* <Input
							onChange={(e) => {
								setInvitename(e.target.value);
								setChanged(true);
							}}
							value={inviteName}
						/> */}
							<InputNumber
								className="text-2xl text-black"
								type="string"
								onChange={(e) => {
									if (e.target.value === inviteName) {
										setIsInviteNameChanged(false);
									} else {
										setIsInviteNameChanged(true);
									}
									setInviteNameValue(e.target.value);
								}}
								value={invitenamevalue}
							/>
							{isInviteNameChanged && (
								<div className="flex gap-2 ">
									<Button
										onClick={() => {
											setInvitename(invitenamevalue);
											setChanged(true);
											setIsInviteNameChanged(false);
										}}
										className="p-1 px-2  bg-green-600 hover:bg-green-700  motion-preset-expand motion-duration-100"
									>
										<SpellCheck size={16} />
									</Button>
									<Button
										onClick={() => {
											setInviteNameValue(inviteName);
											setIsInviteNameChanged(false);
										}}
										className="p-1 px-2  bg-red-600 hover:bg-red-500  motion-preset-expand motion-duration-100"
									>
										<Ban size={16} />
									</Button>
								</div>
							)}
						</SidebarGroupLabel>
					</SidebarGroupContent>
					<SidebarGroupContent>
						<SidebarGroupLabel>Name 1:</SidebarGroupLabel>
						<Input
							onChange={(e) => {
								setName1(e.target.value);
								setChanged(true);
							}}
							value={inviteDetails.name1}
						/>
						<SidebarGroupLabel>Name 2:</SidebarGroupLabel>
						<Input
							onChange={(e) => {
								setName2(e.target.value);
								setChanged(true);
							}}
							value={inviteDetails.name2}
						/>
						<SidebarGroupLabel>Date:</SidebarGroupLabel>
						<Calendar
							weekStartsOn={1}
							className="text-sm rounded-md border flex justify-center items-center"
							mode="single"
							selected={inviteDetails.date}
							// {/*@ts-ignore */}
							onSelect={(date) => {
								date && setDate(date);
								setChanged(true);
							}}
						/>
						<SidebarGroupLabel>Time:</SidebarGroupLabel>
						{/* <TimePickerDemo date={inviteDetails.time} setDate={setTime}/> */}
						<CustomTimePicker
							onChange={(time) => {
								setTime(time);
								setChanged(true);
							}}
							value={inviteDetails.time}
						/>
						<SidebarGroupLabel>Location:</SidebarGroupLabel>
						<SelectPlace
							onSelect={(location) => {
								setLocation(location);
								setChanged(true);
							}}
							selected={inviteDetails.location}
						/>
					</SidebarGroupContent>
					<Button
						disabled={!isChanged}
						onClick={save}
						className={`m-2 mt-8 fixed left-3 top-0 flex gap-1 ${
							!isChanged
								? "bg-gray-600 hover:bg-gray-500"
								: "bg-green-600 hover:bg-green-500"
						}`}
					>
						Save <Save size={16} />
					</Button>
				</SidebarGroup>
			</SidebarContent>
			<Toaster closeButton richColors />
		</Sidebar>
	);
}
