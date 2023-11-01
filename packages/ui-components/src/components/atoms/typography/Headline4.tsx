import cx from "classnames";
import React, { HTMLAttributes } from "react";

interface HeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
	color?: string;
}

const Headline4 = ({ color, children, className, ...props }: HeadlineProps) => {
	return (
		<h4
			{...props}
			className={cx(
				"text-lg md:text-3xl pb-4 md:pb-base font-medium",
				color && `text-${color}`,
				className,
			)}
		>
			{children}
		</h4>
	);
};

export default Headline4;