import type { Meta, StoryObj } from "@storybook/react";

import Handler from '../../src/components/molecules/handlers/Handler';
import { DropdownIcon, InfoIcon } from '../../src/icons/index';

const meta: Meta<typeof Handler> = {
	title: "molecules/Handler",
	component: Handler,
	args: {
		primaryIcon: InfoIcon,
		actionIcon: DropdownIcon,
		children: "This is a Handler",
		theme: "citizen",
	},
	argTypes: {
		primaryIcon: {
			name: "Primary Icon",
			control: "none",
		},
		actionIcon: {
			name: "Action Icon",
			control: "none",
		},
		children: {
			name: "Label",
			control: "text",
		},
		theme: {
			name: "Theme",
			control: "select",
			options: ["citizen", "agreement", "dispute", "neutral"],
		},
	},
};

export default meta;

type HandlerStory = StoryObj<typeof Handler>;

export const Template: HandlerStory = {
	args: {},
};
