import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "../components/Dropdown";
import { OPTIONS } from "./data";

const meta = {
  title: "Example/Dropdown",
  component: Dropdown,
  parameters: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: OPTIONS,
    defaultValue: "",
    isSearch: true,
    isMulti: true,
  },
};
