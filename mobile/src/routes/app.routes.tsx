import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { PlusCircle, SoccerBall } from "phosphor-react-native";

import { NewPoll } from "../pages/NewPoll";
import { Polls } from "../pages/Polls";
import { FindPoll } from "../pages/FindPoll";

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppRoutes() {
	const { colors } = useTheme();

	return (
		<Navigator screenOptions={{
			headerShown: false,
			tabBarLabelPosition: 'beside-icon',
			tabBarActiveTintColor: colors.yellow[500],
			tabBarInactiveTintColor: colors.gray[300],
			tabBarStyle: {
				position: 'absolute',
				height: 80,
				borderTopWidth: 0,
				backgroundColor: colors.gray[800]
			},
			tabBarItemStyle: {
				position: 'relative',
			}
		}}>
			<Screen name="newpp" component={NewPoll}
				options={{
					tabBarIcon: ({ color }) => <PlusCircle color={color} size={12} />
				}}
			/>
			<Screen name="polls" component={Polls}
				options={{
					tabBarIcon: ({ color }) => <SoccerBall color={color} size={12} />
				}}
			/>
			<Screen name="find" component={FindPoll}
				options={{
					tabBarButton: () => null, // hide option from tab bar
				}}
			/>
		</Navigator>
	);
}