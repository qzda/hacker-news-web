import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
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
  },
  shortcuts: {
    "border-base": ["border border-gray-300 rounded outline-none px-1"],
    "shadow-base": ["shadow-sm  dark:shadow-gray-800 outline-none"],
    btn: [
      "border-base",
      "shadow-base hover:shadow-lg active:shadow-sm",
      "cursor-pointer",
      "px-4 py-1",
      "hover:translate-y--0.5 active:translate-y-0",
      "transition-all",
    ],
    link: ["cursor-pointer", "hover:underline"],
  },
  presets: [
    presetMini({
      dark: "media",
    }),
    presetWind4(),
    presetAttributify(),
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
