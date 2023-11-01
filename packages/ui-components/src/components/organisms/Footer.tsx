import React from "react";
import { RightIcon } from "../../icons";
import { Body3, GridContainer, Label, ThemedIconRenderer } from "../atoms";

type IFooterProps = {
	menu?: Array<{ name: string; link: string }>;
};

const IFooterDefaultProps = {
	menu: [
		{ name: "Docs", link: "https://docs.tic.org" },
		{ name: "About TIC", link: "https://tic.org" },
		{ name: "Support", link: "https://discord.gg/invite/XXXXX" },
	],
};

const Footer: React.FC<IFooterProps> = props => {
	const { menu } = props;
	return (
		<footer className="flex w-full justify-center p-4 border-t-2 border-neutral-200">
			<GridContainer>
				<div className="col-span-6 flex justify-start items-center gap-2">
					<span className="text-md font-bossa text-neutral-700">TIC</span>
					<a
						href="https://docs.theinternetconfederation.org/agreements/agreements-beta"
						target="_blank"
						rel="noreferrer"
					>
						<Label color="neutral-600" border="neutral-500" className="no-wrap">
							Beta v0.2.0
						</Label>
					</a>
				</div>
				<div className="col-span-6 flex justify-end items-center gap-4">
					{menu &&
						menu.map(e => (
							<>
								<a
									className="flex items-center gap-1 no-wrap"
									href={e.link}
									target="_blank"
									rel="noreferrer"
								>
									<Body3>{e.name}</Body3>
									<ThemedIconRenderer
										icon={RightIcon}
										theme="neutral"
										size="extra-small"
										rounded={false}
										containerClass="rounded-sm"
									/>
								</a>
							</>
						))}
				</div>
			</GridContainer>
		</footer>
	);
};

Footer.defaultProps = IFooterDefaultProps;

export default Footer;
