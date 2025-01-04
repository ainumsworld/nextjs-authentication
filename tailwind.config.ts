import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        dividerWeight: "0.8px", // h-divider the default height applied to the divider component
        disabledOpacity: 0.48, // this value is applied as opacity-[value] when the component is disabled
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "8px", // rounded-small
          medium: "12px", // rounded-medium
          large: "16px", // rounded-large
        },
        borderWidth: {
          small: "0.5px", // border-small
          medium: "1px", // border-medium (default)
          large: "2px", // border-large
        },
      },
      themes: {
        light: {
          layout: {
            hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              // shadow-small
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              // shadow-medium
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              // shadow-large
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            },
          },
          colors: {
            // layout
            background: "#FFFFFF",
            foreground: "#11181C",
            divider: "rgba(145, 158, 171, 0.2)",
            focus: "#00A76F",
            // content
            content1: "#FFFFFF",
            content2: "#F9FAFB",
            content3: "#F4F6F8",
            content4: "#DFE3E8",
            // base
            primary: "#00A76F",
            secondary: "#8E33FF",
            success: "#22C55E",
            warning: "#FFAB00",
            danger: "#FF5630",
            default: {
              "50": "#FCFDFD",
              "100": "#F9FAFB",
              "200": "#F4F6F8",
              "300": "#DFE3E8",
              "400": "#C4CDD5",
              "500": "#919EAB",
              "600": "#637381",
              "700": "#454F5B",
              "800": "#1C252E",
              "900": "#141A21",
              DEFAULT: "#DFE3E8",
            },
          },
        },
        dark: {
          layout: {
            hoverOpacity: 0.9, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              // shadow-small
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
              // shadow-medium
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
              // shadow-large
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            },
          },
          colors: {
            // layout
            background: "#000000",
            foreground: "#ECEDEE",
            divider: "rgba(145, 158, 171, 0.2)",
            focus: "#00A76F",
            // content
            content1: "#141A21",
            content2: "#1C252E",
            content3: "#454F5B",
            content4: "#637381",
            // base
            primary: "#00A76F",
            secondary: "#8E33FF",
            success: "#22C55E",
            warning: "#FFAB00",
            danger: "#FF5630",
            default: {
              "50": "#141A21",
              "100": "#1C252E",
              "200": "#454F5B",
              "300": "#637381",
              "400": "#919EAB",
              "500": "#C4CDD5",
              "600": "#DFE3E8",
              "700": "#F4F6F8",
              "800": "#F9FAFB",
              "900": "#FCFDFD",
              DEFAULT: "#454F5B",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
