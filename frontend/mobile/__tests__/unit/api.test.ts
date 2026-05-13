import { getProducts, getProduct, getHealth } from '../../src/services/api'

global.fetch = jest.fn()

describe('API Service', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('getProducts fetches from correct endpoint', async () => {
    const mockData = { data: [], current_page: 1, last_page: 1, per_page: 15, total: 0 }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const result = await getProducts()
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/products')
    expect(result).toEqual(mockData)
  })

  it('getProduct fetches single product', async () => {
    const mockProduct = { id: 1, name: 'Widget' }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct),
    })

    const result = await getProduct(1)
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/products/1')
    expect(result).toEqual(mockProduct)
  })

  it('getHealth returns status', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 'ok' }),
    })

    const result = await getHealth()
    expect(result.status).toBe('ok')
  })

  it('getProducts throws on non-ok response', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: false })
    await expect(getProducts()).rejects.toThrow('Failed to fetch products')
  })
})
