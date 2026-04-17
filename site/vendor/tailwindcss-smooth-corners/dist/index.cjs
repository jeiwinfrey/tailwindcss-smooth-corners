"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_defaultTheme = __toESM(require("tailwindcss/defaultTheme"), 1);
var import_plugin = __toESM(require("tailwindcss/plugin"), 1);
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
  const rawBorderRadius = api.theme("borderRadius", import_defaultTheme.default.borderRadius);
  return Object.fromEntries(
    Object.entries(rawBorderRadius ?? import_defaultTheme.default.borderRadius).filter(([key]) => key !== "DEFAULT")
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
var tailwindcssSmoothCorners = import_plugin.default.withOptions(
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
