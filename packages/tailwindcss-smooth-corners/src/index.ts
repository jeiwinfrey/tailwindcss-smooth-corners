import defaultTheme from "tailwindcss/defaultTheme";
import createPlugin from "tailwindcss/plugin";
import type { Config, PluginAPI } from "tailwindcss/plugin";

export type CornerShapeValue = number | string;

export interface CornerShapeTheme {
  DEFAULT?: CornerShapeValue;
  [key: string]: CornerShapeValue | undefined;
}

export interface TailwindcssSmoothCornersOptions {
  default?: CornerShapeValue;
}

const DEFAULT_SUPERELLIPSE = 2;
const ROUNDED_FAMILIES = [
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
  "rounded-bl",
] as const;

const NUMERIC_VALUE = /^-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?$/i;

function isNumericValue(value: string): boolean {
  return NUMERIC_VALUE.test(value.trim());
}

function normalizeCornerShape(value: CornerShapeValue | undefined): string {
  if (value === undefined) {
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

function supportsCornerShape(shape: string) {
  return {
    "@supports (corner-shape: round)": {
      "corner-shape": shape,
    },
  };
}

function getDefaultCornerShape(
  api: PluginAPI,
  options?: TailwindcssSmoothCornersOptions,
): string {
  const fallbackValue = options?.default ?? api.theme("cornerShape.DEFAULT", DEFAULT_SUPERELLIPSE);
  return normalizeCornerShape(fallbackValue);
}

function resolveRoundedValues(api: PluginAPI): Record<string, string> {
  const rawBorderRadius = api.theme("borderRadius", defaultTheme.borderRadius) as
    | Record<string, string>
    | undefined;

  return Object.fromEntries(
    Object.entries(rawBorderRadius ?? defaultTheme.borderRadius).filter(([key]) => key !== "DEFAULT"),
  );
}

function resolveCornerShapeValues(api: PluginAPI): Record<string, string> {
  const rawCornerShape = api.theme("cornerShape", {}) as CornerShapeTheme | undefined;
  const resolvedEntries = Object.entries(rawCornerShape ?? {})
    .filter(([key, value]) => key !== "DEFAULT" && value !== undefined)
    .map(([key, value]) => [key, normalizeCornerShape(value)]);

  return Object.fromEntries(resolvedEntries);
}

function buildRoundedUtilityMap(defaultCornerShape: string) {
  return Object.fromEntries(
    ROUNDED_FAMILIES.map((family) => [family, () => supportsCornerShape(defaultCornerShape)]),
  );
}

function buildStaticUtilities(api: PluginAPI, defaultCornerShape: string) {
  const prefixedUtilities = [
    ["corner-shape-default", supportsCornerShape(defaultCornerShape)],
    ["corner-shape-round", supportsCornerShape("round")],
  ] as const;

  return Object.fromEntries(
    prefixedUtilities.map(([utility, rules]) => [`.${api.prefix(utility)}`, rules]),
  );
}

function buildCornerShapeUtilityValues(api: PluginAPI) {
  return {
    ...resolveCornerShapeValues(api),
    __BARE_VALUE__: ({ value }: { value: string }) =>
      isNumericValue(value) ? normalizeCornerShape(value) : undefined,
  } as Record<string, string> & {
    __BARE_VALUE__: (candidate: { value: string }) => string | undefined;
  };
}

const tailwindcssSmoothCorners: ReturnType<
  typeof createPlugin.withOptions<TailwindcssSmoothCornersOptions | undefined>
> = createPlugin.withOptions<TailwindcssSmoothCornersOptions | undefined>(
  (options) =>
    (api) => {
      const defaultCornerShape = getDefaultCornerShape(api, options);
      const roundedValues = resolveRoundedValues(api);

      api.addUtilities(
        Object.fromEntries(
          ROUNDED_FAMILIES.map((family) => [
            `.${api.prefix(family)}`,
            supportsCornerShape(defaultCornerShape),
          ]),
        ),
      );

      api.matchUtilities(buildRoundedUtilityMap(defaultCornerShape), {
        values: roundedValues,
        type: ["length", "percentage"],
      });

      api.addUtilities(buildStaticUtilities(api, defaultCornerShape));

      api.matchUtilities(
        {
          "corner-shape": (value) => supportsCornerShape(normalizeCornerShape(value)),
        },
        {
          values: buildCornerShapeUtilityValues(api),
        },
      );
    },
  () =>
    ({
      theme: {
        cornerShape: {
          DEFAULT: DEFAULT_SUPERELLIPSE,
        },
      },
    }) satisfies Partial<Config>,
);

export default tailwindcssSmoothCorners;
