import type { Meta, StoryObj } from "@storybook/react";

import { IconRenderer } from "../../src/components/atoms";
import { InfoIcon } from '../../src/icons/index';

const meta: Meta<typeof IconRenderer> = {
	title: "atoms/IconRenderer",
	component: IconRenderer,
	argTypes: {
		/*
        icon: {
            name: "Icon",
            control: { type: "object" },
        },
        */
		size: {
			name: "Size",
			control: "select",
			options: ["small", "large", "30"],
		},
	},
};

export default meta;

type IconRendererStory = StoryObj<typeof IconRenderer>;

export const Template: IconRendererStory = {
	args: {
		icon: InfoIcon,
		size: "large",
		color: "primary-neutral-600",
		background: "neutral-200",
	},
	argTypes: {
		color: {
			name: "Color",
			control: "select",
			options: ["primary-neutral-600", "primary-neutral-600", "secondary-orange-600", "neutral-600"],
		},
		background: {
			name: "Background",
			control: "select",
			options: [
				"primary-neutral-200",
				"primary-neutral-200",
				"secondary-orange-200",
				"neutral-200",
				"transparent",
			],
		},
	},
};
