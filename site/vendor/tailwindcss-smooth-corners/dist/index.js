// src/index.ts
import defaultTheme from "tailwindcss/defaultTheme";
import createPlugin from "tailwindcss/plugin";
var DEFAULT_SUPERELLIPSE = 2;
var ROUNDED_FAMILIES = [
  "rounded",
  "rounded-s",
  "rounded-e",
  "rounded-t",
  "rounded-r",
  "rounded-b",
  "rounded-l",
  "rounded-ss",
  "rounded-se",
  "rounded-ee",
  "rounded-es",
  "rounded-tl",
  "rounded-tr",
  "rounded-br",
  "rounded-bl"
];
var NUMERIC_VALUE = /^-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?$/i;
function isNumericValue(value) {
  return NUMERIC_VALUE.test(value.trim());
}
function normalizeCornerShape(value) {
  if (value === void 0) {
    return `superellipse(${DEFAULT_SUPERELLIPSE})`;
  }
  if (typeof value === "number") {
    return `superellipse(${value})`;
  }
  const trimmedValue = value.trim();
  if (isNumericValue(trimmedValue)) {
    return `superellipse(${trimmedValue})`;
  }
  return trimmedValue;
}
function supportsCornerShape(shape) {
  return {
    "@supports (corner-shape: round)": {
      "corner-shape": shape
    }
  };
}
function getDefaultCornerShape(api, options) {
  const fallbackValue = options?.default ?? api.theme("cornerShape.DEFAULT", DEFAULT_SUPERELLIPSE);
  return normalizeCornerShape(fallbackValue);
}
function resolveRoundedValues(api) {
  const rawBorderRadius = api.theme("borderRadius", defaultTheme.borderRadius);
  return Object.fromEntries(
    Object.entries(rawBorderRadius ?? defaultTheme.borderRadius).filter(([key]) => key !== "DEFAULT")
  );
}
function resolveCornerShapeValues(api) {
  const rawCornerShape = api.theme("cornerShape", {});
  const resolvedEntries = Object.entries(rawCornerShape ?? {}).filter(([key, value]) => key !== "DEFAULT" && value !== void 0).map(([key, value]) => [key, normalizeCornerShape(value)]);
  return Object.fromEntries(resolvedEntries);
}
function buildRoundedUtilityMap(defaultCornerShape) {
  return Object.fromEntries(
    ROUNDED_FAMILIES.map((family) => [family, () => supportsCornerShape(defaultCornerShape)])
  );
}
function buildStaticUtilities(api, defaultCornerShape) {
  const prefixedUtilities = [
    ["corner-shape-default", supportsCornerShape(defaultCornerShape)],
    ["corner-shape-round", supportsCornerShape("round")]
  ];
  return Object.fromEntries(
    prefixedUtilities.map(([utility, rules]) => [`.${api.prefix(utility)}`, rules])
  );
}
function buildCornerShapeUtilityValues(api) {
  return {
    ...resolveCornerShapeValues(api),
    __BARE_VALUE__: ({ value }) => isNumericValue(value) ? normalizeCornerShape(value) : void 0
  };
}
var tailwindcssSmoothCorners = createPlugin.withOptions(
  (options) => (api) => {
    const defaultCornerShape = getDefaultCornerShape(api, options);
    const roundedValues = resolveRoundedValues(api);
    api.addUtilities(
      Object.fromEntries(
        ROUNDED_FAMILIES.map((family) => [
          `.${api.prefix(family)}`,
          supportsCornerShape(defaultCornerShape)
        ])
      )
    );
    api.matchUtilities(buildRoundedUtilityMap(defaultCornerShape), {
      values: roundedValues,
      type: ["length", "percentage"]
    });
    api.addUtilities(buildStaticUtilities(api, defaultCornerShape));
    api.matchUtilities(
      {
        "corner-shape": (value) => supportsCornerShape(normalizeCornerShape(value))
      },
      {
        values: buildCornerShapeUtilityValues(api)
      }
    );
  },
  () => ({
    theme: {
      cornerShape: {
        DEFAULT: DEFAULT_SUPERELLIPSE
      }
    }
  })
);
var index_default = tailwindcssSmoothCorners;
export {
  index_default as default
};
