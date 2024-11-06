import { AlignCenterVertical, AlignEndVertical, AlignStartVertical, Bold, Italic, Strikethrough, Underline } from "lucide-react";

export const fonts = [
    {
      value: "roboto",
      label: "Roboto",
    },
    {
      value: "open-sans",
      label: "Open Sans",
    },
    {
      value: "lato",
      label: "Lato",
    },
    {
      value: "montserrat",
      label: "Montserrat",
    },
    {
      value: "source-sans-pro",
      label: "Source Sans Pro",
    },
  ];

  export const textAlign = [
    {
        value:"left",
        icon:AlignStartVertical,
        strokeWidth:1
    },
    {
        value:"center",
        icon:AlignCenterVertical ,
        strokeWidth:1
    },
    {
        value:"right",
        icon:AlignEndVertical ,
        strokeWidth:1
    },
  ]
  export const typography = [
    {
        value:"bold",
        icon:Bold,
        strokeWidth:2.75
    },
    {
        value:"italic",
        icon:Italic,
        strokeWidth:1.5
    },
    {
        value:"underline",
        icon:Underline,
        strokeWidth:1.5
    },
    {
        value:"strikethrough",
        icon:Strikethrough,
        strokeWidth:1.5
    },

  ]