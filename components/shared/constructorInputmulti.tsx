"use client"
import { FC, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { BookType, CaseSensitive, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fonts } from "@/app/store/main-data";
interface ConstructorInputProps {
	className?: string;
	title?: string;
	units?: string;
	// params: [string, number][] ;
}
interface ConstructorInputMultiProps {
	params: {value:string,label:string,} ;
}


  

export const ConstructorInputMulti: FC<ConstructorInputProps & ConstructorInputMultiProps> = ({
	className,
	title,
	units,
	params,
}) => {
	const [open, setOpen] =useState(false)
  const [value, setValue] =useState("lato")
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
       <CaseSensitive  size={20} strokeWidth={0.75} />
          {value
            ? fonts.find((font) => font.value === value)?.label
            : "Select font..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search font..." className="h-9" />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup>
              {fonts.map((font) => (
                <CommandItem
                  key={font.value}
                  value={font.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {font.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === font.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
	);
};