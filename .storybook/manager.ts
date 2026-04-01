import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "VI Coding challenge",
    brandUrl: "https://github.com/niekes/monsters-view",
    brandTarget: "_self",
  }),
});
