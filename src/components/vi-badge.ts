import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import globalStyles from "../index.css?inline";
import { getBg, getText } from "../lib/color-helper";
import type { Color } from "../types/color-types";
import type { Size } from "../types/size-types";
import { getTextSize } from "../lib/size-helper";

@customElement("vi-badge")
export class ViBadge extends LitElement {
  @property()
  variant: Color = "blue";

  @property()
  size: Size = "md";

  render() {
    const bgColor = getBg(this.variant, "700");
    const textColor = getText(this.variant, "50");
    const textSize = getTextSize(this.size);

    return html`
      <span
        class="${bgColor} ${textColor} ${textSize} font-medium px-3 py-1.5 tracking-wide rounded-full"
      >
        <slot></slot>
      </span>
    `;
  }

  static styles = [unsafeCSS(globalStyles)];
}
