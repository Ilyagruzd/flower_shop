import { SafeAreaView } from '@/components/SafeAreaView'
import React, { useRef, useState } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import MaskInput from 'react-native-mask-input'
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { app, auth, db } from '@/utils/firebase'
import { useAuthentication } from '@/utils/useAuthentication'
import { collection, doc, getDoc, query, setDoc } from 'firebase/firestore'

const mask = [
	'+',
	'7',
	' ',
	'(',
	/\d/,
	/\d/,
	/\d/,
	')',
	' ',
	/\d/,
	/\d/,
	/\d/,
	'-',
	/\d/,
	/\d/,
	'-',
	/\d/,
	/\d/
]

const codeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]

export const Profile = () => {
	const [phoneNumber, setPhoneNumber] = useState('')
	const [verificationId, setVerificationId] = useState<string>()
	const [verificationCode, setVerificationCode] = useState<string>()
	const [message, showMessage] = useState<string>('Nothing')
	const recaptchaVerifier = useRef(null)
	const { user } = useAuthentication()

	const getCode = async () => {
		try {
			const phoneProvider = new PhoneAuthProvider(auth)
			const verificationId = await phoneProvider.verifyPhoneNumber(
				`+7${phoneNumber}`,
				recaptchaVerifier.current
			)
			setVerificationId(verificationId)
			showMessage(
				`Verification code has been sent to your phone. +7${phoneNumber}`
			)
		} catch (err) {
			showMessage(`Something went wrong. ${err}`)
		}
	}

	const sendCode = async () => {
		try {
			const credential = PhoneAuthProvider.credential(
				verificationId!,
				verificationCode!
			)
			await signInWithCredential(auth, credential)
			const { uid, phoneNumber } = auth.currentUser!

			const ref = doc(db, 'users', uid)
			const user = await getDoc(ref)
			if (!user.exists()) {
				await setDoc(doc(db, 'users', uid), {
					id: uid,
					phoneNumber
				})
			}
			showMessage('Phone authentication successful 👍')
		} catch (err) {
			showMessage(`Something went wrong`)
		}
	}

	if (user) return <Text>Ты крутой перец</Text>

	return (
		<SafeAreaView>
			<View style={{ height: '100%' }}>
				<FirebaseRecaptchaVerifierModal
					ref={recaptchaVerifier}
					firebaseConfig={app.options}
				/>
				<Text style={{ fontSize: 22 }}>Введите ваш номер телефона</Text>
				<MaskInput
					value={phoneNumber}
					keyboardType='numeric'
					style={{ fontSize: 22, alignSelf: 'center', margin: 20 }}
					onChangeText={(masked, unmasked) => {
						setPhoneNumber(unmasked)
					}}
					mask={mask}
				/>
				<Button
					title='Send Verification Code'
					disabled={!phoneNumber}
					onPress={getCode}
				/>
				<Text style={{ marginTop: 20 }}>Enter Verification code</Text>
				<TextInput
					style={{ marginVertical: 10, fontSize: 17 }}
					editable={!!verificationId}
					placeholder='123456'
					onChangeText={setVerificationCode}
				/>
				<MaskInput
					value={verificationCode}
					keyboardType='numeric'
					style={{ fontSize: 22, alignSelf: 'center', margin: 20 }}
					onChangeText={setVerificationCode}
					mask={codeMask}
				/>
				<Button
					title='Confirm Verification Code'
					disabled={!verificationId}
					onPress={sendCode}
				/>
				<Text>{message}</Text>
			</View>
		</SafeAreaView>
	)
}
