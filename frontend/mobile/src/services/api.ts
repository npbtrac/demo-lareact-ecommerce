const API_BASE_URL = 'http://localhost:8000/api'

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

export async function getProducts(): Promise<PaginatedResponse<Product>> {
  const response = await fetch(`${API_BASE_URL}/products`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)
  if (!response.ok) throw new Error('Failed to fetch product')
  return response.json()
}

export async function getHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`)
  if (!response.ok) throw new Error('Health check failed')
  return response.json()
}
