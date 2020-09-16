import * as firebase from 'firebase';

export function saveURL(url: string) {

	var docData = {
		url: url,
		timestamp: firebase.firestore.Timestamp.now(),
		count: 1
	};

	firebase
		.firestore()
		.collection("qr")
		.where("url", "==", docData.url)
		.get()
		.then((snapshot: any) => {
			if (snapshot.empty) {
				firebase
					.firestore()
					.collection("qr")
					.add(docData)
					.then(function (docRef) {
						return ("Done:" + docRef.id)
					})
					.catch(function (error) {
						console.error("Error adding document: ", error);
					});

			} else {
				snapshot.forEach((doc: any) => {
					firebase
						.firestore()
						.collection("qr")
						.doc(doc.id)
						.update(
							{ count: firebase.firestore.FieldValue.increment(1) }
						).then(function (docRef) {
							return ("Done:" + doc.id)
						})
						.catch(function (error) {
							console.error("Error adding document: ", error);
						});
				})
			}
		})
}
