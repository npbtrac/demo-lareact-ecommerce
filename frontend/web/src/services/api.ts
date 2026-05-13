import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export interface Product {
  id: number
  name: string
  description: string | null
  price: string
  stock: number
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export const getProducts = () =>
  api.get<PaginatedResponse<Product>>('/products')

export const getProduct = (id: number) =>
  api.get<Product>(`/products/${id}`)

export const createProduct = (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) =>
  api.post<Product>('/products', data)

export const getHealth = () =>
  api.get<{ status: string; service: string; timestamp: string }>('/health')

export default api
