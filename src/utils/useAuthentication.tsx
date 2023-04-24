import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './firebase'

export function useAuthentication() {
	const [user, setUser] = useState<User>()

	useEffect(() => {
		const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
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
