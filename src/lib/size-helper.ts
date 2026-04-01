import { TEXT_SIZE } from "../constants/size-constants";
import type { Size, TextSize } from "../types/size-types";

export function getTextSize(size: Size = "base"): TextSize {
  return TEXT_SIZE[size] ?? "";
}
