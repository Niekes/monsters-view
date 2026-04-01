import { BG, TEXT, BORDER } from "../constants/colors-contants";
import type {
  BgColor,
  BorderColor,
  Color,
  ColorWeight,
  TextColor,
} from "../types/color-types";

export function getBg(color: Color, weight: ColorWeight = "500"): BgColor {
  return BG[color]?.[weight] ?? "";
}

export function getText(color: Color, weight: ColorWeight = "500"): TextColor {
  return TEXT[color]?.[weight] ?? "";
}

export function getBorder(
  color: Color,
  weight: ColorWeight = "500",
): BorderColor {
  return BORDER[color]?.[weight] ?? "";
}
