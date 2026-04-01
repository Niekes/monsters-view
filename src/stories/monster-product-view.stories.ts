import { html } from "lit";
import "../components/monster-product-view";

// write default storybook story
export default {
  title: "view/monster-product-view",
  component: "monster-product-view",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    headline: {
      control: { table: { disable: true } },
    },
  },
};

export const Default = () => html`
  <monster-product-view></monster-product-view>
`;

export const OptionalHeadline = (args: { headline: string }) => html`
  <monster-product-view>
    <h2 slot="header">${args.headline}</h2>
  </monster-product-view>
`;

OptionalHeadline.args = {
  headline: "These are our products",
};

OptionalHeadline.argTypes = {
  headline: { control: "text" },
};
