import { IToastProps } from "native-base";

export function getToastMessage(message: string): IToastProps {
	return {
		description: message,
		placement: "top"
	} as IToastProps;
}