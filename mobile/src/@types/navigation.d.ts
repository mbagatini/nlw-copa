import type { NavigatorScreenParams } from '@react-navigation/native';

type CustomRootParamList = {
	new: undefined;
	find: undefined;
	polls: undefined;
	details: NavigatorScreenParams<DetailsParamList>;
};

type DetailsParamList = {
	id: string;
};

export declare global {
	namespace ReactNavigation {
		interface RootParamList extends CustomRootParamList { }
	}
}