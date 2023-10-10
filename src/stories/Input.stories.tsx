import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/Input";

const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Hello world",
  },
};

export const Error: Story = {
  args: {
    value: "sdfdfd",
    touch: true,
    error: "Please enter value",
  },
};
