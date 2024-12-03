"use client";
import React, { FC, FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTrackRsvp } from "@/lib/RsvpTracker";

interface rsvpProps {
	className?: string;
	id?: string;
}

export const Rsvp: FC<rsvpProps> = ({ className, id }) => {
	const { TrackRsvp, pending, error, isSuccess } = useTrackRsvp();
	const [name, setName] = useState("");
	const [who, setWho] = useState("");
  const [submitted, setSubmitted] = useState(false);
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
    // @ts-ignore
		TrackRsvp(id, { FullName: name, WhoAreYou: who });
    setSubmitted(true);
	};

	return (
		<div className={cn("p-5", className)}>
			<form onSubmit={handleSubmit}>
				<div className="m-2">
					<label className="mb-1" htmlFor="name">
						Name:
					</label>
					<Input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="m-2">
					<label className="mb-1" htmlFor="who">
						Who are you:
					</label>
					<Input
						type="text"
						id="who"
						name="who"
						value={who}
						onChange={(e) => setWho(e.target.value)}
					/>
				</div>
				{id && (
					<Button type="submit" disabled={pending}>
						Submit
					</Button>
				)}
				{error && <p className="error">{error.message}</p>}
				{isSuccess && submitted && <p className="success">RSVP submitted successfully! 
          <br />
            You can submit another RSVP if you want.
          </p>}
			</form>
		</div>
	);
};
