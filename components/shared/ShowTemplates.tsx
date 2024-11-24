"use client";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import {
	useFilterStore,
	useLikedTemplateIdStore,
	useModalStore,
	useTemplateStore,
} from "@/app/store/store";
import { TemplateCard } from "./TemplateCard";

interface ShowTemplatesProps {
	className?: string;
}

export const ShowTemplates: FC<ShowTemplatesProps> = ({ className }) => {
	const search = useFilterStore((state) => state.search);
	const tags = useFilterStore((state) => state.tags);
	const extraTags = useFilterStore((state) => state.extraTags);
	const sortBy = useFilterStore((state) => state.sortBy);
	const templates = useTemplateStore((state) => state.templates);
	const likedTemplates = useLikedTemplateIdStore(
		(state) => state.likedTemplateIds,
	);
	const openModal = useModalStore((state) => state.openModal);
	const filteredTemplates = templates
	.filter((template) => {
		return (
			template.name.toLowerCase().includes(search.toLowerCase()) ||
			template.description
				.toLowerCase()
				.includes(search.toLowerCase())
		);
	})
	.filter((template) => {
		return tags.every((tag) => template.tags.includes(tag));
	})
	.filter((template) => {
		if (extraTags.includes("liked")) {
			return likedTemplates.includes(template.id);
		}
		return true;
	})
	.sort((a, b) => {
		if (sortBy === "asc") {
			return a.name.localeCompare(b.name);
		} else if (sortBy === "desc") {
			return b.name.localeCompare(a.name);
		} else {
			return 0;
		}
	})
	return (
		<div className="pt-16">
			{filteredTemplates && (
				<p className="text-center text-gray-500">
					{filteredTemplates.length} templates found
				</p>
			)}
			<div
				className={cn("flex justify-center flex-wrap gap-5 ", className)}
			>
				{templates &&
					filteredTemplates
						.map((template) => (
							<TemplateCard
								key={template.id}
								onOpen={() => openModal(template)}
								template={template}
								isLiked={likedTemplates.includes(template.id)}
							/>
						))}
			</div>
		</div>
	);
};
