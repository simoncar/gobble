import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as firebase from 'firebase';
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyCyTDadgNlwWjubbL6lJNU2WWNMJOhVn_k",
	authDomain: "gobble-4f6b9.firebaseapp.com",
	databaseURL: "https://gobble-4f6b9.firebaseio.com",
	projectId: "gobble-4f6b9",
	storageBucket: "gobble-4f6b9.appspot.com",
	messagingSenderId: "426607030630",
	appId: "1:426607030630:web:6a9ed2a14f08bb290d98a7",
	measurementId: "G-3678DZCG4P"
};

export default function App() {
	const [firebaseLoaded, setFirebaseLoaded] = useState(false);
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	let isAnonymous: boolean = false

	useEffect(() => {
		try {
			if (!firebase.apps.length) {
				firebase.initializeApp(firebaseConfig);
			}
			firebase.auth().signInAnonymously()

			firebase.auth().onAuthStateChanged(user => {
				if (!firebaseLoaded) setFirebaseLoaded(true);
				console.log("user:", user)
			});
		} catch (e) {
			console.log("firebase error initializeApp: ", e.message);
		}
	}, []);


	if (!isLoadingComplete && !firebaseLoaded) {
		return null;
	} else {
		if (firebaseLoaded) {
			return (
				<SafeAreaProvider>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</SafeAreaProvider>
			);
		}
		else
			return null;
	}
}
