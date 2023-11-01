import { Meta, StoryObj } from "@storybook/react";
import Button from '../../src/components/atoms/Button';


const meta: Meta<typeof Button> = {
	title: "atoms/Button",
	component: Button,
	args: {
		label: "This is a Button",
		size: "medium",
		border: "primary-neutral-600",
		disabled: false,
		loading: false,
	},
	argTypes: {
		label: {
			name: "Label",
			control: "text",
		},
		children: {
			name: "Children",
			control: "text",
		},
		size: {
			name: "Size",
			control: "select",
			options: ["medium", "small", "compact"],
		},
		border: {
			name: "Border Color",
			control: "select",
			options: [
				"primary-neutral-600",
				"primary-neutral-600",
				"secondary-orange-600",
				"primary-neutral-200",
			],
		},
		disabled: {
			name: "Disabled",
			control: "boolean",
		},
		loading: {
			name: "Loading",
			control: "boolean",
		},
	},
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const Template: ButtonStory = {
	args: {},
};
