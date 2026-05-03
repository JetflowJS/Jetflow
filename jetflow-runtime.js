/*!
 * JetFlow Runtime Engine
 * Browser-only Atomic-Class Workflow compiler for script-tag delivery.
 *
 * This file is intentionally self-contained so it can be published directly to
 * a CDN such as jsDelivr without a build step.
 */
import importedConfig from "./jetflow.config.js";

(function jetflowRuntime(global, document) {
  "use strict";

  if (!global || !document) return;

  var STYLE_ID = "jetflow-runtime-style";
  var VERSION = "0.3.0";
  var TRANSFORM_VALUE = "translate3d(var(--jf-translate-x,0),var(--jf-translate-y,0),0) rotate(var(--jf-rotate,0)) skewX(var(--jf-skew-x,0)) skewY(var(--jf-skew-y,0)) scaleX(var(--jf-scale-x,1)) scaleY(var(--jf-scale-y,1))";
  var FILTER_VALUE = "blur(var(--jf-blur,0)) brightness(var(--jf-brightness,1)) contrast(var(--jf-contrast,1)) grayscale(var(--jf-grayscale,0)) hue-rotate(var(--jf-hue-rotate,0deg)) invert(var(--jf-invert,0)) saturate(var(--jf-saturate,1)) sepia(var(--jf-sepia,0)) drop-shadow(var(--jf-drop-shadow,0 0 #0000))";
  var BACKDROP_FILTER_VALUE = "blur(var(--jf-backdrop-blur,0)) brightness(var(--jf-backdrop-brightness,1)) contrast(var(--jf-backdrop-contrast,1)) grayscale(var(--jf-backdrop-grayscale,0)) hue-rotate(var(--jf-backdrop-hue-rotate,0deg)) invert(var(--jf-backdrop-invert,0)) opacity(var(--jf-backdrop-opacity,1)) saturate(var(--jf-backdrop-saturate,1)) sepia(var(--jf-backdrop-sepia,0))";
  var RING_BOX_SHADOW = "var(--jf-ring-offset-shadow,0 0 #0000),var(--jf-ring-shadow,0 0 #0000),var(--jf-shadow,0 0 #0000)";

  var DEFAULT_CONFIG = {
    autoStart: true,
    reset: true,
    debug: false,
    mutationDebounce: 16,
    darkMode: "both",
    important: false,
    plugins: [],
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    containers: {
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem"
    },
    safelist: [],
    apply: {},
    components: {},
    utilities: {
      "flex-center": "flex items-center justify-center",
      "flex-between": "flex items-center justify-between",
      "flex-around": "flex items-center justify-around",
      "flex-evenly": "flex items-center justify-evenly",
      "grid-center": "grid place-items-center",
      "text-bold": "font-bold",
      "text-muted": "text-gray-500",
      box: "block rounded-md border border-gray-200 bg-white p-4",
      "box-dark": "block rounded-md border border-slate-700 bg-slate-900 p-4"
    },
    theme: {
      colors: {
        inherit: "inherit",
        current: "currentColor",
        transparent: "transparent",
        black: "#000000",
        white: "#ffffff",
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617"
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712"
        },
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a"
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407"
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03"
        },
        yellow: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006"
        },
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16"
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22"
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e"
        },
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344"
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49"
        },
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554"
        },
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b"
        },
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065"
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764"
        },
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724"
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519"
        }
      },
      spacing: {
        0: "0px",
        px: "1px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem"
      },
      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.75rem"],
        "2xl": ["1.5rem", "2rem"],
        "3xl": ["1.875rem", "2.25rem"],
        "4xl": ["2.25rem", "2.5rem"],
        "5xl": ["3rem", "1"],
        "6xl": ["3.75rem", "1"],
        "7xl": ["4.5rem", "1"],
        "8xl": ["6rem", "1"],
        "9xl": ["8rem", "1"]
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900"
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        3: ".75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem"
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
      },
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px"
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px"
      },
      opacity: {
        0: "0",
        5: "0.05",
        10: "0.1",
        20: "0.2",
        25: "0.25",
        30: "0.3",
        40: "0.4",
        50: "0.5",
        60: "0.6",
        70: "0.7",
        75: "0.75",
        80: "0.8",
        90: "0.9",
        95: "0.95",
        100: "1"
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1),0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1),0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1),0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1),0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "0 0 #0000"
      },
      blur: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px"
      },
      brightness: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        200: "2"
      },
      contrast: {
        0: "0",
        50: ".5",
        75: ".75",
        100: "1",
        125: "1.25",
        150: "1.5",
        200: "2"
      },
      saturate: {
        0: "0",
        50: ".5",
        100: "1",
        150: "1.5",
        200: "2"
      },
      hueRotate: {
        0: "0deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        90: "90deg",
        180: "180deg"
      },
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        auto: "auto"
      },
      transitionDuration: {
        0: "0ms",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms"
      },
      transitionTiming: {
        linear: "linear",
        in: "cubic-bezier(0.4,0,1,1)",
        out: "cubic-bezier(0,0,0.2,1)",
        "in-out": "cubic-bezier(0.4,0,0.2,1)"
      },
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9"
      },
      animation: {
        none: "none",
        spin: "jf-spin 1s linear infinite",
        ping: "jf-ping 1s cubic-bezier(0,0,0.2,1) infinite",
        pulse: "jf-pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        bounce: "jf-bounce 1s infinite"
      }
    }
  };

  var KEYFRAMES = {
    spin: "@keyframes jf-spin{to{transform:rotate(360deg)}}",
    ping: "@keyframes jf-ping{75%,100%{transform:scale(2);opacity:0}}",
    pulse: "@keyframes jf-pulse{50%{opacity:.5}}",
    bounce: "@keyframes jf-bounce{0%,100%{transform:translateY(-25%);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;animation-timing-function:cubic-bezier(0,0,.2,1)}}"
  };

  var RESET_CSS = "*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;font-feature-settings:normal;font-variation-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}";

  var directUtilities = {
    "sr-only": {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0,0,0,0)",
      "white-space": "nowrap",
      "border-width": "0"
    },
    "not-sr-only": {
      position: "static",
      width: "auto",
      height: "auto",
      padding: "0",
      margin: "0",
      overflow: "visible",
      clip: "auto",
      "white-space": "normal"
    },
    visible: { visibility: "visible" },
    invisible: { visibility: "hidden" },
    collapse: { visibility: "collapse" },
    static: { position: "static" },
    fixed: { position: "fixed" },
    absolute: { position: "absolute" },
    relative: { position: "relative" },
    sticky: { position: "sticky" },
    isolate: { isolation: "isolate" },
    "isolation-auto": { isolation: "auto" },
    block: { display: "block" },
    inline: { display: "inline" },
    "inline-block": { display: "inline-block" },
    flex: { display: "flex" },
    "inline-flex": { display: "inline-flex" },
    grid: { display: "grid" },
    "inline-grid": { display: "inline-grid" },
    contents: { display: "contents" },
    hidden: { display: "none" },
    table: { display: "table" },
    "table-row": { display: "table-row" },
    "table-cell": { display: "table-cell" },
    "flow-root": { display: "flow-root" },
    "flex-row": { "flex-direction": "row" },
    "flex-row-reverse": { "flex-direction": "row-reverse" },
    "flex-col": { "flex-direction": "column" },
    "flex-col-reverse": { "flex-direction": "column-reverse" },
    "flex-wrap": { "flex-wrap": "wrap" },
    "flex-wrap-reverse": { "flex-wrap": "wrap-reverse" },
    "flex-nowrap": { "flex-wrap": "nowrap" },
    "flex-1": { flex: "1 1 0%" },
    "flex-auto": { flex: "1 1 auto" },
    "flex-initial": { flex: "0 1 auto" },
    "flex-none": { flex: "none" },
    grow: { "flex-grow": "1" },
    "grow-0": { "flex-grow": "0" },
    shrink: { "flex-shrink": "1" },
    "shrink-0": { "flex-shrink": "0" },
    "basis-auto": { "flex-basis": "auto" },
    "basis-full": { "flex-basis": "100%" },
    "grid-flow-row": { "grid-auto-flow": "row" },
    "grid-flow-col": { "grid-auto-flow": "column" },
    "grid-flow-dense": { "grid-auto-flow": "dense" },
    "grid-flow-row-dense": { "grid-auto-flow": "row dense" },
    "grid-flow-col-dense": { "grid-auto-flow": "column dense" },
    "grid-cols-none": { "grid-template-columns": "none" },
    "grid-cols-subgrid": { "grid-template-columns": "subgrid" },
    "grid-rows-none": { "grid-template-rows": "none" },
    "grid-rows-subgrid": { "grid-template-rows": "subgrid" },
    "col-auto": { "grid-column": "auto" },
    "col-span-full": { "grid-column": "1 / -1" },
    "col-start-auto": { "grid-column-start": "auto" },
    "col-end-auto": { "grid-column-end": "auto" },
    "row-auto": { "grid-row": "auto" },
    "row-span-full": { "grid-row": "1 / -1" },
    "row-start-auto": { "grid-row-start": "auto" },
    "row-end-auto": { "grid-row-end": "auto" },
    "float-right": { float: "right" },
    "float-left": { float: "left" },
    "float-none": { float: "none" },
    clear: { clear: "both" },
    "clear-left": { clear: "left" },
    "clear-right": { clear: "right" },
    "clear-both": { clear: "both" },
    "clear-none": { clear: "none" },
    "object-contain": { "object-fit": "contain" },
    "object-cover": { "object-fit": "cover" },
    "object-fill": { "object-fit": "fill" },
    "object-none": { "object-fit": "none" },
    "object-scale-down": { "object-fit": "scale-down" },
    "overflow-auto": { overflow: "auto" },
    "overflow-hidden": { overflow: "hidden" },
    "overflow-clip": { overflow: "clip" },
    "overflow-visible": { overflow: "visible" },
    "overflow-scroll": { overflow: "scroll" },
    "overflow-x-auto": { "overflow-x": "auto" },
    "overflow-y-auto": { "overflow-y": "auto" },
    "overflow-x-hidden": { "overflow-x": "hidden" },
    "overflow-y-hidden": { "overflow-y": "hidden" },
    "overflow-x-clip": { "overflow-x": "clip" },
    "overflow-y-clip": { "overflow-y": "clip" },
    "overflow-x-visible": { "overflow-x": "visible" },
    "overflow-y-visible": { "overflow-y": "visible" },
    "overflow-x-scroll": { "overflow-x": "scroll" },
    "overflow-y-scroll": { "overflow-y": "scroll" },
    "overscroll-auto": { "overscroll-behavior": "auto" },
    "overscroll-contain": { "overscroll-behavior": "contain" },
    "overscroll-none": { "overscroll-behavior": "none" },
    "box-border": { "box-sizing": "border-box" },
    "box-content": { "box-sizing": "content-box" },
    "container": { width: "100%", "container-type": "inline-size" },
    "container-normal": { "container-type": "normal" },
    "container-inline": { "container-type": "inline-size" },
    "container-size": { "container-type": "size" },
    "items-start": { "align-items": "flex-start" },
    "items-end": { "align-items": "flex-end" },
    "items-center": { "align-items": "center" },
    "items-baseline": { "align-items": "baseline" },
    "items-stretch": { "align-items": "stretch" },
    "content-normal": { "align-content": "normal" },
    "content-center": { "align-content": "center" },
    "content-start": { "align-content": "flex-start" },
    "content-end": { "align-content": "flex-end" },
    "content-between": { "align-content": "space-between" },
    "content-around": { "align-content": "space-around" },
    "content-evenly": { "align-content": "space-evenly" },
    "content-baseline": { "align-content": "baseline" },
    "self-auto": { "align-self": "auto" },
    "self-start": { "align-self": "flex-start" },
    "self-end": { "align-self": "flex-end" },
    "self-center": { "align-self": "center" },
    "self-stretch": { "align-self": "stretch" },
    "self-baseline": { "align-self": "baseline" },
    "justify-normal": { "justify-content": "normal" },
    "justify-start": { "justify-content": "flex-start" },
    "justify-end": { "justify-content": "flex-end" },
    "justify-center": { "justify-content": "center" },
    "justify-between": { "justify-content": "space-between" },
    "justify-around": { "justify-content": "space-around" },
    "justify-evenly": { "justify-content": "space-evenly" },
    "justify-stretch": { "justify-content": "stretch" },
    "justify-items-start": { "justify-items": "start" },
    "justify-items-end": { "justify-items": "end" },
    "justify-items-center": { "justify-items": "center" },
    "justify-items-stretch": { "justify-items": "stretch" },
    "justify-self-auto": { "justify-self": "auto" },
    "justify-self-start": { "justify-self": "start" },
    "justify-self-end": { "justify-self": "end" },
    "justify-self-center": { "justify-self": "center" },
    "justify-self-stretch": { "justify-self": "stretch" },
    "place-content-center": { "place-content": "center" },
    "place-content-start": { "place-content": "start" },
    "place-content-end": { "place-content": "end" },
    "place-content-between": { "place-content": "space-between" },
    "place-content-around": { "place-content": "space-around" },
    "place-content-evenly": { "place-content": "space-evenly" },
    "place-content-baseline": { "place-content": "baseline" },
    "place-content-stretch": { "place-content": "stretch" },
    "place-items-start": { "place-items": "start" },
    "place-items-end": { "place-items": "end" },
    "place-items-center": { "place-items": "center" },
    "place-items-baseline": { "place-items": "baseline" },
    "place-items-stretch": { "place-items": "stretch" },
    "place-self-auto": { "place-self": "auto" },
    "place-self-start": { "place-self": "start" },
    "place-self-end": { "place-self": "end" },
    "place-self-center": { "place-self": "center" },
    "place-self-stretch": { "place-self": "stretch" },
    "text-left": { "text-align": "left" },
    "text-center": { "text-align": "center" },
    "text-right": { "text-align": "right" },
    "text-justify": { "text-align": "justify" },
    "text-start": { "text-align": "start" },
    "text-end": { "text-align": "end" },
    italic: { "font-style": "italic" },
    "not-italic": { "font-style": "normal" },
    uppercase: { "text-transform": "uppercase" },
    lowercase: { "text-transform": "lowercase" },
    capitalize: { "text-transform": "capitalize" },
    "normal-case": { "text-transform": "none" },
    underline: { "text-decoration-line": "underline" },
    overline: { "text-decoration-line": "overline" },
    "line-through": { "text-decoration-line": "line-through" },
    "no-underline": { "text-decoration-line": "none" },
    antialiased: {
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale"
    },
    "subpixel-antialiased": {
      "-webkit-font-smoothing": "auto",
      "-moz-osx-font-smoothing": "auto"
    },
    truncate: {
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap"
    },
    "text-ellipsis": { "text-overflow": "ellipsis" },
    "text-clip": { "text-overflow": "clip" },
    "whitespace-normal": { "white-space": "normal" },
    "whitespace-nowrap": { "white-space": "nowrap" },
    "whitespace-pre": { "white-space": "pre" },
    "whitespace-pre-line": { "white-space": "pre-line" },
    "whitespace-pre-wrap": { "white-space": "pre-wrap" },
    "whitespace-break-spaces": { "white-space": "break-spaces" },
    "break-normal": { "overflow-wrap": "normal", "word-break": "normal" },
    "break-words": { "overflow-wrap": "break-word" },
    "break-all": { "word-break": "break-all" },
    "break-keep": { "word-break": "keep-all" },
    "align-baseline": { "vertical-align": "baseline" },
    "align-top": { "vertical-align": "top" },
    "align-middle": { "vertical-align": "middle" },
    "align-bottom": { "vertical-align": "bottom" },
    "align-text-top": { "vertical-align": "text-top" },
    "align-text-bottom": { "vertical-align": "text-bottom" },
    "align-sub": { "vertical-align": "sub" },
    "align-super": { "vertical-align": "super" },
    "bg-fixed": { "background-attachment": "fixed" },
    "bg-local": { "background-attachment": "local" },
    "bg-scroll": { "background-attachment": "scroll" },
    "bg-clip-border": { "background-clip": "border-box" },
    "bg-clip-padding": { "background-clip": "padding-box" },
    "bg-clip-content": { "background-clip": "content-box" },
    "bg-clip-text": { "background-clip": "text", "-webkit-background-clip": "text", color: "transparent" },
    "bg-origin-border": { "background-origin": "border-box" },
    "bg-origin-padding": { "background-origin": "padding-box" },
    "bg-origin-content": { "background-origin": "content-box" },
    "bg-bottom": { "background-position": "bottom" },
    "bg-center": { "background-position": "center" },
    "bg-left": { "background-position": "left" },
    "bg-left-bottom": { "background-position": "left bottom" },
    "bg-left-top": { "background-position": "left top" },
    "bg-right": { "background-position": "right" },
    "bg-right-bottom": { "background-position": "right bottom" },
    "bg-right-top": { "background-position": "right top" },
    "bg-top": { "background-position": "top" },
    "bg-repeat": { "background-repeat": "repeat" },
    "bg-no-repeat": { "background-repeat": "no-repeat" },
    "bg-repeat-x": { "background-repeat": "repeat-x" },
    "bg-repeat-y": { "background-repeat": "repeat-y" },
    "bg-repeat-round": { "background-repeat": "round" },
    "bg-repeat-space": { "background-repeat": "space" },
    "bg-auto": { "background-size": "auto" },
    "bg-cover": { "background-size": "cover" },
    "bg-contain": { "background-size": "contain" },
    "border-solid": { "border-style": "solid" },
    "border-dashed": { "border-style": "dashed" },
    "border-dotted": { "border-style": "dotted" },
    "border-double": { "border-style": "double" },
    "border-hidden": { "border-style": "hidden" },
    "border-none": { "border-style": "none" },
    "rounded-none": { "border-radius": "0px" },
    "outline-none": { outline: "2px solid transparent", "outline-offset": "2px" },
    "outline": { "outline-style": "solid" },
    "outline-dashed": { "outline-style": "dashed" },
    "outline-dotted": { "outline-style": "dotted" },
    "outline-double": { "outline-style": "double" },
    "outline-offset-0": { "outline-offset": "0px" },
    "shadow-none": { "--jf-shadow": "0 0 #0000", "box-shadow": RING_BOX_SHADOW },
    "opacity-0": { opacity: "0" },
    "opacity-100": { opacity: "1" },
    "filter": { filter: FILTER_VALUE },
    "filter-none": { filter: "none" },
    "backdrop-filter": { "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE },
    "backdrop-filter-none": { "-webkit-backdrop-filter": "none", "backdrop-filter": "none" },
    "grayscale": { "--jf-grayscale": "1", filter: FILTER_VALUE },
    "grayscale-0": { "--jf-grayscale": "0", filter: FILTER_VALUE },
    "invert": { "--jf-invert": "1", filter: FILTER_VALUE },
    "invert-0": { "--jf-invert": "0", filter: FILTER_VALUE },
    "sepia": { "--jf-sepia": "1", filter: FILTER_VALUE },
    "sepia-0": { "--jf-sepia": "0", filter: FILTER_VALUE },
    "backdrop-grayscale": { "--jf-backdrop-grayscale": "1", "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE },
    "backdrop-grayscale-0": { "--jf-backdrop-grayscale": "0", "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE },
    "backdrop-invert": { "--jf-backdrop-invert": "1", "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE },
    "backdrop-invert-0": { "--jf-backdrop-invert": "0", "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE },
    "backdrop-sepia": { "--jf-backdrop-sepia": "1", "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE },
    "backdrop-sepia-0": { "--jf-backdrop-sepia": "0", "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE },
    "aspect-auto": { "aspect-ratio": "auto" },
    "aspect-square": { "aspect-ratio": "1 / 1" },
    "aspect-video": { "aspect-ratio": "16 / 9" },
    "ring-inset": { "--jf-ring-inset": "inset", "box-shadow": RING_BOX_SHADOW },
    ring: ringWidthDeclaration("3px"),
    "ring-0": ringWidthDeclaration("0px"),
    "ring-1": ringWidthDeclaration("1px"),
    "ring-2": ringWidthDeclaration("2px"),
    "ring-4": ringWidthDeclaration("4px"),
    "ring-8": ringWidthDeclaration("8px"),
    "ring-offset-0": ringOffsetDeclaration("0px"),
    "ring-offset-1": ringOffsetDeclaration("1px"),
    "ring-offset-2": ringOffsetDeclaration("2px"),
    "ring-offset-4": ringOffsetDeclaration("4px"),
    "ring-offset-8": ringOffsetDeclaration("8px"),
    "duration-75": { "transition-duration": "75ms" },
    "duration-100": { "transition-duration": "100ms" },
    "duration-150": { "transition-duration": "150ms" },
    "duration-200": { "transition-duration": "200ms" },
    "duration-300": { "transition-duration": "300ms" },
    "duration-500": { "transition-duration": "500ms" },
    "duration-700": { "transition-duration": "700ms" },
    "duration-1000": { "transition-duration": "1000ms" },
    "ease-linear": { "transition-timing-function": "linear" },
    "ease-in": { "transition-timing-function": "cubic-bezier(0.4,0,1,1)" },
    "ease-out": { "transition-timing-function": "cubic-bezier(0,0,0.2,1)" },
    "ease-in-out": { "transition-timing-function": "cubic-bezier(0.4,0,0.2,1)" },
    "transition-none": { "transition-property": "none" },
    transition: {
      "transition-property": "color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter",
      "transition-timing-function": "cubic-bezier(0.4,0,0.2,1)",
      "transition-duration": "150ms"
    },
    "transition-all": {
      "transition-property": "all",
      "transition-timing-function": "cubic-bezier(0.4,0,0.2,1)",
      "transition-duration": "150ms"
    },
    "transition-colors": {
      "transition-property": "color,background-color,border-color,text-decoration-color,fill,stroke",
      "transition-timing-function": "cubic-bezier(0.4,0,0.2,1)",
      "transition-duration": "150ms"
    },
    "transition-opacity": {
      "transition-property": "opacity",
      "transition-timing-function": "cubic-bezier(0.4,0,0.2,1)",
      "transition-duration": "150ms"
    },
    "transition-shadow": {
      "transition-property": "box-shadow",
      "transition-timing-function": "cubic-bezier(0.4,0,0.2,1)",
      "transition-duration": "150ms"
    },
    "transition-transform": {
      "transition-property": "transform",
      "transition-timing-function": "cubic-bezier(0.4,0,0.2,1)",
      "transition-duration": "150ms"
    },
    transform: { transform: TRANSFORM_VALUE },
    "transform-none": { transform: "none" },
    "origin-center": { "transform-origin": "center" },
    "origin-top": { "transform-origin": "top" },
    "origin-top-right": { "transform-origin": "top right" },
    "origin-right": { "transform-origin": "right" },
    "origin-bottom-right": { "transform-origin": "bottom right" },
    "origin-bottom": { "transform-origin": "bottom" },
    "origin-bottom-left": { "transform-origin": "bottom left" },
    "origin-left": { "transform-origin": "left" },
    "origin-top-left": { "transform-origin": "top left" },
    "scale-0": scaleDeclaration("0"),
    "scale-50": scaleDeclaration(".5"),
    "scale-75": scaleDeclaration(".75"),
    "scale-90": scaleDeclaration(".9"),
    "scale-95": scaleDeclaration(".95"),
    "scale-100": scaleDeclaration("1"),
    "scale-105": scaleDeclaration("1.05"),
    "scale-110": scaleDeclaration("1.1"),
    "scale-125": scaleDeclaration("1.25"),
    "scale-150": scaleDeclaration("1.5"),
    "rotate-0": rotateDeclaration("0deg"),
    "rotate-1": rotateDeclaration("1deg"),
    "rotate-2": rotateDeclaration("2deg"),
    "rotate-3": rotateDeclaration("3deg"),
    "rotate-6": rotateDeclaration("6deg"),
    "rotate-12": rotateDeclaration("12deg"),
    "rotate-45": rotateDeclaration("45deg"),
    "rotate-90": rotateDeclaration("90deg"),
    "rotate-180": rotateDeclaration("180deg"),
    "animate-none": { animation: "none" },
    "cursor-auto": { cursor: "auto" },
    "cursor-default": { cursor: "default" },
    "cursor-pointer": { cursor: "pointer" },
    "cursor-wait": { cursor: "wait" },
    "cursor-text": { cursor: "text" },
    "cursor-move": { cursor: "move" },
    "cursor-help": { cursor: "help" },
    "cursor-not-allowed": { cursor: "not-allowed" },
    "select-none": { "-webkit-user-select": "none", "user-select": "none" },
    "select-text": { "-webkit-user-select": "text", "user-select": "text" },
    "select-all": { "-webkit-user-select": "all", "user-select": "all" },
    "select-auto": { "-webkit-user-select": "auto", "user-select": "auto" },
    "pointer-events-none": { "pointer-events": "none" },
    "pointer-events-auto": { "pointer-events": "auto" },
    resize: { resize: "both" },
    "resize-none": { resize: "none" },
    "resize-x": { resize: "horizontal" },
    "resize-y": { resize: "vertical" },
    "list-none": { "list-style-type": "none" },
    "list-disc": { "list-style-type": "disc" },
    "list-decimal": { "list-style-type": "decimal" },
    "appearance-none": { appearance: "none" },
    "appearance-auto": { appearance: "auto" }
  };

  var pseudoModifiers = {
    hover: ":hover",
    focus: ":focus",
    active: ":active",
    visited: ":visited",
    disabled: ":disabled",
    enabled: ":enabled",
    checked: ":checked",
    invalid: ":invalid",
    valid: ":valid",
    required: ":required",
    optional: ":optional",
    "focus-within": ":focus-within",
    "focus-visible": ":focus-visible",
    first: ":first-child",
    last: ":last-child",
    only: ":only-child",
    odd: ":nth-child(odd)",
    even: ":nth-child(even)",
    empty: ":empty",
    target: ":target",
    open: "[open]"
  };

  var initialConfig = importedConfig || global.jetflowConfig || {};
  var config = createConfig({});
  var tokenCache = new Map();
  var ruleCache = tokenCache;
  var utilityCache = new Map();
  var semanticPresetCss = "";
  var semanticPresetDirty = true;
  var styleApplyCss = "";
  var styleApplyDirty = true;
  var tokenRegistry = new Map();
  var nodeTokenRegistry = typeof WeakMap !== "undefined" ? new WeakMap() : null;
  var tokenSequence = 0;
  var fullScanRequired = true;
  var invalidTokenWarnings = new Set();
  var configRevision = 0;
  var compositionCache = null;
  var compositionCacheRevision = -1;
  var observer = null;
  var scheduled = false;
  var started = false;
  var styleElement = null;

  var JetFlow = {
    version: VERSION,
    config: config,
    init: init,
    start: start,
    stop: stop,
    refresh: refresh,
    configure: configure,
    modules: {
      parser: {
        tokenize: splitClassValue,
        parseClassValue: parseClassValue,
        parseToken: parseToken,
        classifyToken: classifyToken,
        expandGroupToken: function expandPublicGroupToken(token) {
          return expandGroupToken(token, []);
        }
      },
      sanitizer: {
        sanitizeValue: sanitizeValue
      },
      resolver: {
        resolveUtility: resolveUtility,
        resolveColorValue: resolveColorValue
      },
      engine: {
        compileToken: compileToken,
        refresh: refresh,
        tokenCache: tokenCache
      },
      observer: {
        start: start,
        stop: stop,
        scanDocument: scanDocument
      }
    },
    scan: function scan() {
      scanDocument();
      refresh();
      return JetFlow;
    },
    compileClass: function compileClass(token) {
      return compileToken(token, null, false);
    },
    clearCache: function clearCache() {
      tokenCache.clear();
      utilityCache.clear();
      semanticPresetDirty = true;
      styleApplyDirty = true;
    }
  };

  global.JetFlow = JetFlow;
  JetFlow.init(initialConfig);

  ready(function boot() {
    if (config.autoStart !== false) start();
  });

  function start() {
    if (started) {
      refresh();
      return JetFlow;
    }

    started = true;
    ensureStyleElement();
    scanDocument();
    refresh();

    observer = new MutationObserver(function handleMutations(mutations) {
      var shouldRefresh = false;
      for (var i = 0; i < mutations.length; i += 1) {
        var mutation = mutations[i];
        if (mutation.type === "childList") {
          if (isJetFlowStyleNode(mutation.target)) styleApplyDirty = true;
          for (var r = 0; r < mutation.removedNodes.length; r += 1) {
            unregisterNodeTree(mutation.removedNodes[r]);
          }
          for (var a = 0; a < mutation.addedNodes.length; a += 1) {
            registerNodeTree(mutation.addedNodes[a]);
          }
          shouldRefresh = true;
          continue;
        }
        if (mutation.type === "attributes" && (mutation.attributeName === "class" || mutation.attributeName === "data-jetflow" || mutation.attributeName === "style")) {
          if (isJetFlowStyleNode(mutation.target)) {
            styleApplyDirty = true;
          } else {
            updateNodeTokens(mutation.target);
          }
          shouldRefresh = true;
          continue;
        }
        if (mutation.type === "characterData") {
          if (mutation.target && isJetFlowStyleNode(mutation.target.parentNode)) {
            styleApplyDirty = true;
          }
          shouldRefresh = true;
        }
      }
      if (shouldRefresh) scheduleRefresh();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "data-jetflow", "style"],
      characterData: true
    });

    return JetFlow;
  }

  function stop() {
    if (observer) observer.disconnect();
    observer = null;
    started = false;
    return JetFlow;
  }

  function init(nextConfig) {
    config = createConfig(nextConfig || {});
    JetFlow.config = config;
    tokenCache.clear();
    utilityCache.clear();
    tokenRegistry.clear();
    tokenSequence = 0;
    configRevision += 1;
    compositionCache = null;
    compositionCacheRevision = -1;
    semanticPresetDirty = true;
    styleApplyDirty = true;
    invalidTokenWarnings.clear();
    fullScanRequired = true;
    if (started) refresh({ full: true });
    return JetFlow;
  }

  function configure(nextConfig) {
    return init(deepMerge(deepClone(config), nextConfig || {}));
  }

  function scheduleRefresh() {
    if (scheduled) return;
    scheduled = true;
    var runner = global.requestAnimationFrame || global.setTimeout;
    runner(function runScheduledRefresh() {
      scheduled = false;
      refresh();
    }, config.mutationDebounce || 16);
  }

  function refresh(options) {
    ensureStyleElement();
    if (!styleElement) return "";

    if (options && options.full) fullScanRequired = true;
    if (fullScanRequired) scanDocument();

    var entries = getActiveTokenEntries();
    var css = [];
    var seenCss = new Set();

    if (config.reset !== false) pushCss(css, seenCss, RESET_CSS);

    pushCss(css, seenCss, renderConfigBase());
    pushCss(css, seenCss, renderApplyRules());
    pushCss(css, seenCss, renderStyleTagApplyRules());

    entries.forEach(function compileUsedToken(entry) {
      var rule = ruleCache.get(entry.key);
      if (rule === undefined) {
        rule = compileToken(entry.token, entry.selector, true) || "";
        ruleCache.set(entry.key, rule);
      }
      pushCss(css, seenCss, rule);
    });

    var nextCss = css.filter(Boolean).join("\n");
    if (styleElement.textContent !== nextCss) {
      styleElement.textContent = nextCss;
    }
    return nextCss;
  }

  function ensureStyleElement() {
    if (styleElement && styleElement.parentNode) return styleElement;
    styleElement = document.getElementById(STYLE_ID);
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = STYLE_ID;
      styleElement.setAttribute("data-jetflow-runtime", VERSION);
      styleElement.appendChild(document.createTextNode(""));
      (document.head || document.documentElement).appendChild(styleElement);
    }
    return styleElement;
  }

  function pushCss(css, seenCss, rule) {
    if (!rule) return;
    if (seenCss.has(rule)) return;
    seenCss.add(rule);
    css.push(rule);
  }

  function scanDocument() {
    tokenRegistry.clear();
    tokenSequence = 0;
    if (nodeTokenRegistry && typeof WeakMap !== "undefined") nodeTokenRegistry = new WeakMap();

    var nodes = document.querySelectorAll("[class],[data-jetflow]");
    for (var i = 0; i < nodes.length; i += 1) {
      updateNodeTokens(nodes[i]);
    }

    fullScanRequired = false;
  }

  function registerNodeTree(node) {
    if (!node || node.nodeType !== 1) return;

    updateNodeTokens(node);
    if (isJetFlowStyleNode(node)) styleApplyDirty = true;

    if (!node.querySelectorAll) return;
    var nodes = node.querySelectorAll("[class],[data-jetflow],style[type=\"text/jetflow\"],style[data-jetflow-apply]");
    for (var i = 0; i < nodes.length; i += 1) {
      if (isJetFlowStyleNode(nodes[i])) {
        styleApplyDirty = true;
      } else {
        updateNodeTokens(nodes[i]);
      }
    }
  }

  function unregisterNodeTree(node) {
    if (!node || node.nodeType !== 1) return;

    unregisterNodeTokens(node);
    if (isJetFlowStyleNode(node)) styleApplyDirty = true;

    if (!node.querySelectorAll) return;
    var nodes = node.querySelectorAll("[class],[data-jetflow],style[type=\"text/jetflow\"],style[data-jetflow-apply]");
    for (var i = 0; i < nodes.length; i += 1) {
      if (isJetFlowStyleNode(nodes[i])) {
        styleApplyDirty = true;
      } else {
        unregisterNodeTokens(nodes[i]);
      }
    }
  }

  function updateNodeTokens(node) {
    if (!node || node.nodeType !== 1 || !nodeTokenRegistry) return;

    unregisterNodeTokens(node);

    var entries = [];
    entries = entries.concat(parseClassValue(node.getAttribute("class"), "class"));
    entries = entries.concat(parseClassValue(node.getAttribute("data-jetflow"), "data-jetflow"));

    var keys = [];
    for (var i = 0; i < entries.length; i += 1) {
      var key = registerTokenEntry(entries[i]);
      if (key) keys.push(key);
    }

    nodeTokenRegistry.set(node, keys);
  }

  function unregisterNodeTokens(node) {
    if (!nodeTokenRegistry) return;

    var keys = nodeTokenRegistry.get(node);
    if (!keys) return;

    for (var i = 0; i < keys.length; i += 1) {
      var entry = tokenRegistry.get(keys[i]);
      if (!entry) continue;
      entry.count -= 1;
      if (entry.count <= 0) tokenRegistry.delete(keys[i]);
    }

    nodeTokenRegistry.delete(node);
  }

  function registerTokenEntry(entry) {
    if (!entry || !entry.token) return "";

    var info = classifyToken(entry.token);
    entry.type = entry.type || info.type;
    entry.modifiers = info.modifiers;
    entry.base = info.base;
    entry.priority = tokenPriority(info);
    entry.key = tokenEntryKey(entry);

    var existing = tokenRegistry.get(entry.key);
    if (existing) {
      existing.count += 1;
    } else {
      entry.count = 1;
      entry.order = tokenSequence;
      tokenSequence += 1;
      tokenRegistry.set(entry.key, entry);
    }

    return entry.key;
  }

  function getActiveTokenEntries() {
    var entries = [];
    tokenRegistry.forEach(function addRegisteredEntry(entry) {
      if (entry.count > 0) entries.push(entry);
    });

    flattenToArray(config.safelist).forEach(function addSafelistedToken(value) {
      if (typeof value !== "string") return;
      parseClassValue(value, "class").forEach(function addSafelistEntry(entry) {
        var info = classifyToken(entry.token);
        entry.type = entry.type || info.type;
        entry.modifiers = info.modifiers;
        entry.base = info.base;
        entry.priority = tokenPriority(info);
        entry.order = tokenSequence + entries.length;
        entry.key = tokenEntryKey(entry);
        entries.push(entry);
      });
    });

    var seen = new Set();
    return entries.filter(function uniqueEntry(entry) {
      if (seen.has(entry.key)) return false;
      seen.add(entry.key);
      return true;
    }).sort(function sortByPriority(a, b) {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return (a.order || 0) - (b.order || 0);
    });
  }

  function tokenEntryKey(entry) {
    return entry.token + "\n" + (entry.selector || "");
  }

  function tokenPriority(infoOrToken) {
    var info = typeof infoOrToken === "string" ? classifyToken(infoOrToken) : infoOrToken;
    if (info.type === "semantic") return 1;
    if (info.type === "arbitrary") return 3;
    return 2;
  }

  function isInlineArbitraryToken(token) {
    return classifyToken(token).type === "arbitrary";
  }

  function classifyToken(token) {
    var parsed = parseToken(token || "");
    var base = parsed.base || "";
    var type = "utility";

    if (isGroupedToken(token || "")) {
      type = "grouped";
    } else if (base.indexOf("[") !== -1 && base.indexOf("]") !== -1) {
      type = "arbitrary";
    } else if (getSemanticPreset(base) !== undefined) {
      type = "semantic";
    }

    return {
      raw: token,
      type: type,
      modifiers: parsed.modifiers,
      base: base,
      important: parsed.important
    };
  }

  function parseClassValue(value, attributeName) {
    if (!value || typeof value !== "string") return [];

    var chunks = splitClassValue(value);
    var entries = [];

    for (var i = 0; i < chunks.length; i += 1) {
      var chunk = chunks[i];
      if (!chunk) continue;

      if (isGroupedToken(chunk)) {
        var selector = buildAttributeSelector(attributeName, chunk);
        var expanded = expandGroupToken(chunk, []);
        for (var e = 0; e < expanded.length; e += 1) {
          entries.push({ token: expanded[e], selector: selector, sourceType: "grouped" });
        }
      } else {
        entries.push({ token: chunk, selector: null });
      }
    }

    return entries;
  }

  function splitClassValue(value) {
    var chunks = [];
    var current = "";
    var bracketDepth = 0;
    var parenDepth = 0;
    var escaped = false;

    for (var i = 0; i < value.length; i += 1) {
      var char = value.charAt(i);

      if (escaped) {
        current += char;
        escaped = false;
        continue;
      }

      if (char === "\\") {
        current += char;
        escaped = true;
        continue;
      }

      if (char === "[" && parenDepth >= 0) bracketDepth += 1;
      if (char === "]") bracketDepth = Math.max(0, bracketDepth - 1);
      if (char === "(" && bracketDepth === 0) parenDepth += 1;
      if (char === ")" && bracketDepth === 0) parenDepth = Math.max(0, parenDepth - 1);

      if (/\s/.test(char) && bracketDepth === 0 && parenDepth === 0) {
        if (current) {
          chunks.push(current);
          current = "";
        }
      } else {
        current += char;
      }
    }

    if (current) chunks.push(current);
    return chunks;
  }

  function isGroupedToken(token) {
    var group = findGroupBounds(token);
    return group && group.end === token.length - 1;
  }

  function expandGroupToken(token, inheritedModifiers) {
    var group = findGroupBounds(token);
    if (!group) return [joinModifiers(inheritedModifiers, token)];

    var prefix = token.slice(0, group.start);
    var modifiers = inheritedModifiers.slice();
    if (prefix) {
      if (prefix.charAt(prefix.length - 1) === ":") prefix = prefix.slice(0, -1);
      modifiers = modifiers.concat(splitOutsideBrackets(prefix, ":").filter(Boolean));
    }

    var content = token.slice(group.start + 1, group.end);
    var chunks = splitClassValue(content);
    var expanded = [];

    for (var i = 0; i < chunks.length; i += 1) {
      if (isGroupedToken(chunks[i])) {
        expanded = expanded.concat(expandGroupToken(chunks[i], modifiers));
      } else {
        expanded.push(joinModifiers(modifiers, chunks[i]));
      }
    }

    return expanded;
  }

  function findGroupBounds(token) {
    var bracketDepth = 0;
    var parenDepth = 0;
    var start = -1;
    var escaped = false;

    for (var i = 0; i < token.length; i += 1) {
      var char = token.charAt(i);

      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === "[") bracketDepth += 1;
      if (char === "]") bracketDepth = Math.max(0, bracketDepth - 1);
      if (bracketDepth > 0) continue;

      if (char === "(") {
        if (parenDepth === 0) start = i;
        parenDepth += 1;
      } else if (char === ")") {
        parenDepth -= 1;
        if (parenDepth === 0) return { start: start, end: i };
      }
    }

    return null;
  }

  function joinModifiers(modifiers, token) {
    var filtered = modifiers.filter(Boolean);
    return filtered.length ? filtered.join(":") + ":" + token : token;
  }

  function compileToken(token, selectorOverride, cacheable, stack) {
    if (!token || typeof token !== "string") return "";

    try {
      var parsed = parseToken(token);
      if (!parsed.base) return "";

      var utility = resolveUtility(parsed.base);
      if (!utility) {
        warnInvalidToken(token, "No matching JetFlow utility was found.");
        return "";
      }

      var selector = selectorOverride || "." + cssEscape(token);

      if (utility.aliasTokens) {
        return compileAliasTokens(token, parsed, selector, utility.aliasTokens, stack);
      }

      var context = createSelectorContext(selector);

      for (var i = 0; i < parsed.modifiers.length; i += 1) {
        applyModifier(context, parsed.modifiers[i]);
      }

      var important = config.important || parsed.important;
      if (utility.important) important = true;

      var css = renderUtility(context, utility, important);
      if (!cacheable) return css;
      return css;
    } catch (error) {
      warnInvalidToken(token, error && error.message ? error.message : "Compilation failed.");
      return "";
    }
  }

  function compileAliasTokens(token, parsed, selector, aliasTokens, stack) {
    stack = stack || [];
    if (stack.indexOf(token) !== -1) {
      warnInvalidToken(token, "Circular readable utility alias ignored.");
      return "";
    }

    var css = "";
    for (var i = 0; i < aliasTokens.length; i += 1) {
      var aliasBase = parsed.important && aliasTokens[i].charAt(0) !== "!" ? "!" + aliasTokens[i] : aliasTokens[i];
      var aliasToken = joinModifiers(parsed.modifiers, aliasBase);
      css += compileToken(aliasToken, selector, false, stack.concat([token])) || "";
    }
    return css;
  }

  function parseToken(token) {
    var parts = splitOutsideBrackets(token, ":");
    var base = parts.pop() || "";
    var important = false;

    if (base.charAt(0) === "!") {
      important = true;
      base = base.slice(1);
    }
    if (base.charAt(base.length - 1) === "!") {
      important = true;
      base = base.slice(0, -1);
    }

    return {
      modifiers: parts,
      base: base,
      important: important
    };
  }

  function splitOutsideBrackets(value, separator) {
    var parts = [];
    var current = "";
    var depth = 0;
    var escaped = false;

    for (var i = 0; i < value.length; i += 1) {
      var char = value.charAt(i);

      if (escaped) {
        current += char;
        escaped = false;
        continue;
      }

      if (char === "\\") {
        current += char;
        escaped = true;
        continue;
      }

      if (char === "[") depth += 1;
      if (char === "]") depth = Math.max(0, depth - 1);

      if (char === separator && depth === 0) {
        parts.push(current);
        current = "";
      } else {
        current += char;
      }
    }

    parts.push(current);
    return parts;
  }

  function createSelectorContext(selector) {
    return {
      selector: selector,
      media: [],
      containers: [],
      dark: false
    };
  }

  function applyModifier(context, modifier) {
    if (!modifier) return;

    if (config.screens[modifier]) {
      context.media.push("(min-width: " + config.screens[modifier] + ")");
      return;
    }

    if (modifier === "dark") {
      context.dark = true;
      return;
    }

    if (pseudoModifiers[modifier]) {
      context.selector += pseudoModifiers[modifier];
      return;
    }

    if (modifier.indexOf("group-") === 0) {
      var groupState = modifier.slice(6);
      var groupPseudo = pseudoModifiers[groupState] || ":" + groupState;
      context.selector = ".group" + groupPseudo + " " + context.selector;
      return;
    }

    if (modifier.indexOf("peer-") === 0) {
      var peerState = modifier.slice(5);
      var peerPseudo = pseudoModifiers[peerState] || ":" + peerState;
      context.selector = ".peer" + peerPseudo + " ~ " + context.selector;
      return;
    }

    if (modifier.indexOf("cq-") === 0) {
      var cqName = modifier.slice(3);
      if (config.containers[cqName]) context.containers.push("(min-width: " + config.containers[cqName] + ")");
      return;
    }

    if (modifier.charAt(0) === "@" && config.containers[modifier.slice(1)]) {
      context.containers.push("(min-width: " + config.containers[modifier.slice(1)] + ")");
      return;
    }

    if (modifier === "motion-safe") {
      context.media.push("(prefers-reduced-motion: no-preference)");
      return;
    }

    if (modifier === "motion-reduce") {
      context.media.push("(prefers-reduced-motion: reduce)");
      return;
    }

    if (modifier === "portrait" || modifier === "landscape") {
      context.media.push("(orientation: " + modifier + ")");
      return;
    }

    if (modifier === "print") {
      context.media.push("print");
      return;
    }

    if (modifier.indexOf("aria-") === 0) {
      context.selector += "[aria-" + escapeAttributeName(modifier.slice(5)) + "=\"true\"]";
      return;
    }

    if (modifier.indexOf("data-") === 0) {
      context.selector += "[data-" + escapeAttributeName(modifier.slice(5)) + "]";
    }
  }

  function renderUtility(context, utility, important) {
    var chunks = [];
    var rules = utility.rules || [{ selector: "&", declarations: utility.declarations || utility }];

    if (utility.keyframes) chunks.push(utility.keyframes);

    for (var i = 0; i < rules.length; i += 1) {
      var rule = rules[i];
      var selector = rule.selector ? rule.selector.replace(/&/g, context.selector) : context.selector;
      var declarations = typeof rule.declarations === "string" ? rule.declarations : stringifyDeclarations(rule.declarations, important);
      if (declarations) chunks.push(wrapRule(selector + "{" + declarations + "}", context));
    }

    return chunks.join("");
  }

  function wrapRule(css, context) {
    var output = css;

    if (context.dark) {
      var darkMode = config.darkMode || "both";
      if (darkMode === "class") {
        output = prefixClassSelectors(css, ".dark ");
      } else if (darkMode === "media") {
        output = "@media (prefers-color-scheme: dark){" + output + "}";
      } else {
        output = prefixClassSelectors(css, ".dark ") + "@media (prefers-color-scheme: dark){" + output + "}";
      }
    }

    for (var c = context.containers.length - 1; c >= 0; c -= 1) {
      output = "@container " + context.containers[c] + "{" + output + "}";
    }

    for (var m = context.media.length - 1; m >= 0; m -= 1) {
      output = "@media " + context.media[m] + "{" + output + "}";
    }

    return output;
  }

  function prefixClassSelectors(ruleCss, prefix) {
    var open = ruleCss.indexOf("{");
    if (open === -1) return ruleCss;
    var selectorText = ruleCss.slice(0, open);
    var body = ruleCss.slice(open);
    var selectors = selectorText.split(",").map(function mapSelector(selector) {
      return prefix + selector.trim();
    });
    return selectors.join(",") + body;
  }

  function stringifyDeclarations(declarations, important) {
    if (!declarations) return "";
    if (typeof declarations === "string") return declarations;

    var suffix = important ? "!important" : "";
    var css = "";

    Object.keys(declarations).forEach(function addDeclaration(prop) {
      var value = declarations[prop];
      if (value === null || value === undefined || value === "") return;
      css += prop + ":" + value + suffix + ";";
    });

    return css;
  }

  function renderConfigBase() {
    if (!config.base) return "";
    if (typeof config.base === "string") return config.base;

    var css = "";
    Object.keys(config.base).forEach(function renderBaseSelector(selector) {
      css += selector + "{" + stringifyDeclarations(config.base[selector], false) + "}";
    });
    return css;
  }

  function renderApplyRules() {
    if (!semanticPresetDirty) return semanticPresetCss;

    var composition = getComposition();
    var css = "";

    Object.keys(composition).forEach(function renderComposition(selector) {
      if (isSimpleClassSelector(selector)) return;
      css += compileApply(selector, composition[selector]);
    });

    semanticPresetCss = css;
    semanticPresetDirty = false;
    return semanticPresetCss;
  }

  function isSimpleClassSelector(selector) {
    return /^\.[A-Za-z_-][A-Za-z0-9_-]*$/.test(selector || "");
  }

  function getSemanticPreset(base) {
    if (!base) return undefined;
    var composition = getComposition();
    var selector = "." + base;
    if (Object.prototype.hasOwnProperty.call(composition, selector)) return composition[selector];
    return undefined;
  }

  function getComposition() {
    if (compositionCache && compositionCacheRevision === configRevision) return compositionCache;
    compositionCache = deepMerge({}, config.components || {}, config.apply || {});
    compositionCacheRevision = configRevision;
    return compositionCache;
  }

  function renderStyleTagApplyRules() {
    if (!styleApplyDirty) return styleApplyCss;

    var css = "";
    var styles = document.querySelectorAll("style[type=\"text/jetflow\"],style[data-jetflow-apply]");

    for (var i = 0; i < styles.length; i += 1) {
      css += compileApplyStylesheet(styles[i].textContent || "");
    }

    styleApplyCss = css;
    styleApplyDirty = false;
    return styleApplyCss;
  }

  function compileApply(selector, classValue) {
    var css = "";
    var tokens = [];

    if (Array.isArray(classValue)) {
      flattenToArray(classValue).forEach(function addApplyArrayToken(item) {
        if (typeof item === "string") {
          tokens = tokens.concat(expandApplyClassValue(item));
        }
      });
    } else if (typeof classValue === "string") {
      tokens = expandApplyClassValue(classValue);
    } else if (classValue && typeof classValue === "object") {
      css += selector + "{" + stringifyDeclarations(classValue, false) + "}";
    }

    for (var i = 0; i < tokens.length; i += 1) {
      if (tokens[i]) css += compileToken(tokens[i], selector, false) || "";
    }

    return css;
  }

  function expandApplyClassValue(classValue) {
    var tokens = [];
    var chunks = splitClassValue(classValue);

    for (var i = 0; i < chunks.length; i += 1) {
      if (isGroupedToken(chunks[i])) {
        tokens = tokens.concat(expandGroupToken(chunks[i], []));
      } else if (chunks[i]) {
        tokens.push(chunks[i]);
      }
    }

    return tokens;
  }

  function compileApplyStylesheet(source) {
    var css = "";
    var blockPattern = /([^{}]+)\{([^{}]*@apply[^{}]*)\}/g;
    var block;

    while ((block = blockPattern.exec(source))) {
      var selector = block[1].trim();
      var body = block[2];
      var declarations = body.replace(/@apply\s+([^;]+);?/g, function expandApply(_, classValue) {
        css += compileApply(selector, classValue);
        return "";
      }).trim();

      if (selector && declarations) {
        css += selector + "{" + declarations + "}";
      }
    }

    return css;
  }

  function resolveUtility(base) {
    if (!base || base === "group" || base === "peer") return null;

    var cacheKey = configRevision + "::" + base;
    if (utilityCache.has(cacheKey)) return utilityCache.get(cacheKey);

    var resolved = resolveUtilityInner(base);
    utilityCache.set(cacheKey, resolved || null);
    return resolved;
  }

  function resolveUtilityInner(base) {
    var semanticPreset = getSemanticPreset(base);
    if (semanticPreset !== undefined) return normalizeCustomUtility(semanticPreset);

    if (config.utilities && config.utilities[base]) return normalizeCustomUtility(config.utilities[base]);

    var negative = false;
    if (base.charAt(0) === "-") {
      negative = true;
      base = base.slice(1);
    }

    var dynamic = resolveDynamicUtility(base, negative);
    if (dynamic) return dynamic;

    if (directUtilities[base]) {
      var direct = cloneUtility(directUtilities[base]);
      if (negative) direct = negateUtility(direct);
      return { declarations: direct };
    }

    var generated = resolveGeneratedUtility(base, negative);
    if (generated) return generated;

    return null;
  }

  function resolveGeneratedUtility(base, negative) {
    var theme = config.theme;
    var key;
    var value;
    var color;

    if (/^grid-cols-\d+$/.test(base)) {
      key = base.slice(10);
      return { declarations: { "grid-template-columns": "repeat(" + key + ",minmax(0,1fr))" } };
    }

    if (/^grid-rows-\d+$/.test(base)) {
      key = base.slice(10);
      return { declarations: { "grid-template-rows": "repeat(" + key + ",minmax(0,1fr))" } };
    }

    if (/^col-span-\d+$/.test(base)) {
      key = base.slice(9);
      return { declarations: { "grid-column": "span " + key + " / span " + key } };
    }

    if (/^row-span-\d+$/.test(base)) {
      key = base.slice(9);
      return { declarations: { "grid-row": "span " + key + " / span " + key } };
    }

    if (/^col-start-\d+$/.test(base)) return { declarations: { "grid-column-start": base.slice(10) } };
    if (/^col-end-\d+$/.test(base)) return { declarations: { "grid-column-end": base.slice(8) } };
    if (/^row-start-\d+$/.test(base)) return { declarations: { "grid-row-start": base.slice(10) } };
    if (/^row-end-\d+$/.test(base)) return { declarations: { "grid-row-end": base.slice(8) } };

    var spacing = spacingUtility(base, negative);
    if (spacing) return spacing;

    var sizing = sizingUtility(base, negative);
    if (sizing) return sizing;

    var typography = typographyUtility(base);
    if (typography) return typography;

    var colorUtility = generatedColorUtility(base);
    if (colorUtility) return colorUtility;

    var borderUtility = generatedBorderUtility(base);
    if (borderUtility) return borderUtility;

    var effectUtility = generatedEffectUtility(base);
    if (effectUtility) return effectUtility;

    var filterUtility = generatedFilterUtility(base, negative);
    if (filterUtility) return filterUtility;

    var transitionUtility = generatedTransitionUtility(base);
    if (transitionUtility) return transitionUtility;

    var transformUtility = generatedTransformUtility(base, negative);
    if (transformUtility) return transformUtility;

    if (base.indexOf("aspect-") === 0) {
      key = base.slice(7);
      value = theme.aspectRatio[key];
      if (value) return { declarations: { "aspect-ratio": value } };
    }

    if (base.indexOf("z-") === 0) {
      key = base.slice(2);
      value = resolveInlineOrThemeValue(key, theme.zIndex);
      if (value !== undefined) return { declarations: { "z-index": negative ? "-" + value : value } };
    }

    if (base.indexOf("order-") === 0) {
      key = base.slice(6);
      var orderMap = { first: "-9999", last: "9999", none: "0" };
      value = orderMap[key] || numericValue(key);
      if (value !== undefined) return { declarations: { order: negative ? "-" + value : value } };
    }

    if (base.indexOf("animate-") === 0) {
      key = base.slice(8);
      value = theme.animation[key];
      if (value) return { declarations: { animation: value }, keyframes: KEYFRAMES[key] || "" };
    }

    if (base.indexOf("fill-") === 0) {
      color = resolveColorValue(base.slice(5));
      if (color) return { declarations: { fill: color } };
    }

    if (base.indexOf("stroke-") === 0) {
      key = base.slice(7);
      value = resolveInlineOrThemeValue(key, theme.borderWidth);
      if (value) return { declarations: { "stroke-width": value } };
      color = resolveColorValue(key);
      if (color) return { declarations: { stroke: color } };
    }

    return null;
  }

  function spacingUtility(base, negative) {
    var spacingPrefixes = [
      ["p", ["padding"]],
      ["px", ["padding-left", "padding-right"]],
      ["py", ["padding-top", "padding-bottom"]],
      ["pt", ["padding-top"]],
      ["pr", ["padding-right"]],
      ["pb", ["padding-bottom"]],
      ["pl", ["padding-left"]],
      ["m", ["margin"]],
      ["mx", ["margin-left", "margin-right"]],
      ["my", ["margin-top", "margin-bottom"]],
      ["mt", ["margin-top"]],
      ["mr", ["margin-right"]],
      ["mb", ["margin-bottom"]],
      ["ml", ["margin-left"]],
      ["gap", ["gap"]],
      ["gap-x", ["column-gap"]],
      ["gap-y", ["row-gap"]],
      ["inset", ["top", "right", "bottom", "left"]],
      ["inset-x", ["left", "right"]],
      ["inset-y", ["top", "bottom"]],
      ["top", ["top"]],
      ["right", ["right"]],
      ["bottom", ["bottom"]],
      ["left", ["left"]]
    ];

    for (var i = 0; i < spacingPrefixes.length; i += 1) {
      var prefix = spacingPrefixes[i][0];
      if (base === prefix + "-auto") {
        return { declarations: propsToValue(spacingPrefixes[i][1], "auto") };
      }
      if (base.indexOf(prefix + "-") === 0) {
        var key = base.slice(prefix.length + 1);
        var value = resolveSpacingValue(key);
        if (value !== undefined) {
          if (negative && value !== "0px") value = "-" + value;
          return { declarations: propsToValue(spacingPrefixes[i][1], value) };
        }
      }
    }

    if (base.indexOf("space-x-") === 0) {
      var x = resolveSpacingValue(base.slice(8));
      if (x !== undefined) {
        if (negative && x !== "0px") x = "-" + x;
        return {
          rules: [{
            selector: "& > :not([hidden]) ~ :not([hidden])",
            declarations: { "margin-left": x }
          }]
        };
      }
    }

    if (base.indexOf("space-y-") === 0) {
      var y = resolveSpacingValue(base.slice(8));
      if (y !== undefined) {
        if (negative && y !== "0px") y = "-" + y;
        return {
          rules: [{
            selector: "& > :not([hidden]) ~ :not([hidden])",
            declarations: { "margin-top": y }
          }]
        };
      }
    }

    return null;
  }

  function sizingUtility(base, negative) {
    var sizePrefixes = [
      ["w", ["width"]],
      ["min-w", ["min-width"]],
      ["max-w", ["max-width"]],
      ["h", ["height"]],
      ["min-h", ["min-height"]],
      ["max-h", ["max-height"]],
      ["basis", ["flex-basis"]]
    ];

    for (var i = 0; i < sizePrefixes.length; i += 1) {
      var prefix = sizePrefixes[i][0];
      if (base.indexOf(prefix + "-") === 0) {
        var key = base.slice(prefix.length + 1);
        var value = resolveSizeValue(key, prefix);
        if (value !== undefined) {
          if (negative && value !== "0px") value = "-" + value;
          return { declarations: propsToValue(sizePrefixes[i][1], value) };
        }
      }
    }

    return null;
  }

  function typographyUtility(base) {
    var theme = config.theme;
    var key;
    var value;

    if (base.indexOf("font-") === 0) {
      key = base.slice(5);
      value = theme.fontWeight[key];
      if (value) return { declarations: { "font-weight": value } };
      if (key === "sans") return { declarations: { "font-family": "system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif" } };
      if (key === "serif") return { declarations: { "font-family": "ui-serif,Georgia,Cambria,\"Times New Roman\",Times,serif" } };
      if (key === "mono") return { declarations: { "font-family": "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace" } };
    }

    if (base.indexOf("text-") === 0) {
      key = base.slice(5);
      value = theme.fontSize[key];
      if (value) {
        if (Array.isArray(value)) return { declarations: { "font-size": value[0], "line-height": value[1] } };
        return { declarations: { "font-size": value } };
      }
    }

    if (base.indexOf("leading-") === 0) {
      key = base.slice(8);
      value = theme.lineHeight[key] || numericValue(key);
      if (value) return { declarations: { "line-height": value } };
    }

    if (base.indexOf("tracking-") === 0) {
      key = base.slice(9);
      value = theme.letterSpacing[key];
      if (value !== undefined) return { declarations: { "letter-spacing": value } };
    }

    if (base.indexOf("decoration-") === 0) {
      var color = resolveColorValue(base.slice(11));
      if (color) return { declarations: { "text-decoration-color": color } };
      value = resolveSizeValue(base.slice(11));
      if (value) return { declarations: { "text-decoration-thickness": value } };
    }

    if (base.indexOf("underline-offset-") === 0) {
      value = resolveSizeValue(base.slice(17));
      if (value) return { declarations: { "text-underline-offset": value } };
    }

    return null;
  }

  function generatedColorUtility(base) {
    var color;

    if (base.indexOf("bg-") === 0) {
      color = resolveColorValue(base.slice(3));
      if (color) return { declarations: { "background-color": color } };
    }

    if (base.indexOf("text-") === 0) {
      color = resolveColorValue(base.slice(5));
      if (color) return { declarations: { color: color } };
    }

    if (base.indexOf("border-") === 0) {
      color = resolveColorValue(base.slice(7));
      if (color) return { declarations: { "border-color": color } };
    }

    if (base.indexOf("outline-") === 0) {
      color = resolveColorValue(base.slice(8));
      if (color) return { declarations: { "outline-color": color } };
    }

    if (base.indexOf("ring-offset-") === 0) {
      color = resolveColorValue(base.slice(12));
      if (color) return { declarations: { "--jf-ring-offset-color": color, "--jf-ring-offset-shadow": "var(--jf-ring-inset,) 0 0 0 var(--jf-ring-offset-width,0px) var(--jf-ring-offset-color,#fff)", "box-shadow": RING_BOX_SHADOW } };
    }

    if (base.indexOf("ring-") === 0) {
      color = resolveColorValue(base.slice(5));
      if (color) return { declarations: { "--jf-ring-color": color, "box-shadow": RING_BOX_SHADOW } };
    }

    if (base.indexOf("caret-") === 0) {
      color = resolveColorValue(base.slice(6));
      if (color) return { declarations: { "caret-color": color } };
    }

    if (base.indexOf("accent-") === 0) {
      color = resolveColorValue(base.slice(7));
      if (color) return { declarations: { "accent-color": color } };
    }

    return null;
  }

  function generatedBorderUtility(base) {
    var theme = config.theme;
    var key;
    var value;

    if (base === "border") return { declarations: { "border-width": theme.borderWidth.DEFAULT || "1px" } };

    if (base.indexOf("border-") === 0) {
      key = base.slice(7);
      value = theme.borderWidth[key];
      if (value !== undefined) return { declarations: { "border-width": value } };
    }

    var sideMap = {
      "border-x": ["border-left-width", "border-right-width"],
      "border-y": ["border-top-width", "border-bottom-width"],
      "border-t": ["border-top-width"],
      "border-r": ["border-right-width"],
      "border-b": ["border-bottom-width"],
      "border-l": ["border-left-width"]
    };

    for (var side in sideMap) {
      if (Object.prototype.hasOwnProperty.call(sideMap, side)) {
        if (base === side) return { declarations: propsToValue(sideMap[side], theme.borderWidth.DEFAULT || "1px") };
        if (base.indexOf(side + "-") === 0) {
          key = base.slice(side.length + 1);
          value = theme.borderWidth[key];
          if (value !== undefined) return { declarations: propsToValue(sideMap[side], value) };
        }
      }
    }

    if (base === "rounded") return { declarations: { "border-radius": theme.borderRadius.DEFAULT || "0.25rem" } };
    if (base.indexOf("rounded-") === 0) {
      key = base.slice(8);
      value = theme.borderRadius[key];
      if (value !== undefined) return { declarations: { "border-radius": value } };
    }

    var radiusSideMap = {
      "rounded-t": ["border-top-left-radius", "border-top-right-radius"],
      "rounded-r": ["border-top-right-radius", "border-bottom-right-radius"],
      "rounded-b": ["border-bottom-right-radius", "border-bottom-left-radius"],
      "rounded-l": ["border-top-left-radius", "border-bottom-left-radius"],
      "rounded-tl": ["border-top-left-radius"],
      "rounded-tr": ["border-top-right-radius"],
      "rounded-br": ["border-bottom-right-radius"],
      "rounded-bl": ["border-bottom-left-radius"]
    };

    for (var radiusSide in radiusSideMap) {
      if (Object.prototype.hasOwnProperty.call(radiusSideMap, radiusSide)) {
        if (base === radiusSide) return { declarations: propsToValue(radiusSideMap[radiusSide], theme.borderRadius.DEFAULT || "0.25rem") };
        if (base.indexOf(radiusSide + "-") === 0) {
          key = base.slice(radiusSide.length + 1);
          value = theme.borderRadius[key];
          if (value !== undefined) return { declarations: propsToValue(radiusSideMap[radiusSide], value) };
        }
      }
    }

    return null;
  }

  function generatedEffectUtility(base) {
    var theme = config.theme;
    var key;
    var value;

    if (base === "shadow") {
      return { declarations: { "--jf-shadow": theme.boxShadow.DEFAULT, "box-shadow": RING_BOX_SHADOW } };
    }

    if (base.indexOf("shadow-") === 0) {
      key = base.slice(7);
      value = theme.boxShadow[key];
      if (value) return { declarations: { "--jf-shadow": value, "box-shadow": RING_BOX_SHADOW } };
      var color = resolveColorValue(key);
      if (color) return { declarations: { "--jf-shadow-color": color } };
    }

    if (base.indexOf("opacity-") === 0) {
      key = base.slice(8);
      value = theme.opacity[key];
      if (value !== undefined) return { declarations: { opacity: value } };
    }

    return null;
  }

  function generatedFilterUtility(base, negative) {
    var theme = config.theme;
    var key;
    var value;

    if (base === "blur") return { declarations: { "--jf-blur": theme.blur.DEFAULT, filter: FILTER_VALUE } };
    if (base.indexOf("blur-") === 0) {
      key = base.slice(5);
      value = theme.blur[key];
      if (value !== undefined) return { declarations: { "--jf-blur": value, filter: FILTER_VALUE } };
    }

    if (base.indexOf("brightness-") === 0) {
      key = base.slice(11);
      value = theme.brightness[key];
      if (value !== undefined) return { declarations: { "--jf-brightness": value, filter: FILTER_VALUE } };
    }

    if (base.indexOf("contrast-") === 0) {
      key = base.slice(9);
      value = theme.contrast[key];
      if (value !== undefined) return { declarations: { "--jf-contrast": value, filter: FILTER_VALUE } };
    }

    if (base.indexOf("saturate-") === 0) {
      key = base.slice(9);
      value = theme.saturate[key];
      if (value !== undefined) return { declarations: { "--jf-saturate": value, filter: FILTER_VALUE } };
    }

    if (base.indexOf("hue-rotate-") === 0) {
      key = base.slice(11);
      value = theme.hueRotate[key];
      if (value !== undefined) {
        if (negative) value = "-" + value;
        return { declarations: { "--jf-hue-rotate": value, filter: FILTER_VALUE } };
      }
    }

    if (base === "backdrop-blur") return { declarations: { "--jf-backdrop-blur": theme.blur.DEFAULT, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE } };
    if (base.indexOf("backdrop-blur-") === 0) {
      key = base.slice(14);
      value = theme.blur[key];
      if (value !== undefined) return { declarations: { "--jf-backdrop-blur": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE } };
    }

    if (base.indexOf("backdrop-brightness-") === 0) {
      key = base.slice(20);
      value = theme.brightness[key];
      if (value !== undefined) return { declarations: { "--jf-backdrop-brightness": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE } };
    }

    if (base.indexOf("backdrop-contrast-") === 0) {
      key = base.slice(18);
      value = theme.contrast[key];
      if (value !== undefined) return { declarations: { "--jf-backdrop-contrast": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE } };
    }

    if (base.indexOf("backdrop-opacity-") === 0) {
      key = base.slice(17);
      value = theme.opacity[key];
      if (value !== undefined) return { declarations: { "--jf-backdrop-opacity": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE } };
    }

    if (base.indexOf("backdrop-saturate-") === 0) {
      key = base.slice(18);
      value = theme.saturate[key];
      if (value !== undefined) return { declarations: { "--jf-backdrop-saturate": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE } };
    }

    if (base.indexOf("backdrop-hue-rotate-") === 0) {
      key = base.slice(20);
      value = theme.hueRotate[key];
      if (value !== undefined) {
        if (negative) value = "-" + value;
        return { declarations: { "--jf-backdrop-hue-rotate": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE } };
      }
    }

    return null;
  }

  function generatedTransitionUtility(base) {
    var theme = config.theme;
    var key;
    var value;

    if (base.indexOf("duration-") === 0) {
      key = base.slice(9);
      value = theme.transitionDuration[key] || numericMilliseconds(key);
      if (value) return { declarations: { "transition-duration": value } };
    }

    if (base.indexOf("delay-") === 0) {
      key = base.slice(6);
      value = theme.transitionDuration[key] || numericMilliseconds(key);
      if (value) return { declarations: { "transition-delay": value } };
    }

    if (base.indexOf("ease-") === 0) {
      key = base.slice(5);
      value = theme.transitionTiming[key];
      if (value) return { declarations: { "transition-timing-function": value } };
    }

    return null;
  }

  function generatedTransformUtility(base, negative) {
    var key;
    var value;

    var transformSpacing = [
      ["translate-x", "--jf-translate-x"],
      ["translate-y", "--jf-translate-y"]
    ];

    for (var i = 0; i < transformSpacing.length; i += 1) {
      var prefix = transformSpacing[i][0];
      if (base.indexOf(prefix + "-") === 0) {
        key = base.slice(prefix.length + 1);
        value = resolveSizeValue(key);
        if (value !== undefined) {
          if (negative && value !== "0px") value = "-" + value;
          return { declarations: transformDeclaration(transformSpacing[i][1], value) };
        }
      }
    }

    var scaleParts = [
      ["scale-x", "--jf-scale-x"],
      ["scale-y", "--jf-scale-y"]
    ];

    for (var s = 0; s < scaleParts.length; s += 1) {
      var scalePrefix = scaleParts[s][0];
      if (base.indexOf(scalePrefix + "-") === 0) {
        value = parseFloat(base.slice(scalePrefix.length + 1)) / 100;
        if (!isNaN(value)) return { declarations: transformDeclaration(scaleParts[s][1], String(value)) };
      }
    }

    if (base.indexOf("scale-") === 0) {
      value = parseFloat(base.slice(6)) / 100;
      if (!isNaN(value)) return { declarations: scaleDeclaration(String(value)) };
    }

    if (base.indexOf("rotate-") === 0) {
      value = base.slice(7);
      if (/^\d+(\.\d+)?$/.test(value)) {
        if (negative) value = "-" + value;
        return { declarations: rotateDeclaration(value + "deg") };
      }
    }

    if (base.indexOf("skew-x-") === 0) {
      value = base.slice(7);
      if (/^\d+(\.\d+)?$/.test(value)) {
        if (negative) value = "-" + value;
        return { declarations: transformDeclaration("--jf-skew-x", value + "deg") };
      }
    }

    if (base.indexOf("skew-y-") === 0) {
      value = base.slice(7);
      if (/^\d+(\.\d+)?$/.test(value)) {
        if (negative) value = "-" + value;
        return { declarations: transformDeclaration("--jf-skew-y", value + "deg") };
      }
    }

    return null;
  }

  function resolveDynamicUtility(base, negative) {
    if (base.charAt(0) === "[" && base.charAt(base.length - 1) === "]") {
      var declaration = resolveArbitraryProperty(base.slice(1, -1));
      if (declaration) return { declarations: declaration };
    }

    var dynamicPrefixes = [
      ["backdrop-hue-rotate", function handleBackdropHue(value) { return { "--jf-backdrop-hue-rotate": signedValue(value, negative), "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["backdrop-brightness", function handleBackdropBrightness(value) { return { "--jf-backdrop-brightness": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["backdrop-contrast", function handleBackdropContrast(value) { return { "--jf-backdrop-contrast": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["backdrop-opacity", function handleBackdropOpacity(value) { return { "--jf-backdrop-opacity": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["backdrop-saturate", function handleBackdropSaturate(value) { return { "--jf-backdrop-saturate": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["backdrop-grayscale", function handleBackdropGrayscale(value) { return { "--jf-backdrop-grayscale": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["backdrop-invert", function handleBackdropInvert(value) { return { "--jf-backdrop-invert": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["backdrop-sepia", function handleBackdropSepia(value) { return { "--jf-backdrop-sepia": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["backdrop-blur", function handleBackdropBlur(value) { return { "--jf-backdrop-blur": value, "-webkit-backdrop-filter": BACKDROP_FILTER_VALUE, "backdrop-filter": BACKDROP_FILTER_VALUE }; }],
      ["hue-rotate", function handleHue(value) { return { "--jf-hue-rotate": signedValue(value, negative), filter: FILTER_VALUE }; }],
      ["brightness", function handleBrightness(value) { return { "--jf-brightness": value, filter: FILTER_VALUE }; }],
      ["contrast", function handleContrast(value) { return { "--jf-contrast": value, filter: FILTER_VALUE }; }],
      ["saturate", function handleSaturate(value) { return { "--jf-saturate": value, filter: FILTER_VALUE }; }],
      ["grayscale", function handleGrayscale(value) { return { "--jf-grayscale": value, filter: FILTER_VALUE }; }],
      ["invert", function handleInvert(value) { return { "--jf-invert": value, filter: FILTER_VALUE }; }],
      ["sepia", function handleSepia(value) { return { "--jf-sepia": value, filter: FILTER_VALUE }; }],
      ["drop-shadow", function handleDropShadow(value) { return { "--jf-drop-shadow": value, filter: FILTER_VALUE }; }],
      ["grid-cols", function handleGridCols(value) { return { "grid-template-columns": value }; }],
      ["grid-rows", function handleGridRows(value) { return { "grid-template-rows": value }; }],
      ["col-start", function handleColStart(value) { return { "grid-column-start": value }; }],
      ["col-end", function handleColEnd(value) { return { "grid-column-end": value }; }],
      ["row-start", function handleRowStart(value) { return { "grid-row-start": value }; }],
      ["row-end", function handleRowEnd(value) { return { "grid-row-end": value }; }],
      ["col", function handleCol(value) { return { "grid-column": value }; }],
      ["row", function handleRow(value) { return { "grid-row": value }; }],
      ["translate-x", function handleTranslateX(value) { return transformDeclaration("--jf-translate-x", signedValue(value, negative)); }],
      ["translate-y", function handleTranslateY(value) { return transformDeclaration("--jf-translate-y", signedValue(value, negative)); }],
      ["skew-x", function handleSkewX(value) { return transformDeclaration("--jf-skew-x", signedValue(value, negative)); }],
      ["skew-y", function handleSkewY(value) { return transformDeclaration("--jf-skew-y", signedValue(value, negative)); }],
      ["rotate", function handleRotate(value) { return rotateDeclaration(signedValue(value, negative)); }],
      ["scale-x", function handleScaleX(value) { return transformDeclaration("--jf-scale-x", value); }],
      ["scale-y", function handleScaleY(value) { return transformDeclaration("--jf-scale-y", value); }],
      ["scale", function handleScale(value) { return scaleDeclaration(value); }],
      ["min-w", function handleMinWidth(value) { return { "min-width": signedValue(value, negative) }; }],
      ["max-w", function handleMaxWidth(value) { return { "max-width": signedValue(value, negative) }; }],
      ["min-h", function handleMinHeight(value) { return { "min-height": signedValue(value, negative) }; }],
      ["max-h", function handleMaxHeight(value) { return { "max-height": signedValue(value, negative) }; }],
      ["basis", function handleBasis(value) { return { "flex-basis": signedValue(value, negative) }; }],
      ["ring-offset", function handleRingOffset(value) { return ringOffsetDeclaration(value); }],
      ["ring", function handleRing(value) {
        if (looksLikeColor(value)) return { "--jf-ring-color": value, "box-shadow": RING_BOX_SHADOW };
        return ringWidthDeclaration(value);
      }],
      ["rounded", function handleRounded(value) { return { "border-radius": value }; }],
      ["border", function handleBorder(value) {
        if (looksLikeColor(value)) return { "border-color": value };
        return { "border-width": value };
      }],
      ["outline-offset", function handleOutlineOffset(value) { return { "outline-offset": value }; }],
      ["outline", function handleOutline(value) {
        if (looksLikeColor(value)) return { "outline-color": value };
        return { "outline-width": value };
      }],
      ["shadow", function handleShadow(value) { return { "--jf-shadow": value, "box-shadow": RING_BOX_SHADOW }; }],
      ["aspect", function handleAspect(value) { return { "aspect-ratio": value }; }],
      ["leading", function handleLeading(value) { return { "line-height": value }; }],
      ["tracking", function handleTracking(value) { return { "letter-spacing": value }; }],
      ["duration", function handleDuration(value) { return { "transition-duration": value }; }],
      ["delay", function handleDelay(value) { return { "transition-delay": value }; }],
      ["ease", function handleEase(value) { return { "transition-timing-function": value }; }],
      ["transition", function handleTransition(value) { return { "transition-property": value }; }],
      ["opacity", function handleOpacity(value) { return { opacity: value }; }],
      ["blur", function handleBlur(value) { return { "--jf-blur": value, filter: FILTER_VALUE }; }],
      ["z", function handleZ(value) { return { "z-index": signedValue(value, negative) }; }],
      ["order", function handleOrder(value) { return { order: signedValue(value, negative) }; }],
      ["size", function handleSize(value) { return { width: signedValue(value, negative), height: signedValue(value, negative) }; }],
      ["w", function handleWidth(value) { return { width: signedValue(value, negative) }; }],
      ["h", function handleHeight(value) { return { height: signedValue(value, negative) }; }],
      ["p", function handlePadding(value) { return { padding: value }; }],
      ["px", function handlePaddingX(value) { return { "padding-left": value, "padding-right": value }; }],
      ["py", function handlePaddingY(value) { return { "padding-top": value, "padding-bottom": value }; }],
      ["pt", function handlePaddingTop(value) { return { "padding-top": value }; }],
      ["pr", function handlePaddingRight(value) { return { "padding-right": value }; }],
      ["pb", function handlePaddingBottom(value) { return { "padding-bottom": value }; }],
      ["pl", function handlePaddingLeft(value) { return { "padding-left": value }; }],
      ["m", function handleMargin(value) { return { margin: signedValue(value, negative) }; }],
      ["mx", function handleMarginX(value) { return { "margin-left": signedValue(value, negative), "margin-right": signedValue(value, negative) }; }],
      ["my", function handleMarginY(value) { return { "margin-top": signedValue(value, negative), "margin-bottom": signedValue(value, negative) }; }],
      ["mt", function handleMarginTop(value) { return { "margin-top": signedValue(value, negative) }; }],
      ["mr", function handleMarginRight(value) { return { "margin-right": signedValue(value, negative) }; }],
      ["mb", function handleMarginBottom(value) { return { "margin-bottom": signedValue(value, negative) }; }],
      ["ml", function handleMarginLeft(value) { return { "margin-left": signedValue(value, negative) }; }],
      ["gap-x", function handleGapX(value) { return { "column-gap": value }; }],
      ["gap-y", function handleGapY(value) { return { "row-gap": value }; }],
      ["gap", function handleGap(value) { return { gap: value }; }],
      ["inset-x", function handleInsetX(value) { return { left: signedValue(value, negative), right: signedValue(value, negative) }; }],
      ["inset-y", function handleInsetY(value) { return { top: signedValue(value, negative), bottom: signedValue(value, negative) }; }],
      ["inset", function handleInset(value) { return { top: signedValue(value, negative), right: signedValue(value, negative), bottom: signedValue(value, negative), left: signedValue(value, negative) }; }],
      ["top", function handleTop(value) { return { top: signedValue(value, negative) }; }],
      ["right", function handleRight(value) { return { right: signedValue(value, negative) }; }],
      ["bottom", function handleBottom(value) { return { bottom: signedValue(value, negative) }; }],
      ["left", function handleLeft(value) { return { left: signedValue(value, negative) }; }],
      ["bg", function handleBackground(value) {
        if (/^(url|linear-gradient|radial-gradient|conic-gradient)\(/.test(value)) return { "background-image": value };
        return { "background-color": value };
      }],
      ["bg-size", function handleBackgroundSize(value) { return { "background-size": value }; }],
      ["bg-position", function handleBackgroundPosition(value) { return { "background-position": value }; }],
      ["text", function handleText(value) {
        if (looksLikeLength(value)) return { "font-size": value };
        return { color: value };
      }],
      ["font", function handleFont(value) { return { "font-family": value }; }],
      ["indent", function handleIndent(value) { return { "text-indent": signedValue(value, negative) }; }],
      ["list", function handleList(value) { return { "list-style-type": value }; }],
      ["object", function handleObject(value) { return { "object-fit": value }; }],
      ["object-position", function handleObjectPosition(value) { return { "object-position": value }; }],
      ["fill", function handleFill(value) { return { fill: value }; }],
      ["stroke-width", function handleStrokeWidth(value) { return { "stroke-width": value }; }],
      ["stroke", function handleStroke(value) { return { stroke: value }; }],
      ["caret", function handleCaret(value) { return { "caret-color": value }; }],
      ["accent", function handleAccent(value) { return { "accent-color": value }; }],
      ["decoration", function handleDecoration(value) {
        if (looksLikeColor(value)) return { "text-decoration-color": value };
        return { "text-decoration-thickness": value };
      }],
      ["underline-offset", function handleUnderlineOffset(value) { return { "text-underline-offset": value }; }],
      ["content", function handleContent(value) { return { content: value }; }]
    ];

    for (var i = 0; i < dynamicPrefixes.length; i += 1) {
      var prefix = dynamicPrefixes[i][0];
      var start = prefix + "-[";
      if (base.indexOf(start) === 0 && base.charAt(base.length - 1) === "]") {
        var rawValue = base.slice(start.length, -1);
        var value = sanitizeValue(decodeInlineValue(rawValue));
        if (value === null) return null;
        return { declarations: dynamicPrefixes[i][1](value) };
      }
    }

    return null;
  }

  function resolveSpacingValue(key) {
    if (key === "auto") return "auto";
    return resolveInlineOrThemeValue(key, config.theme.spacing);
  }

  function resolveSizeValue(key, prefix) {
    var fixed = {
      auto: "auto",
      full: "100%",
      screen: prefix && prefix.indexOf("h") !== -1 ? "100vh" : "100vw",
      svw: "100svw",
      lvw: "100lvw",
      dvw: "100dvw",
      svh: "100svh",
      lvh: "100lvh",
      dvh: "100dvh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    };

    if (fixed[key]) return fixed[key];
    if (key === "none" && prefix && prefix.indexOf("max") === 0) return "none";
    if (key === "0") return "0px";

    var spacing = resolveSpacingValue(key);
    if (spacing !== undefined) return spacing;

    var fraction = fractionToPercent(key);
    if (fraction) return fraction;

    return undefined;
  }

  function resolveInlineOrThemeValue(key, scale) {
    if (scale && Object.prototype.hasOwnProperty.call(scale, key)) return scale[key];
    if (/^\d+(\.\d+)?(px|rem|em|%|vh|vw|svh|svw|lvh|lvw|dvh|dvw|ch|ex|cm|mm|in|pt|pc|vmin|vmax)$/.test(key)) return key;
    return undefined;
  }

  function resolveColorValue(rawKey) {
    var parts = splitOutsideBrackets(rawKey, "/");
    var key = parts[0];
    var alpha = parts.length > 1 ? parts.slice(1).join("/") : null;
    var color = findThemeColor(key);

    if (!color && looksLikeColor(key)) color = key;
    if (!color) return null;

    if (alpha !== null) {
      var alphaValue = alpha.charAt(0) === "[" && alpha.charAt(alpha.length - 1) === "]" ? decodeInlineValue(alpha.slice(1, -1)) : alpha;
      color = withAlpha(color, alphaValue);
    }

    return color;
  }

  function findThemeColor(key) {
    if (!key) return null;
    var colors = config.theme.colors || {};

    if (Object.prototype.hasOwnProperty.call(colors, key) && typeof colors[key] === "string") return colors[key];

    var parts = key.split("-");
    var current = colors;
    for (var i = 0; i < parts.length; i += 1) {
      if (current && Object.prototype.hasOwnProperty.call(current, parts[i])) {
        current = current[parts[i]];
      } else {
        return null;
      }
    }

    if (typeof current === "string") return current;
    if (current && typeof current.DEFAULT === "string") return current.DEFAULT;
    return null;
  }

  function withAlpha(color, alpha) {
    var value = String(alpha).trim();
    var number = value;

    if (/^\d+(\.\d+)?$/.test(value)) {
      var parsed = parseFloat(value);
      number = parsed > 1 ? parsed / 100 : parsed;
    }

    if (String(number).indexOf("%") !== -1) {
      number = parseFloat(number) / 100;
    }

    var rgb = hexToRgb(color);
    if (rgb) return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + number + ")";

    return "color-mix(in srgb," + color + " " + (parseFloat(number) * 100) + "%,transparent)";
  }

  function hexToRgb(color) {
    var hex = String(color).trim();
    var short = /^#([0-9a-f]{3})$/i.exec(hex);
    if (short) {
      return {
        r: parseInt(short[1].charAt(0) + short[1].charAt(0), 16),
        g: parseInt(short[1].charAt(1) + short[1].charAt(1), 16),
        b: parseInt(short[1].charAt(2) + short[1].charAt(2), 16)
      };
    }

    var full = /^#([0-9a-f]{6})$/i.exec(hex);
    if (full) {
      return {
        r: parseInt(full[1].slice(0, 2), 16),
        g: parseInt(full[1].slice(2, 4), 16),
        b: parseInt(full[1].slice(4, 6), 16)
      };
    }

    return null;
  }

  function looksLikeColor(value) {
    return /^(#|rgb\(|rgba\(|hsl\(|hsla\(|lab\(|lch\(|oklab\(|oklch\(|color\(|var\(|currentColor$|transparent$|inherit$|initial$|unset$)/i.test(value) ||
      /^(black|white|red|green|blue|yellow|orange|purple|pink|gray|grey|slate|cyan|teal|violet|indigo|rose|brown)$/i.test(value);
  }

  function looksLikeLength(value) {
    return /^(calc\(|clamp\(|min\(|max\(|var\()/.test(value) || /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|svh|svw|lvh|lvw|dvh|dvw|ch|ex|cm|mm|in|pt|pc|vmin|vmax)$/.test(value);
  }

  function numericValue(key) {
    if (/^-?\d+(\.\d+)?$/.test(key)) return key;
    return undefined;
  }

  function numericMilliseconds(key) {
    if (/^\d+(\.\d+)?$/.test(key)) return key + "ms";
    return null;
  }

  function fractionToPercent(key) {
    var match = /^(\d+)\/(\d+)$/.exec(key);
    if (!match) return null;
    var denominator = parseFloat(match[2]);
    if (!denominator) return null;
    return (parseFloat(match[1]) / denominator * 100) + "%";
  }

  function decodeInlineValue(value) {
    return String(value)
      .replace(/\\_/g, "\u0000")
      .replace(/_/g, " ")
      .replace(/\u0000/g, "_")
      .replace(/\\,/g, ",");
  }

  function sanitizeValue(value) {
    if (value === null || value === undefined) return null;

    var safe = String(value).trim();
    if (!safe) return null;

    if (/[<>"';{}]/.test(safe)) return null;
    if (/(?:url\s*\(|javascript\s*:|data\s*:)/i.test(safe)) return null;
    if (!hasBalancedParentheses(safe)) return null;
    if (!hasOnlySafeValueCharacters(safe)) return null;
    if (!hasOnlyAllowedFunctions(safe)) return null;

    return safe;
  }

  function hasBalancedParentheses(value) {
    var depth = 0;
    for (var i = 0; i < value.length; i += 1) {
      var char = value.charAt(i);
      if (char === "(") depth += 1;
      if (char === ")") {
        depth -= 1;
        if (depth < 0) return false;
      }
    }
    return depth === 0;
  }

  function hasOnlySafeValueCharacters(value) {
    return /^[#.,%()\s+\-*/0-9A-Za-z_]+$/.test(value);
  }

  function hasOnlyAllowedFunctions(value) {
    var allowed = {
      calc: true,
      rgb: true,
      rgba: true,
      hsl: true,
      hsla: true
    };
    var functionPattern = /([A-Za-z-]+)\s*\(/g;
    var match;
    while ((match = functionPattern.exec(value))) {
      if (!allowed[match[1].toLowerCase()]) return false;
    }
    return true;
  }

  function resolveArbitraryProperty(value) {
    var decoded = decodeInlineValue(value);
    var splitAt = findDeclarationSeparator(decoded);
    if (splitAt <= 0) return null;

    var property = decoded.slice(0, splitAt).trim();
    var propertyValue = sanitizeValue(decoded.slice(splitAt + 1).trim());
    if (!isSafeCssProperty(property) || !propertyValue) return null;

    var declarations = {};
    declarations[property] = propertyValue;
    return declarations;
  }

  function findDeclarationSeparator(value) {
    var bracketDepth = 0;
    var parenDepth = 0;
    var quote = "";

    for (var i = 0; i < value.length; i += 1) {
      var char = value.charAt(i);
      if (quote) {
        if (char === quote && value.charAt(i - 1) !== "\\") quote = "";
        continue;
      }
      if (char === "\"" || char === "'") {
        quote = char;
        continue;
      }
      if (char === "[") bracketDepth += 1;
      if (char === "]") bracketDepth = Math.max(0, bracketDepth - 1);
      if (char === "(") parenDepth += 1;
      if (char === ")") parenDepth = Math.max(0, parenDepth - 1);
      if (char === ":" && bracketDepth === 0 && parenDepth === 0) return i;
    }

    return -1;
  }

  function isSafeCssProperty(property) {
    return /^--[A-Za-z0-9_-]+$/.test(property) || /^-?[A-Za-z][A-Za-z0-9-]*$/.test(property);
  }

  function propsToValue(props, value) {
    var output = {};
    for (var i = 0; i < props.length; i += 1) output[props[i]] = value;
    return output;
  }

  function signedValue(value, negative) {
    if (!negative) return value;
    if (String(value).charAt(0) === "-") return String(value).slice(1);
    if (/^calc\(/.test(value)) return "calc(" + value.slice(5, -1) + " * -1)";
    if (value === "0" || value === "0px") return value;
    return "-" + value;
  }

  function ringWidthDeclaration(value) {
    return {
      "--jf-ring-shadow": "var(--jf-ring-inset,) 0 0 0 calc(" + value + " + var(--jf-ring-offset-width,0px)) var(--jf-ring-color,rgb(59 130 246 / 0.5))",
      "box-shadow": RING_BOX_SHADOW
    };
  }

  function ringOffsetDeclaration(value) {
    return {
      "--jf-ring-offset-width": value,
      "--jf-ring-offset-color": "var(--jf-ring-offset-color,#fff)",
      "--jf-ring-offset-shadow": "var(--jf-ring-inset,) 0 0 0 var(--jf-ring-offset-width,0px) var(--jf-ring-offset-color,#fff)",
      "box-shadow": RING_BOX_SHADOW
    };
  }

  function transformDeclaration(prop, value) {
    var declarations = {};
    declarations[prop] = value;
    declarations.transform = TRANSFORM_VALUE;
    return declarations;
  }

  function scaleDeclaration(value) {
    return {
      "--jf-scale-x": value,
      "--jf-scale-y": value,
      transform: TRANSFORM_VALUE
    };
  }

  function rotateDeclaration(value) {
    return transformDeclaration("--jf-rotate", value);
  }

  function negateUtility(declarations) {
    var output = {};
    Object.keys(declarations).forEach(function negateDeclaration(prop) {
      output[prop] = signedValue(declarations[prop], true);
    });
    return output;
  }

  function cloneUtility(utility) {
    return deepClone(utility);
  }

  function normalizeCustomUtility(value) {
    if (typeof value === "string") {
      var trimmed = value.trim();
      if (!trimmed) return null;
      if (looksLikeCssDeclarationBlock(trimmed)) return { declarations: trimmed };
      return { aliasTokens: expandApplyClassValue(trimmed) };
    }
    if (typeof value === "function") return normalizeCustomUtility(value(config));
    if (Array.isArray(value)) {
      var aliasTokens = [];
      flattenToArray(value).forEach(function addAliasArrayToken(item) {
        if (typeof item === "string") aliasTokens = aliasTokens.concat(expandApplyClassValue(item));
      });
      return { aliasTokens: aliasTokens };
    }
    if (value && value.rules) return value;
    if (value && value.declarations) return value;
    if (value && value.aliasTokens) return value;
    if (value && typeof value === "object") return { declarations: value };
    return null;
  }

  function looksLikeCssDeclarationBlock(value) {
    return value.indexOf("{") !== -1 || value.indexOf(";") !== -1 || /^\s*(--[A-Za-z0-9_-]+|[A-Za-z-]+)\s*:\s+/.test(value);
  }

  function createConfig(userConfig) {
    var input = userConfig || {};
    var merged = deepMerge(deepClone(DEFAULT_CONFIG), input);
    if (input.theme && input.theme.extend) {
      delete merged.theme.extend;
      merged.theme = deepMerge(deepClone(merged.theme), input.theme.extend);
    }
    return merged;
  }

  function deepMerge(target) {
    for (var i = 1; i < arguments.length; i += 1) {
      var source = arguments[i];
      if (!source || typeof source !== "object") continue;
      Object.keys(source).forEach(function mergeKey(key) {
        var value = source[key];
        if (Array.isArray(value)) {
          target[key] = value.slice();
        } else if (value && typeof value === "object") {
          if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) target[key] = {};
          target[key] = deepMerge(target[key], value);
        } else {
          target[key] = value;
        }
      });
    }
    return target;
  }

  function deepClone(value) {
    if (Array.isArray(value)) return value.map(deepClone);
    if (value && typeof value === "object") {
      var output = {};
      Object.keys(value).forEach(function cloneKey(key) {
        output[key] = deepClone(value[key]);
      });
      return output;
    }
    return value;
  }

  function flattenToArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.reduce(function flatten(result, item) {
        return result.concat(flattenToArray(item));
      }, []);
    }
    return [value];
  }

  function cssEscape(value) {
    if (global.CSS && typeof global.CSS.escape === "function") return global.CSS.escape(value);
    return String(value).replace(/^[0-9]/, "\\3$& ").replace(/^-?[0-9]/, "\\3$& ").replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function buildAttributeSelector(attributeName, value) {
    var attr = attributeName === "data-jetflow" ? "data-jetflow" : "class";
    return "[" + attr + "*=\"" + cssAttributeEscape(value) + "\"]";
  }

  function cssAttributeEscape(value) {
    return String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
  }

  function escapeAttributeName(value) {
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "");
  }

  function isJetFlowStyleNode(node) {
    return !!(node && node.nodeType === 1 && node.tagName && String(node.tagName).toLowerCase() === "style" &&
      (node.getAttribute("type") === "text/jetflow" || (node.hasAttribute && node.hasAttribute("data-jetflow-apply"))));
  }

  function warnInvalidToken(token, message) {
    if (!config.debug || !global.console || !global.console.warn) return;
    var key = token + "::" + message;
    if (invalidTokenWarnings.has(key)) return;
    invalidTokenWarnings.add(key);
    global.console.warn("[JetFlow] Ignored class \"" + token + "\": " + message);
  }

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }
})(typeof window !== "undefined" ? window : this, typeof document !== "undefined" ? document : null);
