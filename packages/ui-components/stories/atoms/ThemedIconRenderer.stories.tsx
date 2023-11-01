import type { Meta, StoryObj } from "@storybook/react";

import { ThemedIconRenderer } from "../../src/components/atoms";
import { InfoIcon } from '../../src/icons/index';

const meta: Meta<typeof ThemedIconRenderer> = {
	title: "atoms/icon-renderer/ThemedIconRenderer",
	component: ThemedIconRenderer,
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

type ThemedIconRendererStory = StoryObj<typeof ThemedIconRenderer>;

export const Template: ThemedIconRendererStory = {
	args: {
		icon: InfoIcon,
		size: "large",
		theme: "agreement",
		background: true,
	},
	argTypes: {
		theme: {
			name: "Theme",
			control: "select",
			options: ["citizen", "agreement", "dispute", "neutral"],
		},
		background: {
			name: "Background",
			control: "boolean",
		},
	},
};
