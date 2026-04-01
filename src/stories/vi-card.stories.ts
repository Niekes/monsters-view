import { html } from "lit";
import { action } from "storybook/actions";
import "../components/vi-card";
import "../components/vi-button";

export default {
  title: "components/vi-card",
  component: "vi-badge",
  args: {
    title: "Nice Title",
  },
  argTypes: {
    title: { control: "text" },
  },
};

const handleClick = (e: Event) => {
  action("click")(e);
};

export const Default = (args: { title: string }) => html`
  <vi-card class="flex max-w-sm">
    <img
      slot="media"
      src="https://picsum.photos/600/400"
      class="w-full h-full object-cover"
      alt="Card image"
    />
    <h2 slot="header" class="text-slate-900 text-xl font-semibold">
      ${args.title}
    </h2>
    <p slot="body" class="text-sm text-slate-500 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
      arcu, at fermentum dui. Maecenas Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas.
    </p>
  </vi-card>
`;

export const WithButtons = (args: { title: string }) => html`
  <vi-card class="flex max-w-sm">
    <img
      slot="media"
      src="https://picsum.photos/600/400"
      class="w-full h-full object-cover"
      alt="Card image"
    />
    <h2 slot="header" class="text-slate-900 text-xl font-semibold">
      ${args.title}
    </h2>
    <p slot="body" class="text-sm text-slate-500 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
      arcu, at fermentum dui. Maecenas Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas.
    </p>
    <div slot="footer">
      <vi-button @click=${handleClick}>Click</vi-button>
    </div>
  </vi-card>
`;
