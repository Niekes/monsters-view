import { html } from "lit";
import "../components/vi-badge";
import type { Color } from "../types/color-types";
import { COLORS } from "../constants/colors-contants";
import { SIZES } from "../constants/size-constants";
import type { Size } from "../types/size-types";

export default {
  title: "components/vi-badge",
  component: "vi-badge",
  args: {
    text: "badge",
  },
  argTypes: {
    text: { control: "text" },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  },
};

export const Default = (args: { text: string }) => html`
  <vi-badge>${args.text}</vi-badge>
`;

export const FullControl = (args: {
  variant: Color;
  text: string;
  size: Size;
}) => html`
  <vi-badge variant=${args.variant} size=${args.size}>${args.text}</vi-badge>
`;

FullControl.args = {
  variant: "cyan",
  size: "lg",
  text: "Control me!",
};

FullControl.argTypes = {
  variant: { control: "select", options: COLORS, table: { disable: false } },
  size: {
    control: "select",
    options: SIZES,
    table: { disable: false },
  },
};
