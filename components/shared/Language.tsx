'use client'
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const LanguageSelect = () => {
  const [language, setLanguage] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "Kz";
    }
    return "Kz";
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-15 focus:outline-none">
        <SelectValue placeholder="Kz" />
      </SelectTrigger>
      <SelectContent className="w-15">
        <SelectGroup className="w-15">
          <SelectItem value="Kz" className="w-15">Kz</SelectItem>
          <SelectItem value="Ru" className="w-15">Ru</SelectItem>
          <SelectItem value="En" className="w-15">En</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
