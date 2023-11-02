import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import RoundedHandler from "ui-components/components/molecules/handlers/RoundedHandler";
import { ThemedIconRenderer } from "ui-components/components/atoms";
import { InfoIcon } from "ui-components/icons";

const meta: Meta<typeof RoundedHandler> = {
	title: "molecules/RoundedHandler",
	component: RoundedHandler,
	args: {
		icon: (
			<ThemedIconRenderer
				icon={InfoIcon}
				theme="citizen"
				size="small"
				background={false}
				containerClass="rounded-full"
			/>
		),
		children: "Menu",
	},
	argTypes: {
		icon: {
			name: "Icon",
			control: "none",
		},
		children: {
			name: "Label",
			control: "text",
		},
	},
};

export default meta;

type RoundedHandlerStory = StoryObj<typeof RoundedHandler>;

export const Template: RoundedHandlerStory = {
	args: {},
};
