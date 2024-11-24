"use client"
import { FC } from 'react'
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PlacesList } from '../template/default'

interface SelectPlaceProps {
    className?: string
    onSelect?: (location: {
        lat: number;
        lng: number;
    }) => void;
    selected:{
        lat: number;
        lng: number;
    }
}

export const SelectPlace: FC<SelectPlaceProps> = ({ className, onSelect, selected }) => {
   
    
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    React.useEffect(() => {
        const selectedPlace = PlacesList.find((place) => place.location.lat === selected.lat && place.location.lng === selected.lng)
        setValue(selectedPlace ? selectedPlace.id : "")
    }, [selected])
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? PlacesList.find((place) => place.id === value)?.name
                        : "Select place..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search place..." />
                    <CommandList>
                        <CommandEmpty>No place found.</CommandEmpty>
                        <CommandGroup>
                            {PlacesList.map((place) => (
                                <CommandItem
                                    key={place.id}
                                    value={place.id}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        if (onSelect && currentValue !== value) {
                                            const selectedPlace = PlacesList.find((p) => p.id === currentValue)
                                            if (selectedPlace) {
                                                onSelect({ lat: selectedPlace.location.lat, lng: selectedPlace.location.lng })
                                            }
                                        }
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === place.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {place.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}