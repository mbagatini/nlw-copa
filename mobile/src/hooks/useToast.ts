import { useToast } from 'native-base';

const toastBase = useToast();

export function toast(message: string) {
	toastBase.show({
		description: message,
		placement: "top"
	});
}