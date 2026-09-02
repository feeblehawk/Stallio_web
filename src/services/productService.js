/**
 * productService.js
 * Persistent CRUD & inventory service for Stallio Merchant App
 */

const STORAGE_KEY = 'stallio_products_v1'

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    sku: 'STL-TEE-01',
    title: 'Oversized Vintage Acid-Wash Tee',
    subtitle: 'Heavyweight 240 GSM organic cotton',
    category: 'Apparel',
    price: 3200,
    compareAtPrice: 3800,
    costPerItem: 1400,
    stock: 18,
    status: 'active', // 'active' | 'draft' | 'archived'
    images: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    variants: [
      { name: 'Small', stock: 4 },
      { name: 'Medium', stock: 8 },
      { name: 'Large', stock: 6 },
    ],
    description: 'Custom vintage wash with a relaxed drop-shoulder silhouette. Preshrunk for optimal drape.',
    slug: 'oversized-vintage-acid-wash-tee',
    createdAt: '2026-08-15T10:30:00.000Z',
  },
  {
    id: 'prod-002',
    sku: 'STL-SNK-02',
    title: 'Retro Classic Court Sneakers',
    subtitle: 'Full-grain Italian calf leather',
    category: 'Footwear',
    price: 8900,
    compareAtPrice: 10500,
    costPerItem: 4200,
    stock: 4, // Low stock!
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    variants: [
      { name: 'EU 40', stock: 1 },
      { name: 'EU 41', stock: 2 },
      { name: 'EU 42', stock: 1 },
    ],
    description: 'Minimalist court silhouette with cushioned EVA footbed and vulcanized natural rubber outsole.',
    slug: 'retro-classic-court-sneakers',
    createdAt: '2026-08-20T14:15:00.000Z',
  },
  {
    id: 'prod-003',
    sku: 'STL-KRT-03',
    title: 'Textured Linen Summer Kurta',
    subtitle: 'Breathable pure raw flax linen',
    category: 'Apparel',
    price: 4500,
    compareAtPrice: 5200,
    costPerItem: 2000,
    stock: 14,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    variants: [
      { name: 'Small', stock: 4 },
      { name: 'Medium', stock: 6 },
      { name: 'Large', stock: 4 },
    ],
    description: 'Lightweight and airy kurta with mother-of-pearl buttons and mandarin collar.',
    slug: 'textured-linen-summer-kurta',
    createdAt: '2026-08-22T09:00:00.000Z',
  },
  {
    id: 'prod-004',
    sku: 'STL-BAG-04',
    title: 'Modular Crossbody Sling Bag',
    subtitle: 'Waterproof 1000D Cordura nylon',
    category: 'Accessories',
    price: 3800,
    compareAtPrice: null,
    costPerItem: 1600,
    stock: 22,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    variants: [
      { name: 'Matte Black', stock: 12 },
      { name: 'Olive Drab', stock: 10 },
    ],
    description: 'Engineered for daily urban utility. Features Fidlock magnetic buckle and YKK Aquaguard zippers.',
    slug: 'modular-crossbody-sling-bag',
    createdAt: '2026-08-25T11:45:00.000Z',
  },
  {
    id: 'prod-005',
    sku: 'STL-HD-05',
    title: 'Monochrome Heavyweight Hoodie',
    subtitle: '450 GSM French Terry Fleece',
    category: 'Apparel',
    price: 6500,
    compareAtPrice: 7500,
    costPerItem: 2800,
    stock: 2, // Low stock!
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    variants: [
      { name: 'Medium', stock: 1 },
      { name: 'Large', stock: 1 },
    ],
    description: 'Double-layered hood with seamless kangaroo pocket and ribbed cuffs.',
    slug: 'monochrome-heavyweight-hoodie',
    createdAt: '2026-08-28T16:20:00.000Z',
  },
  {
    id: 'prod-006',
    sku: 'STL-SCN-06',
    title: 'No. 04 Smoked Vetiver Candle',
    subtitle: 'Hand-poured coconut soy wax blend',
    category: 'Lifestyle',
    price: 2800,
    compareAtPrice: null,
    costPerItem: 950,
    stock: 0, // Out of stock!
    status: 'draft',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    variants: [],
    description: 'Top notes of bergamot and cedarwood with a deep smoked vetiver base. 55-hour burn time.',
    slug: 'no-04-smoked-vetiver-candle',
    createdAt: '2026-08-30T18:00:00.000Z',
  },
]

export const CATEGORIES = [
  'All',
  'Apparel',
  'Footwear',
  'Accessories',
  'Lifestyle',
]

/** Read all products from localStorage or fallback to defaults */
export const getProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('Failed to read products from localStorage:', e)
  }
  // Initialize storage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS))
  } catch (e) {}
  return INITIAL_PRODUCTS
}

/** Save products array to localStorage */
export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (e) {
    console.error('Failed to save products to localStorage:', e)
  }
}

/** Create a new product */
export const createProduct = (data) => {
  const products = getProducts()
  const newProduct = {
    ...data,
    id: `prod-${Date.now()}`,
    sku: data.sku || `STL-SKU-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString(),
  }
  const updated = [newProduct, ...products]
  saveProducts(updated)
  return newProduct
}

/** Update an existing product */
export const updateProduct = (id, updates) => {
  const products = getProducts()
  const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p))
  saveProducts(updated)
  return updated.find((p) => p.id === id)
}

/** Delete a product */
export const deleteProduct = (id) => {
  const products = getProducts()
  const updated = products.filter((p) => p.id !== id)
  saveProducts(updated)
  return true
}

/** Toggle Active / Draft status */
export const toggleProductStatus = (id) => {
  const products = getProducts()
  const product = products.find((p) => p.id === id)
  if (!product) return null
  const newStatus = product.status === 'active' ? 'draft' : 'active'
  return updateProduct(id, { status: newStatus })
}

/** Duplicate an existing product */
export const duplicateProduct = (id) => {
  const products = getProducts()
  const product = products.find((p) => p.id === id)
  if (!product) return null

  const duplicated = {
    ...product,
    id: `prod-${Date.now()}`,
    sku: `${product.sku || 'STL'}-COPY`,
    title: `${product.title} (Copy)`,
    status: 'draft',
    createdAt: new Date().toISOString(),
  }

  const updated = [duplicated, ...products]
  saveProducts(updated)
  return duplicated
}

/** Adjust stock count */
export const adjustStock = (id, delta) => {
  const products = getProducts()
  const product = products.find((p) => p.id === id)
  if (!product) return null
  const newStock = Math.max(0, (product.stock || 0) + delta)
  return updateProduct(id, { stock: newStock })
}

/** Calculate KPIs for products */
export const calculateInventoryStats = (products = []) => {
  const total = products.length
  const active = products.filter((p) => p.status === 'active').length
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 5).length
  const outOfStock = products.filter((p) => p.stock === 0).length
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0)
  const totalValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock || 0),
    0
  )
  return { total, active, lowStock, outOfStock, totalStock, totalValue }
}
