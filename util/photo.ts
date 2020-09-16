import * as firebase from 'firebase';

//export function saveURL(url: string) {


export function savePhoto() {
	console.log("MAC:", this.state.mac);

	var d = new Date();
	if (this.camera) {
		const options = { quality: 1, base64: true, fixOrientation: true, exif: true };
		await this.camera.takePictureAsync(options).then(async (photo) => {
			const convertedImage = await new ImageManipulator.manipulateAsync(photo.uri, [{ resize: { height: 1000 } }], {
				compress: 0,
			});

			var fileToUpload = convertedImage.uri;
			var mime = "image/jpeg";

			this.setState({ cameraIcon: "hour-glass" });

			const blob = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = function () {
					resolve(xhr.response);
				};
				xhr.onerror = function (e) {
					reject(new TypeError("Network request failed"));
				};
				xhr.responseType = "blob";
				xhr.open("GET", fileToUpload, true);
				xhr.send(null);
			});
			const ref = firebase
				.storage()
				.ref("geofence/" + d.getUTCFullYear() + ("0" + (d.getMonth() + 1)).slice(-2))
				.child(uuid.v4().toString());

			const recordInfo = this.props.route.params.recordInfo;
			const beaconExist = await checkBeaconExist(recordInfo.mac);

			if (!beaconExist) {
				//create record in beacon/beacons
				await createBeacon(recordInfo.studentNo, recordInfo);
			}

			const snapshot = await ref
				.put(blob, { contentType: mime })
				.then((snapshot) => {
					return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
				})
				.then((downloadURL) => {
					console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
					this.setState({ photo1: downloadURL });

					const xdate = moment().format("YYYYMMDD");

					var dataDict = {
						reason: "Photo",
						image: downloadURL,
						timestamp: firebase.firestore.Timestamp.now(),
						state: "Photo",
					};

					var d = Date.now();

					firebase
						.firestore()
						.collection("sais_edu_sg")
						.doc("beacon")
						.collection("beaconHistory")
						.doc(xdate)
						.collection(this.state.mac || recordInfo.studentNo)
						.doc(d.toString())
						.set(dataDict);

					return downloadURL;
				})

				.catch((error) => {
					console.log(`Failed to upload file and get link - ${error}`);
				});

			blob.close();

			this.setState({ cameraIcon: "camera" });

			this.goBack();
		});
	}
}