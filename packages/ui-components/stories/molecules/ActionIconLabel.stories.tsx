import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ThemedIconRenderer } from "../../src/components/atoms";
import ActionIconLabel from '../../src/components/molecules/labels/ActionIconLabel';
import { InfoIcon } from '../../src/icons/index';

const meta: Meta<typeof ActionIconLabel> = {
	title: "molecules/ActionIconLabel",
	component: ActionIconLabel,
	args: {
		icon: <ThemedIconRenderer icon={InfoIcon} theme="citizen" rounded={false} />,
		children: "Label",
		iconPosition: "left",
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
		iconPosition: {
			name: "Icon Position",
			control: "select",
			options: ["left", "right"],
		},
	},
};

export default meta;

type IconLabelStory = StoryObj<typeof ActionIconLabel>;

export const Template: IconLabelStory = {
	args: {},
};
