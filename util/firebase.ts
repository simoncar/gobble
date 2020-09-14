import * as firebase from 'firebase';

export function saveURL(url: string) {
	console.log("SAVE TO FIREBASE:", url)

	var docData = {
		url: url,
		timestamp: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),

	};

	firebase.firestore().collection("qr").add(docData)
		.then(function (docRef) {
			return ("Done:" + docRef.id)
		})
		.catch(function (error) {
			console.error("Error adding document: ", error);
		});
}

