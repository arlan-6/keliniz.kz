"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LucideLayoutTemplate, UserPen } from "lucide-react";

export default function Radio19() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get the 'billing' parameter from the URL, default to 'on'
  const selectedValue = searchParams.get("template") || "on";

  const handleValueChange = (value: string) => {
    // Create a new URLSearchParams object to modify the query parameters
    const params = new URLSearchParams(searchParams as any);
    params.set("template", value);

    // Update the URL without reloading the page
    router.replace(`${pathname}?${params.toString()}`,{scroll:false});
  };

  return (
    <div className="inline-flex h-9 rounded-lg bg-input/50 p-0.5">
      <RadioGroup
        value={selectedValue}
        onValueChange={handleValueChange}
        className="group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-background after:shadow-sm after:shadow-black/5 after:ring-offset-background after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:ring-2 has-[:focus-visible]:after:ring-ring has-[:focus-visible]:after:ring-offset-2 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
        data-state={selectedValue}
      >
        <label className="gap-2 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center whitespace-nowrap px-4 group-data-[state=on]:text-muted-foreground/70">
        User Edited Templates{" "}<UserPen size={16} strokeWidth={1.5} />
            <RadioGroupItem value="off" className="sr-only" />
        </label>
        <label className="gap-2 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center whitespace-nowrap px-4 group-data-[state=off]:text-muted-foreground/70">
          
            
            All Templates {" "}<LucideLayoutTemplate size={16}/>
          <RadioGroupItem value="on" className="sr-only" />
        </label>
      </RadioGroup>
    </div>
  );
}