'use client'
import React, { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { useDeleteRsvp, useTrackRsvp } from "@/lib/RsvpTracker";

interface RsvpListProps {
    className?: string;
    data: {
        rsvp: {
            FullName: string;
            WhoAreYou: string;
        }[];
    };
    inviteId: string;
}

const RsvpItem: FC<{ rsvp: { FullName: string; WhoAreYou: string }; onDelete: () => void }> = ({ rsvp, onDelete }) => (
    <div className="flex gap-2 mb-3 group  p-2 rounded">
        <div className="border group-hover:border-black p-2 text-sm flex items-center gap-3 rounded w-full">
            <p>
                <span className="text-gray-500 text-xs"> Name:</span> {rsvp.FullName}
            </p>
            <p>
                <span className="text-gray-500 text-xs"> Who: </span> {rsvp.WhoAreYou}
            </p>
        </div>
        <Button variant={"outline"} className="p-2 py-1 text-xs rounded group-hover:border-black" onClick={onDelete}>
            <Trash2 size={16} strokeWidth={1.2} />
        </Button>
    </div>
);

export const RsvpList: FC<RsvpListProps> = ({ className, data, inviteId }) => {
    const { pending, error, TrackRsvp } = useTrackRsvp();
    const { pending: deletePending, error: deleteError, TrackRsvp: deleteRsvp } = useDeleteRsvp();

    const [name, setName] = useState("");
    const [who, setWho] = useState("");
    const [rsvpList, setRsvpList] = useState(data.rsvp);

    const handleAddRsvp = () => {
        if (name && who) {
            const newRsvp = { FullName: name, WhoAreYou: who };
            TrackRsvp(inviteId, newRsvp);
            setRsvpList([...rsvpList, newRsvp]);
            setName("");
            setWho("");
        }
    };

    const handleDeleteRsvp = (rsvpToDelete: { FullName: string; WhoAreYou: string }) => {
        deleteRsvp(inviteId, rsvpToDelete);
        setRsvpList(rsvpList.filter(rsvp => rsvp.FullName !== rsvpToDelete.FullName || rsvp.WhoAreYou !== rsvpToDelete.WhoAreYou));
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">RSVP List</h2>
            <span className="text-sm text-gray-600">{rsvpList.length} {rsvpList.length === 1 ? "person" : "people"} attending</span>
            </div>
            <div className="border border-black rounded p-3 mb-3 text-sm flex gap-2">
            <Input
                className="focus-visible:border-black focus-visible:ring-0 text-xs rounded border"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                className="focus-visible:border-black focus-visible:ring-0 text-xs rounded border"
                placeholder="Who"
                value={who}
                onChange={(e) => setWho(e.target.value)}
            />
            <Button
                variant={"outline"}
                className="text-xs p-2 py-1 rounded hover:border-black"
                onClick={handleAddRsvp}
                disabled={pending || !name || !who}
            >
                <Plus size={16} strokeWidth={1} />
            </Button>
            </div>
            {error && <p className="text-red-500 text-xs">{error.message}</p>}
            <div className="border border-black rounded p-3 space-y-2 max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 rounded-tr-none rounded-br-none">
  {rsvpList.map((rsvp, i) => (
    <RsvpItem
      key={i}
      rsvp={rsvp}
      onDelete={() => handleDeleteRsvp(rsvp)}
    />
  ))}
</div>
            {deleteError && <p className="text-red-500 text-xs">{deleteError.message}</p>}
        </div>
    );
};
