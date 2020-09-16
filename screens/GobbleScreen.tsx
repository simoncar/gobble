import * as React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function GobbleScreen({ navigation }) {
	return (
		<View style={styles.container}>
			{Add(navigation)}

			<Text style={styles.title}>Gobble</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<EditScreenInfo path="/screens/GobbleScreen.tsx" />
		</View>
	);
}

function Add(navigation) {
	return <TouchableHighlight style={styles.addStep} underlayColor="#ff7043" onPress={() => {
		navigation.push("Photo",);
	}}>
		<Entypo name="camera" size={28} color={"white"} />
	</TouchableHighlight>;
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	addStep: {
		alignItems: "center",
		backgroundColor: "#ff5722",
		borderColor: "#ff5722",
		borderRadius: 50 / 2,
		borderWidth: 1,
		bottom: 120,
		height: 50,
		justifyContent: "center",
		position: "absolute",
		right: 35,
		shadowColor: "#000000",
		shadowOffset: {
			height: 1,
			width: 0
		},
		shadowOpacity: 0.8,
		shadowRadius: 2,
		width: 50,
		zIndex: 1
	},
});
