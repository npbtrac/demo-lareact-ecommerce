import type { Product } from '../services/api'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card" data-testid={`product-${product.id}`}>
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      <div className="product-meta">
        <span className="price">${product.price}</span>
        <span className="stock">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>
    </div>
  )
}
