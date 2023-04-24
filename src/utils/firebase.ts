import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
	apiKey: 'AIzaSyDylh0Z03fy--KhlLsK32WOA9_lKdJJkpU',
	authDomain: 'flower-shop-3141a.firebaseapp.com',
	projectId: 'flower-shop-3141a',
	storageBucket: 'flower-shop-3141a.appspot.com',
	messagingSenderId: '65124877290',
	appId: '1:65124877290:web:39decf53a21d294d27a893',
	measurementId: 'G-DT7PCY4B3B'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
