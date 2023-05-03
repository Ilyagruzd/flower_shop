import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './firebase'
import { getUserFromStorage, storeUserInStorage } from './func'

export function useAuthentication() {
	const [user, setUser] = useState<User>()

	useEffect(() => {
		if (!user) {
			const getUser = async () => {
				const userFromStorage = await getUserFromStorage()
				if (userFromStorage) setUser(userFromStorage)
			}
			getUser()
		}
	}, [])

	useEffect(() => {
		const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
				storeUserInStorage(user)
			} else {
				setUser(undefined)
			}
		})

		return unsubscribeFromAuthStatuChanged
	}, [])

	return {
		user
	}
}
