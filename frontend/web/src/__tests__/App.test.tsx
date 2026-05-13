import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders the home page with brand name', () => {
    render(<App />)
    expect(screen.getByText('LaReact E-Commerce')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<App />)
    expect(screen.getByText('Products')).toBeInTheDocument()
  })
})
