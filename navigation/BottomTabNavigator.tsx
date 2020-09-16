import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import GobbleScreen from '../screens/GobbleScreen';
import QRScreen from '../screens/QRScreen';

import { BottomTabParamList, TabTwoParamList, QRParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="QR"
			tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
			<BottomTab.Screen
				name="QR"
				component={QRScreen}
				options={{
					tabBarIcon: ({ color }) => <TabBarIconMaterial name="qrcode-scan" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="History"
				component={TabTwoNavigator}
				options={{
					tabBarIcon: ({ color }) => <TabBarIconFA name="glass-martini-alt" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function TabBarIconMaterial(props: { name: string; color: string }) {
	return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIconFA(props: { name: string; color: string }) {
	return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
	return (
		<TabTwoStack.Navigator>
			<TabTwoStack.Screen
				name="GobbleScreen"
				component={GobbleScreen}
				options={{ headerTitle: 'Gobbles' }}
			/>
		</TabTwoStack.Navigator>
	);
}

const QRStack = createStackNavigator<QRParamList>();

function QRNavigator() {
	return (
		<QRStack.Navigator>
			<QRStack.Screen
				name="QRScreen"
				component={QRScreen}
				options={{ headerTitle: 'QR Scanner' }}
			/>
		</QRStack.Navigator>
	);
}
