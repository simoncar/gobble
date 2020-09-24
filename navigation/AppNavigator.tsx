import * as React from 'react';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import GobbleScreen from '../screens/GobbleScreen';
import QRScreen from '../screens/QRScreen';
import HomeScreen from '../screens/HomeScreen';
import PhotoScreen from '../screens/PhotoScreen';
import { BottomTabParamList, GobblesStackParamList, QRStackParamList } from '../types';

const QRStack = createStackNavigator<QRStackParamList>();

function QRNavigator() {
	return (
		<QRStack.Navigator>
			<QRStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: 'Home' }} />
			<QRStack.Screen name="QRScreen" component={QRScreen} options={{ headerTitle: 'QR Scanner' }} />
			<QRStack.Screen name="PhotoScreen" component={PhotoScreen} options={{ headerTitle: 'Photo' }} />
		</QRStack.Navigator>
	);
}

const GobblesStack = createStackNavigator<GobblesStackParamList>();

function GobblesNavigator() {
	return (
		<GobblesStack.Navigator>
			<GobblesStack.Screen name="GobbleScreen" component={GobbleScreen} options={{ headerTitle: 'Gobbles' }} />
			<GobblesStack.Screen name="PhotoScreen" component={PhotoScreen} options={{ headerTitle: 'Photo' }} />
		</GobblesStack.Navigator>
	);
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="QR"
			tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
			<BottomTab.Screen
				name="QR"
				component={QRNavigator}
				options={{
					tabBarIcon: ({ color }) => <TabBarIconMaterial name="qrcode-scan" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="History"
				component={GobblesNavigator}
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