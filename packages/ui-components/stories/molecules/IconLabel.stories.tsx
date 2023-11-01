import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ThemedIconRenderer } from "../../src/components/atoms";
import IconLabel from "../../src/components/molecules/labels/IconLabel";
import { InfoIcon } from '../../src/icons/index';

const meta: Meta<typeof IconLabel> = {
	title: "molecules/IconLabel",
	component: IconLabel,
	args: {
		icon: <ThemedIconRenderer icon={InfoIcon} theme="citizen" />,
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

type IconLabelStory = StoryObj<typeof IconLabel>;

export const Template: IconLabelStory = {
	args: {},
};
