import { html } from "lit";
import { action } from "storybook/actions";
import "../components/vi-filter-bar";

export default {
  title: "components/vi-filter-bar",
  component: "vi-filter-bar",
  args: {
    items: [
      { label: "Pizza", value: "pizza", color: "yellow", selected: true },
      { label: "Hot Dog", value: "hot-dog", color: "blue", selected: false },
      { label: "Burger", value: "burger", color: "emerald", selected: false },
      { label: "Taco", value: "taco", color: "violet", selected: false },
      { label: "Fries", value: "fries", color: "cyan", selected: false },
    ],
  },
  argTypes: {
    "filter-toggle": { action: "filter-toggle" },
  },
};

const handleFilterToggle = (event: CustomEvent<{ value: string }>) => {
  console.log("Filter toggled:", event.detail);
  action("filter-toggle")(event);
};

export const Default = (args: { items: string[] }) => html`
  <vi-filter-bar
    .items=${args.items}
    .getVariant=${(item: any) => item.color}
    @filter-toggle=${handleFilterToggle}
  ></vi-filter-bar>
`;

export const WithTitle = (args: { items: any[]; title: string }) => html`
  <vi-filter-bar
    .items=${args.items}
    .getVariant=${(item: any) => item.color}
    @filter-toggle=${handleFilterToggle}
  >
    ${args.title
      ? html`<h2 slot="title" class="text-slate-900 text-xl font-semibold">
          ${args.title}
        </h2>`
      : null}
  </vi-filter-bar>
`;

WithTitle.args = {
  title: "Choose your food",
};

WithTitle.argTypes = {
  title: { control: "text" },
};
