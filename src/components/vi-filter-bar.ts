import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import globalStyles from "../index.css?inline";

import "../components/vi-button";
import type { Color } from "../types/color-types";
import type { Size } from "../types/size-types";

const defaultGetValue = <T extends object>(item: T) =>
  "value" in item && typeof item.value === "string" ? item.value : "";

const defaultGetLabel = <T extends object>(item: T) =>
  "label" in item && typeof item.label === "string" ? item.label : "";

const defaultGetVariant = <T extends object>(item: T) =>
  "variant" in item && typeof item.variant === "string" ? item.variant : "blue";

const defaultGetSelected = <T extends object>(item: T) =>
  "selected" in item && typeof item.selected === "boolean"
    ? item.selected
    : false;

const defaultGetSize = <T extends object>(item: T) =>
  "size" in item && typeof item.size === "string" ? item.size : "md";

const defaultSetSelected = <T extends object>(item: T) => {
  if ("selected" in item && typeof item.selected === "boolean") {
    item.selected = !item.selected;
  }
};

@customElement("vi-filter-bar")
export class viFilterBar<T extends object> extends LitElement {
  @property({ type: Array })
  items: Array<T> = [];

  @property({ attribute: false })
  getValue: (item: any) => string | number = defaultGetValue;

  @property({ attribute: false })
  getLabel: (item: any) => string | number = defaultGetLabel;

  @property({ attribute: false })
  getVariant: (item: any) => string = defaultGetVariant;

  @property({ attribute: false })
  getSelected: (item: any) => boolean = defaultGetSelected;

  @property({ attribute: false })
  setSelected: (item: any) => void = defaultSetSelected;

  @property({ attribute: false })
  getSize: (item: any) => Size = defaultGetSize as (item: T) => Size;

  private _toggleSelection(item: T) {
    const targetValue = this.getValue(item);

    this.items = this.items.map((current) => {
      const updated = { ...current };
      if (this.getValue(current) === targetValue) {
        this.setSelected(updated);
      } else {
        if ("selected" in updated && typeof updated.selected === "boolean") {
          updated.selected = false;
        }
      }
      return updated;
    });

    this.requestUpdate("items");

    this.dispatchEvent(
      new CustomEvent("filter-toggle", {
        detail: { items: this.items },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`<div
      class="flex border border-gray-200 w-full rounded-lg overflow-hidden mx-auto p-4"
    >
      <div class="flex flex-col gap-2">
        <slot name="title"></slot>

        <div class="flex flex-wrap gap-2">
          ${this.items.length === 0
            ? html`<span class="text-slate-400 text-sm">No filters</span>`
            : this.items.map(
                (item) => html`
                  <vi-button
                    ?outline=${!this.getSelected(item)}
                    variant=${this.getVariant(item) as Color}
                    size=${this.getSize(item) as Size}
                    @click=${() => this._toggleSelection(item)}
                    >${this.getLabel(item)}</vi-button
                  >
                `,
              )}
        </div>
      </div>
    </div>`;
  }

  static styles = [unsafeCSS(globalStyles)];
}
