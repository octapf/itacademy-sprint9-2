import { createContext, useEffect, useMemo, useState } from 'react'
import IGlobalContext from '../interfaces/IGlobalContext'
import IProduct from '../interfaces/IProduct'

export const GlobalContext = createContext<IGlobalContext>({
	products: [
		{
			_id: '',
			user: '',
			name: '',
			type: '',
			price: 0,
			ingredients: [{ name: '', quantity: '', _id: '' }],
			method: '',
			glass: '',
			ice: '',
			garnish: '',
			optional: [''],
			history: '',
		},
	],
	setProducts: () => {},
})

const Provider = ({ children }: { children: React.ReactNode }) => {
	const URL_PRODUCTS = 'https://cocktailapp-backend.vercel.app/products'

	const [products, setProducts] = useState<IProduct[]>([
		{
			_id: '',
			user: '',
			name: '',
			type: '',
			price: 0,
			ingredients: [{ name: '', quantity: '', _id: '' }],
			method: '',
			glass: '',
			ice: '',
			garnish: '',
			optional: [''],
			history: '',
		},
	])

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(`${URL_PRODUCTS}`)

			const data = await response.json()

			setProducts(data)
		}

		fetchProducts()
	}, [])

	const providerValue = useMemo(() => ({ products, setProducts }), [products])

	return (
		<GlobalContext.Provider value={providerValue}>
			{children}
		</GlobalContext.Provider>
	)
}

export default Provider
