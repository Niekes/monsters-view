import { html } from "lit";
import "../components/vi-button";
import type { Color } from "../types/color-types";
import type { Size } from "../types/size-types";
import { COLORS } from "../constants/colors-contants";
import { SIZES } from "../constants/size-constants";
import { action } from "storybook/actions";

const handleClick = (e: Event) => {
  action("click")(e);
};

export default {
  title: "components/vi-button",
  component: "vi-button",
  args: {
    text: "Click Me",
  },
  argTypes: {
    text: { control: "text" },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    outline: { table: { disable: true } },
  },
};

export const Default = (args: { text: string }) => html`
  <vi-button @click=${handleClick}>${args.text}</vi-button>
`;

export const FullControl = (args: {
  variant: Color;
  text: string;
  size: Size;
  outline: boolean;
}) => html`
  <vi-button
    ?outline=${args.outline}
    variant=${args.variant}
    size=${args.size}
    @click=${handleClick}
    >${args.text}</vi-button
  >
`;

FullControl.args = {
  variant: "cyan",
  size: "lg",
  text: "Control me!",
};

FullControl.argTypes = {
  outline: { control: "boolean", table: { disable: false } },
  variant: { control: "select", options: COLORS, table: { disable: false } },
  size: {
    control: "select",
    options: SIZES,
    table: { disable: false },
  },
};
