import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, TouchableHighlight } from 'react-native';
import { Text, View } from '../components/Themed';
import * as firebase from 'firebase';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as ImageManipulator from "expo-image-manipulator";
import { Entypo } from "@expo/vector-icons";
import uuid from "uuid";
import * as Permissions from "expo-permissions";

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function PhotoScreen({ navigation }) {

	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	let camera: Camera | null = null;

	useEffect(() => {
		(async () => {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			await Permissions.askAsync(Permissions.CAMERA);
			setHasPermission(status === 'granted')
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const snap = async () => {
		const d = new Date()
		if (camera) {

			camera.takePictureAsync()
				.then(async (photo: CameraCapturedPicture) => {

					uploadImageAsync(photo.uri)


					try {
						// const convertedImage = await ImageManipulator.manipulateAsync(
						// 	photo.uri,
						// 	[{ resize: { height: 1000 } }],
						// 	{
						// 		compress: 7,
						// 	}
						// )

						// const blob: Blob | Uint8Array | ArrayBuffer | null = await new Promise((resolve, reject) => {
						// 	const xhr = new XMLHttpRequest();

						// 	xhr.onload = () => {
						// 		resolve(xhr.response);
						// 	};
						// 	xhr.onerror = function (e) {
						// 		console.log("E:", e)
						// 		reject(new TypeError("Network request failed"));
						// 	};
						// 	xhr.responseType = "blob";
						// 	xhr.open("GET", photo.uri, true);
						// 	xhr.send(null);
						// });

						// if (blob != null) {
						// 	const uriParts = photo.uri.split(".");
						// 	const fileType = uriParts[uriParts.length - 1];

						// 	firebase
						// 		.storage()
						// 		.ref("photos/" + d.getUTCFullYear() + ("0" + (d.getMonth() + 1)).slice(-2))
						// 		.child(uuid.v4())
						// 		.put(photo.uri, { contentType: "image/jpeg", cacheControl: 'max-age=31536000' })
						// 		.then(() => {
						// 			console.log("Sent!");
						// 		})
						// 		.catch((e) => console.log("error:", e));
						// } else {
						// 	console.log("error with blob");
						// }
					} catch (e) {
						console.log("firebase error 2:", e.message);
					}
				})
		};
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

async function uploadImageAsync(uri) {
	// Why are we using XMLHttpRequest? See:
	// https://github.com/expo/expo/issues/2402#issuecomment-443726662
	const blob: Blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		console.log("CCC")
		xhr.onload = function () {
			console.log("AAA")
			resolve(xhr.response);
			console.log("BBB")
		};
		xhr.onerror = function (e) {
			console.log("EX:", e);
			reject(new TypeError('Network request failed 44'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});

	// const ref = firebase
	// 	.storage()
	// 	.ref()
	// 	.child(uuid.v4());
	// const snapshot = await ref.put(blob);

	// We're done with the blob, close and release it
	blob.close();

	return await snapshot.ref.getDownloadURL();
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
