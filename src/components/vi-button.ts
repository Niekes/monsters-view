import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import globalStyles from "../index.css?inline";
import { getBg, getBorder, getText } from "../lib/color-helper";
import type { Color } from "../types/color-types";
import type { Size } from "../types/size-types";
import { getTextSize } from "../lib/size-helper";

const paddingMap = new Map<Size, string>([
  ["xs", "px-1 py-0.5"],
  ["sm", "px-2 py-1"],
  ["md", "px-4 py-2"],
  ["lg", "px-6 py-2.5"],
  ["xl", "px-8 py-3"],
]);

@customElement("vi-button")
export class viButton extends LitElement {
  @property()
  variant: Color = "blue";

  @property()
  size: Size = "md";

  @property({ type: Boolean })
  outline = false;

  render() {
    const textColor = getText(this.variant, "700");
    const borderColor = getBorder(this.variant, "700");
    const bgColor = getBg(this.variant, "700");
    const textSize = getTextSize(this.size);
    const padding = paddingMap.get(this.size) ?? "px-4 py-2";

    const styleCss = this.outline
      ? `border bg-white ${borderColor} ${textColor}`
      : `${bgColor} text-white border-1`;

    return html`
      <button
        type="button"
        class="${styleCss} ${padding} ${textSize} filter hover:contrast-150 rounded-lg cursor-pointer tracking-wider font-medium outline-0 shadow-lg hover:shadow-xl"
      >
        <slot></slot>
      </button>
    `;
  }

  static styles = [unsafeCSS(globalStyles)];
}
