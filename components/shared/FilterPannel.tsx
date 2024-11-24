"use client";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { ArrowUpDown, Gift, Heart, MapIcon, Table2, TimerIcon, Trash2 } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "@/app/store/store";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
interface FilterPannelProps {
	className?: string;
}

export const FilterPannel: FC<FilterPannelProps> = ({ className }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const setSearch = useFilterStore((state) => state.setSearch);
	const setSort = useFilterStore((state) => state.setSortBy);
	const setTags = useFilterStore((state) => state.setTags);
	const setExtraTags = useFilterStore((state) => state.setExtraTags);
	const tags = useFilterStore((state) => state.tags);
	const search = useFilterStore((state) => state.search);
	const extraTags = useFilterStore((state) => state.extraTags);
	const sortBy = useFilterStore((state) => state.sortBy);
	const { data: session } = useSession();
	const reset = useFilterStore((state) => state.reset);
	const resetHandler = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		reset();
	}
	return (
		<div className={cn("w-full flex justify-center", className)}>
			<div className="w-4/5 flex justify-around gap-10">
				<Input
				value={search}
				ref={inputRef}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					placeholder="Search by name or description"
				/>
				<ToggleGroup
					onValueChange={(e) => {
						setTags(e as ("map" | "rsvp" | "timer" | "free")[]);
					}}
					value={tags}
					type={"multiple"}
				>
					<ToggleGroupItem value={"map"}>
						<MapIcon size={24} strokeWidth={1.5} />
					</ToggleGroupItem>
					<ToggleGroupItem value={"timer"}>
						<TimerIcon size={24} strokeWidth={1.5} />
					</ToggleGroupItem>
					<ToggleGroupItem value={"rsvp"}>
						<Table2 size={24} strokeWidth={1.5} />
					</ToggleGroupItem>
					<ToggleGroupItem value={"free"}>
						<Gift size={24} strokeWidth={1.5} />
					</ToggleGroupItem>
					
				</ToggleGroup>
				<ToggleGroup value={extraTags} type="multiple" onValueChange={(e) => {
						setExtraTags(e as ("liked")[]);
					}}>
					{session && (
						<ToggleGroupItem value={"liked"}>
							<Heart size={24} strokeWidth={1.5} />
						</ToggleGroupItem>
					)}
				</ToggleGroup>
				<Select
				value={sortBy}
					onValueChange={(e) => {
						setSort(e as "asc" | "desc");
					}}
				>
					<SelectTrigger className="w-[180px] flex justify-between">
						<SelectValue placeholder="Sort by" />
						<ArrowUpDown strokeWidth={1} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Sort by</SelectLabel>
							<SelectItem value="asc">asc</SelectItem>
							<SelectItem value="desc">desc</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button
					variant={"outline"}
					onClick={resetHandler}
					className=" rounded-sm py-2 px-4 "
				><Trash2 size={18} strokeWidth={1} className="mr-1"/> Reset</Button>
			</div>
		</div>
	);
};
