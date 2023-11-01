import React from "react";

import { ActionContainer } from "../../atoms/containers";
import IconLabel, { IconLabelProps } from "./IconLabel";

const ActionIconLabel: React.FC<IconLabelProps> = props => {
	return (
		<ActionContainer className="rounded">
			<IconLabel {...props} />
		</ActionContainer>
	);
};

export default ActionIconLabel;
