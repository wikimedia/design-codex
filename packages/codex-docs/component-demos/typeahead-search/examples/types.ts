export type Result = {
	label: string,
	id: string,
	url: string,
	match: {
		type: string,
		language: string,
		text: string
	},
	description?: string,
	display?: {
		label?: {
			value: string,
			language: string
		},
		description?: {
			value: string,
			language: string
		}
	}
};

export type RestResult = {
	id: number;
	key: string;
	title: string;
	description?: string;
	thumbnail?: {
		url: string;
		width?: number | null;
		height?: number | null;
	} | null;
}
