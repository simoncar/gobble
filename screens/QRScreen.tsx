import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View } from '../components/Themed';
import * as Linking from 'expo-linking';
import { saveURL } from "../util/firebase"

export default function QR() {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
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
			<BarCodeScanner
				barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
				onBarCodeScanned={handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
		</View>
	);
}

