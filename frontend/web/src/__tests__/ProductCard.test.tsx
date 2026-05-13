import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductCard from '../components/ProductCard'
import type { Product } from '../services/api'

const mockProduct: Product = {
  id: 1,
  name: 'Test Widget',
  description: 'A great widget',
  price: '29.99',
  stock: 10,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Widget')).toBeInTheDocument()
  })

  it('renders product price', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('renders stock count when in stock', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('10 in stock')).toBeInTheDocument()
  })

  it('renders out of stock when stock is zero', () => {
    const outOfStock = { ...mockProduct, stock: 0 }
    render(<ProductCard product={outOfStock} />)
    expect(screen.getByText('Out of stock')).toBeInTheDocument()
  })

  it('renders description when present', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('A great widget')).toBeInTheDocument()
  })

  it('does not render description when null', () => {
    const noDesc = { ...mockProduct, description: null }
    render(<ProductCard product={noDesc} />)
    expect(screen.queryByText('A great widget')).not.toBeInTheDocument()
  })
})
