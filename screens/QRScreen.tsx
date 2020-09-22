import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import { Text, View } from '../components/Themed';
import * as Linking from 'expo-linking';
import { saveURL } from "../util/firebase"
import * as Permissions from "expo-permissions";

interface PermissionInfo {
	status: 'granted' | 'undetermined' | 'denied';
	granted: boolean;
	expires: 'never' | number;
	canAskAgain: boolean;
	ios?: {
		scope: 'whenInUse' | 'always';
	};
	android?: {
		scope: 'fine' | 'coarse' | 'none';
	};
}

interface PermissionResponse {
	status: 'granted' | 'undetermined' | 'denied';
	granted: boolean;
	expires: 'never' | number;
	canAskAgain: boolean;
	permissions: { // an object with an entry for each permission requested
		[permissionType: string /* PermissionType */]: PermissionInfo;
	};
}

export default function QR() {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			// 	const { status } = await Camera.requestPermissionsAsync<PermissionResponse>();
			// 	setHasPermission(status === 'granted');

			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			setHasPermission(status === 'granted')

		})();

	}, []);

	//{ type: BarCodeScanner.Constants.BarCodeType, data: string }

	interface IProps {
		type: BarCodeScanner.Constants.BarCodeType;
		data: string
	}

	const handleBarCodeScanned = ({ type, data }: IProps) => {

		console.log("Scanned : ", data)
		if (!scanned) {
			saveURL(data)
			setScanned(true)
			Linking.openURL(data);
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'flex-end',
			}}>
			<Camera
				onBarCodeScanned={handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
		</View>
	);
}

