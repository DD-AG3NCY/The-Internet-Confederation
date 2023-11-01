import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Grid from "ui-components/components/atoms/containers/GridContainer";

const GridShowcase = ({ content }: { content: "regular" | "big" | "mixed" }) => {
	if (content === "regular") {
		return (
			<Grid className="flex w-full justify-center text-center text-white">
				{Array.from({ length: 15 }, (_, i) => i + 1).map((i) => (
					<div className="p-2 bg-primary-neutral rounded">{i}</div>
				))}
			</Grid>
		);
	}
	if (content === "big") {
		return (
			<Grid className="flex w-full justify-center text-center text-white">
				<div className="p-2 py-4 bg-primary-neutral rounded col-start-1 col-end-7 md:col-end-13">
					A
				</div>
				<div className="p-2 py-4 min-h-[400px] bg-primary-neutral-400 rounded col-start-1 col-end-7 md:col-end-13 align-items">
					B
				</div>
			</Grid>
		);
	}
	return (
		<Grid className="flex w-full justify-center text-center text-white">
			<div className="p-2 py-4 bg-primary-neutral rounded col-start-1 col-end-7 md:col-end-13">A</div>
			<div className="p-2 py-4 min-h-[400px] bg-primary-neutral rounded col-start-1 col-end-7 md:col-end-9 align-items">
				B
			</div>
			<div className="p-2 py-4 min-h-[400px] bg-primary-neutral-400 rounded col-start-1 col-end-7 md:col-start-9 md:col-end-13 align-items">
				C
			</div>
			<div className="p-2 py-4 min-h-[200px] bg-primary-neutral-400 rounded col-span-6">D</div>
			<div className="p-2 py-4 h-[100px] bg-primary-neutral rounded col-span-3">E</div>
			<div className="p-2 py-4 h-[100px] bg-primary-neutral rounded col-span-3">F</div>
		</Grid>
	);
};

const meta: Meta<typeof GridShowcase> = {
	title: "layout/Grid",
	component: GridShowcase,
	args: {
		content: "mixed",
	},
	argTypes: {
		content: {
			name: "Content",
			control: "select",
			options: ["regular", "big", "mixed"],
		},
	},
};

export default meta;

type GridStory = StoryObj<typeof GridShowcase>;

export const Showcase: GridStory = {
	args: {},
};
