import { useEffect, useState } from 'react'
import { getProducts, type Product } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div data-testid="loading">Loading products...</div>
  if (error) return <div data-testid="error">Error: {error}</div>

  return (
    <div className="product-list">
      <h2>Products ({products.length})</h2>
      {products.length === 0 ? (
        <p data-testid="empty">No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
