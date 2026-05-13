import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductList from './pages/ProductList'
import './App.css'

function Home() {
  return (
    <div className="home">
      <h1>LaReact E-Commerce</h1>
      <p>A demo application using Laravel + React</p>
      <Link to="/products" className="btn">
        Browse Products
      </Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="brand">LaReact</Link>
        <Link to="/products">Products</Link>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
