import { Product } from '@/db/model'
import { createStore } from '@ngneat/elf'
import {
	getAllEntities,
	selectAllEntities,
	setEntities,
	withEntities
} from '@ngneat/elf-entities'
import { withRequestsStatus } from '@ngneat/elf-requests'

const productsStore = createStore(
	{ name: 'product' },
	withEntities<Product>(),
	withRequestsStatus<'acl'>()
)

export const products$ = productsStore.pipe(selectAllEntities())

export const setProducts = (products: Product[]) =>
	productsStore.update(setEntities(products))

export const getProducts = () => productsStore.query(getAllEntities())

export const getProduct = (id: string) =>
	getProducts().find((product) => product.id === id)
