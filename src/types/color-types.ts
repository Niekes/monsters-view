import type { COLOR_WEIGHTS, COLORS } from "../constants/colors-contants";

export type Color = (typeof COLORS)[number];
export type ColorWeight = (typeof COLOR_WEIGHTS)[number];

export type TextColor = `text-${Color}-${ColorWeight}`;
export type BgColor = `bg-${Color}-${ColorWeight}`;
export type BorderColor = `border-${Color}-${ColorWeight}`;
