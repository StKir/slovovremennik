import {
	DetailedHTMLProps,
	ReactNode,
	SelectHTMLAttributes,
	TextareaHTMLAttributes
} from 'react';

export interface IBtnProps {
	children: ReactNode;
	size: 'small' | 'big';
}
export interface IMainInput
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {}

export interface IMainTextArea
	extends DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {}

export interface IMainSelect
	extends DetailedHTMLProps<
		SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	> {
	options: Toptions[];
}

export type Toptions = {
	value: string;
	label: string;
};
