import { collection, doc, query, where } from 'firebase/firestore'
import { db } from './firebase'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

export function useFetchProducts(ids?: string[]) {
	let productsRef

	if (ids?.length) {
		const categoryDocRef = ids.map((id) => doc(db, 'categories', id))
		productsRef = query(
			collection(db, 'products'),
			where('category', 'in', categoryDocRef)
		)
		const productsWithCategoriesQuery = useFirestoreQueryData(
			['products', { categoryDocRef }],
			productsRef
		)
		return productsWithCategoriesQuery
	} else {
		productsRef = query(collection(db, 'products'))
	}

	const productsQuery = useFirestoreQueryData(['products'], productsRef)

	return productsQuery
}
