import {
  defineConfig,
  presetIcons,
  presetMini,
  presetWebFonts,
  presetWind4,
} from "unocss";

export default defineConfig({
  theme: {
    // https://unocss.dev/presets/wind3#animates
    animation: {
      keyframes: {
        rotate: "{0% { rotate: 0deg; } 100% { rotate: 360deg; }}",
      },
      durations: {
        rotate: "1s",
      },
      properties: {
        rotate: { "transform-origin": "center" },
      },
      counts: {
        rotate: "infinite",
      },
    },
    breakpoints: {
      sm: "430px",
    },
    colors: {
      primary: "#ff6600",
    },
  },
  shortcuts: {
    link: "cursor-pointer hover:underline hover:text-primary!",
    "bg-base": "bg-white dark:bg-[#181818]!",
    "color-base": "text-gray-900 dark:text-gray-300",
    "shadow-base": ["shadow-sm  dark:shadow-gray-800 outline-none"],
    "icon-button": "op50 hover:op100 my-auto shrink-0 cursor-pointer",
    btn: [
      "border-base rounded",
      "shadow-base hover:shadow-lg active:shadow-sm",
      "cursor-pointer",
      "px-4 py-1",
      "hover:translate-y--0.5 active:translate-y-0",
      "transition-all",
    ],
    "border-base": [
      "border-1 rounded",
      "border-hex-888/15",
      "dark:border-dark-100 dark:border-transparent",
    ],
  },
  presets: [
    presetMini({
      dark: "media",
    }),
    presetWind4(),
    presetWebFonts({
      provider: "none",
      fonts: {
        serif: ["PT Serif", "ui-serif", "serif"],
      },
    }),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
  ],
});
