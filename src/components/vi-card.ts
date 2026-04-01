import { html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import globalStyles from "../index.css?inline";

@customElement("vi-card")
export class ViCard extends LitElement {
  render() {
    return html`
      <div
        class="bg-white border border-gray-200 shadow-md w-full rounded-lg overflow-hidden mx-auto"
      >
        <div class="aspect-3/2">
          <slot name="media"></slot>
        </div>

        <div class="p-6 grid gap-4">
          <slot name="header"></slot>
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  static styles = [unsafeCSS(globalStyles)];
}
