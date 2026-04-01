import type { SIZES } from "../constants/size-constants";

export type Size = (typeof SIZES)[number];

export type TextSize = `text-${Size}`;
