import createPlugin from 'tailwindcss/plugin';

type CornerShapeValue = number | string;
interface CornerShapeTheme {
    DEFAULT?: CornerShapeValue;
    [key: string]: CornerShapeValue | undefined;
}
interface TailwindcssSmoothCornersOptions {
    default?: CornerShapeValue;
}
declare const tailwindcssSmoothCorners: ReturnType<typeof createPlugin.withOptions<TailwindcssSmoothCornersOptions | undefined>>;

export { type CornerShapeTheme, type CornerShapeValue, type TailwindcssSmoothCornersOptions, tailwindcssSmoothCorners as default };
