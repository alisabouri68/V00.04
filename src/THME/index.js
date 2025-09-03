import plugin from "tailwindcss/plugin";
import popcorn from "./THME_popcorn";
import nighWish from "./THME_nighWish";
import defaultTheme from "./THME_default";

const Templates = {
  colors: [
    ["text-$", "color"],
    ["decoration-$", "text-decoration-color"],
    ["bg-$", "background-color"],
    [
      "from-$",
      [
        "--tw-gradient-from: $ var(--tw-gradient-from-position)",
        "--tw-gradient-to: $00 var(--tw-gradient-to-position)",
        "--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)",
      ],
    ],
    [
      "via-$",
      [
        "--tw-gradient-to: $00  var(--tw-gradient-to-position)",
        "--tw-gradient-stops: var(--tw-gradient-from), $ var(--tw-gradient-via-position), var(--tw-gradient-to)",
      ],
    ],
    ["to-$", "--tw-gradient-to: $ var(--tw-gradient-to-position)"],
    ["border-$", "border-color"],
    ["border-x-$", ["border-left-color", "border-right-color"]],
    ["border-y-$", ["border-top-color", "border-bottom-color"]],
    ["border-t-$", "border-top-color"],
    ["border-b-$", "border-bottom-color"],
    ["border-r-$", "border-right-color"],
    ["border-l-$", "border-left-color"],
    ["border-s-$", "border-inline-start-color"],
    ["border-e-$", "border-inline-end-color"],
    ["divide-$", "border-color"],
    ["outline-$", "outline-color"],
    ["ring-$", "--tw-ring-color"],
    [
      "ring-offset-$",
      [
        "--tw-ring-offset-color",
        "box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow)",
      ],
    ],
    ["shadow-$", "--tw-shadow-color"],
    ["accent-$", "accent-color"],
    ["caret-$", "caret-color"],
  ],
};

/**
 *
 * @param {*} styles
 * @param {*} name
 * @param {*} key
 * @param {*} value
 * @returns
 */
const createStyles = (styles, name, key, value, isLoop = false) => {
  name = `:is(.dark .${name.replace("$", key)})`;
  let res = {};
  if (styles.includes("$")) {
    const [styleName, styleVal] = styles.split(":");
    res[name] = { [styleName]: `${styleVal.replace("$", value)}` };
  } else res[name] = { [styles]: `${value}` };

  if (isLoop) return res[name];

  return res;
};

module.exports = plugin(
  ({ addBase }) => {
    let darkModeUtilities = {};

    Object.keys(nighWish.colors).map((key) => {
      const value = nighWish.colors[key];
      const templates = Templates.colors;
      templates.map((template) => {
        const [name, styles] = template;
        if (typeof styles === "string")
          darkModeUtilities = {
            ...darkModeUtilities,
            ...createStyles(styles, name, key, value),
          };
        else {
          let newStyles = {};
          styles.map(
            (style) =>
              (newStyles = {
                ...newStyles,
                ...createStyles(style, name, key, value, true),
              })
          );
          darkModeUtilities[`:is(.dark .${name.replace("$", key)})`] =
            newStyles;
        }
      });
    });

    addBase(darkModeUtilities);
  },
  {
    theme: {
      extend: {
        ...defaultTheme,
        ...popcorn,
        fontSize: {
          h1: "10px",
          h2: "12px",
          h3: "14px",
          h4: "16px",
          h5: "18px",
          h6: "24px",
        },
        fontWeight: {},
        opacity: {
          none: "0",
          low: "0.25",
          base: "0.50",
          hight: "0.75",
          glass: "1",
        },
      "boxShadow": {
  "none": "none", // بدون سایه
  "mini": "0 1px 1px rgba(0, 0, 0, 0.01)", // خیلی خیلی سبک
  "sm": "0 1px 2px rgba(0, 0, 0, 0.04)", // کم و ظریف
  "md": "0 3px 6px rgba(0, 0, 0, 0.1)", // استاندارد ملایم
  "lg": "0 4px 8px rgba(0, 0, 0, 0.15)", // کمی قوی‌تر
  "xl": "0 6px 12px rgba(0, 0, 0, 0.2)" // عمیق‌تر و واضح‌تر
},

        margin: {
          none: "0rem",
          small: "0.25rem",
          default: "0.50rem",
          large: "0.75rem",
          xlarge: "1rem",
        },
        padding: {
          none: "0rem",
          small: "0.25rem",
          default: "0.50rem",
          large: "0.75rem",
          xlarge: "1rem",
        },
        borderWidth: {
          none: "0rem",
          small: "0.03rem",
          standard: "0.06rem",
          high: "0.125rem",
        },
        borderRadius: {
          none: "0rem",
          small: "0.25rem",
          default: "0.50rem",
          large: "0.75rem",
          xlarge: "1rem",
        },
      },
    },
  }
);
