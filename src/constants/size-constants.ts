import type { Size, TextSize } from "../types/size-types";

export const SIZES = ["xs", "sm", "md", "lg", "xl", "base"] as const;

export const TEXT_SIZE: Record<Size, TextSize> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};
