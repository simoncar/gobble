import React, { useState, useRef } from "react";
import { ScrollView, StyleSheet, Dimensions, View, Text, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { HomeNavigationProps } from "../navigation/NavigationTypes";


const { width: wWidth } = Dimensions.get("window");
const defaultOutfits = [
	{
		key: 1,
		color: "#BFEAF5",
		title: "Egg Salad",
		restaurant: "Mel & Simon's",
		aspectRatio: 1,
		selected: false,
		photo: "https://firebasestorage.googleapis.com/v0/b/gobble-4f6b9.appspot.com/o/photos%2F202009%2F370d6508-7fcc-41f5-8c57-bc8a78640154?alt=media&token=7d1d1c0c-694b-4166-b228-470f4a0a6852"
	},
	{
		key: 2,
		color: "#BEECC4",
		title: "Egg Salad",
		restaurant: "Mel & Simon's",
		aspectRatio: 200 / 145,
		selected: false,
		photo: "https://firebasestorage.googleapis.com/v0/b/gobble-4f6b9.appspot.com/o/photos%2F202009%2F370d6508-7fcc-41f5-8c57-bc8a78640154?alt=media&token=7d1d1c0c-694b-4166-b228-470f4a0a6852"

	},
	{
		key: 3,
		color: "#FFE4D9",
		aspectRatio: 180 / 145,
		selected: false,
		photo: "https://firebasestorage.googleapis.com/v0/b/gobble-4f6b9.appspot.com/o/photos%2F202009%2F370d6508-7fcc-41f5-8c57-bc8a78640154?alt=media&token=7d1d1c0c-694b-4166-b228-470f4a0a6852"

	},
	{
		key: 4,
		color: "#FFDDDD",
		title: "Egg Salad",
		restaurant: "Mel & Simon's",
		aspectRatio: 180 / 145,
		selected: false,
		photo: "https://firebasestorage.googleapis.com/v0/b/gobble-4f6b9.appspot.com/o/photos%2F202009%2F370d6508-7fcc-41f5-8c57-bc8a78640154?alt=media&token=7d1d1c0c-694b-4166-b228-470f4a0a6852"

	},
	{
		key: 5,
		color: "#BFEAF5",
		title: "Egg Salad",
		restaurant: "Mel & Simon's",
		aspectRatio: 1,
		selected: false,
		photo: "https://firebasestorage.googleapis.com/v0/b/gobble-4f6b9.appspot.com/o/photos%2F202009%2F370d6508-7fcc-41f5-8c57-bc8a78640154?alt=media&token=7d1d1c0c-694b-4166-b228-470f4a0a6852"

	},
	{
		key: 6,
		color: "#F3F0EF",
		title: "Egg Salad",
		restaurant: "Mel & Simon's",
		aspectRatio: 120 / 145,
		selected: false,
		photo: "https://firebasestorage.googleapis.com/v0/b/gobble-4f6b9.appspot.com/o/photos%2F202009%2F370d6508-7fcc-41f5-8c57-bc8a78640154?alt=media&token=7d1d1c0c-694b-4166-b228-470f4a0a6852"

	},
	{
		key: 7,
		color: "#D5C3BB",
		title: "Egg Salad",
		restaurant: "Mel & Simon's",
		aspectRatio: 210 / 145,
		selected: false,
		photo: "https://firebasestorage.googleapis.com/v0/b/gobble-4f6b9.appspot.com/o/photos%2F202009%2F370d6508-7fcc-41f5-8c57-bc8a78640154?alt=media&token=7d1d1c0c-694b-4166-b228-470f4a0a6852"

	},
	{
		key: 8,
		color: "#DEEFC4",
		title: "Egg Salad",
		restaurant: "Mel & Simon's",
		aspectRatio: 160 / 145,
		selected: false,
		photo: "https://firebasestorage.googleapis.com/v0/b/gobble-4f6b9.appspot.com/o/photos%2F202009%2F370d6508-7fcc-41f5-8c57-bc8a78640154?alt=media&token=7d1d1c0c-694b-4166-b228-470f4a0a6852"

	},
];
function Qr(navigation) {
	return <TouchableHighlight style={styles.addStep} underlayColor="#ff7043" onPress={() => {
		navigation.push("QRScreen",);

	}}>
		<View style={{
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center'
		}}><Text
			style={{
				fontSize: 18,
				fontWeight: 'bold',
				color: "white",

			}} >
				Scan   </Text><MaterialCommunityIcons name="qrcode" size={28} color={"white"} /></View>
	</TouchableHighlight>;
}

function Photo(navigation) {
	return <TouchableHighlight style={styles.addStep} underlayColor="#ff7043" onPress={() => {
		navigation.push("PhotoScreen",);
	}}>
		<View style={{
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center'
		}}><Text style={{
			fontSize: 18,
			fontWeight: 'bold',
			color: "white",

		}} >Photo   </Text><Entypo name="camera" size={28} color={"white"} /></View>
	</TouchableHighlight>;
}



export default function HomeScreen({ navigation }: HomeNavigationProps<"FavoriteOutfits">) {
	const width = (wWidth) / 2;

	const [outfits, setOutfits] = useState(defaultOutfits);
	return (

		<View style={{
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'flex-end',
		}}>
			<ScrollView>
				<View style={{ flexDirection: "row" }}>
					<View>
						{outfits
							.filter((_, i) => i % 2 !== 0)
							.map((outfit) => (
								<View key={outfit.key}
									style={{
										margin: 10,
										borderRadius: 5,
										backgroundColor: outfit.color,
										width: width - 20,
										height: 250,//width * outfit.aspectRatio,
										justifyContent: "center",
										alignItems: "center",
									}}>
									<Image
										style={{ borderRadius: 5, height: 200, width: width - 20 }}
										source={{
											uri: outfit.photo
										}}

									/>
									<Text style={styles.title}>{outfit.title}</Text>
									<Text style={styles.restaurant}>{outfit.restaurant}</Text>
								</View>
							))}
					</View>
					<View>
						<View>
							{Qr(navigation)}
							{Photo(navigation)}
						</View>
						{outfits
							.filter((_, i) => i % 2 === 0)
							.map((outfit) => (
								<View key={outfit.key}
									style={{
										margin: 10,
										borderRadius: 5,
										backgroundColor: outfit.color,
										width: width - 20,
										height: 250,//width * outfit.aspectRatio,
										justifyContent: "center",
										alignItems: "center",
									}}>
									<Image
										style={{ borderRadius: 5, height: 200, width: width - 20 }}
										source={{
											uri: outfit.photo
										}}

									/>
									<Text style={styles.title}> {outfit.title}</Text>
									<Text style={styles.restaurant}>{outfit.restaurant}</Text>
								</View>
							))}
					</View>
				</View>
			</ScrollView>

		</View >

	);
};


const styles = StyleSheet.create({
	title: {
		justifyContent: "center",
		alignItems: "center",
	},
	restaurant: {
		justifyContent: "center",
		alignItems: "center",
	},

	addStep: {
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 7,
		alignItems: "center",
		backgroundColor: "#2CB9B0",
		borderRadius: 25,
		height: 50,
		justifyContent: "center",
		zIndex: 1
	},
});
