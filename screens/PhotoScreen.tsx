import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import { Camera } from 'expo-camera';
import { Entypo } from "@expo/vector-icons";

import { savePhoto } from "../util/photo"
const WINDOW_WIDTH = Dimensions.get("window").width;

export default function PhotoScreen({ navigation }) {

	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [type, setType] = useState(Camera.Constants.Type.back);


	let camera: Camera | null = null;

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	let snap = () => {
		if (camera) {
			console.log("im doing stuff")
			camera.takePictureAsync()

		};
	}
}

return (
	<View style={{ flex: 1 }}>
		<Camera
			style={{ flex: 1 }}
			type={type}
			ref={ref => {
				camera = ref;
			}}
		>
			<View
				style={{
					flex: 1,
					backgroundColor: 'transparent',
					flexDirection: 'row',
				}}>

				<TouchableHighlight style={styles.camera} underlayColor="#ff7043"
					onPress={() => { snap() }}
				>
					<Entypo name="camera" size={28} color={"white"} />
				</TouchableHighlight>


				<TouchableOpacity
					style={{
						flex: 0.1,
						alignSelf: 'flex-end',
						alignItems: 'center',
					}}
					onPress={() => {
						setType(
							type === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
						);
					}}>
					<Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
				</TouchableOpacity>
			</View>
		</Camera>
	</View>
);
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
	camera: {
		backgroundColor: "#ff5722",
		borderColor: "#ff5722",
		borderWidth: 1,
		height: 80,
		width: 80,
		borderRadius: 80 / 2,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		bottom: 30,
		left: WINDOW_WIDTH / 2 - 35,
		shadowColor: "#000000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0,
		},
		zIndex: 1,
	},

});
