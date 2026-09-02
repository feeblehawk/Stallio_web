/**
 * categoryService.js
 * Collections & Categories Management Service for Stallio Merchant App
 */

const STORAGE_KEY = 'stallio_categories_v1'

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Apparel',
    slug: 'apparel',
    description: 'Raw linen kurtas, acid-wash tees, and heavyweight French terry hoodies.',
    coverImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop&auto=format&q=80',
    itemCount: 3,
    isFeatured: true, // Pinned on storefront hero
    status: 'active',
  },
  {
    id: 'cat-2',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Minimalist leather court sneakers and casual footwear.',
    coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&auto=format&q=80',
    itemCount: 1,
    isFeatured: true,
    status: 'active',
  },
  {
    id: 'cat-3',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Waterproof Cordura sling bags, cardholders, and daily essentials.',
    coverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=400&fit=crop&auto=format&q=80',
    itemCount: 1,
    isFeatured: true,
    status: 'active',
  },
  {
    id: 'cat-4',
    name: 'Lifestyle & Objects',
    slug: 'lifestyle',
    description: 'Artisanal smoked vetiver candles and botanical home scents.',
    coverImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=400&fit=crop&auto=format&q=80',
    itemCount: 1,
    isFeatured: false,
    status: 'active',
  },
  {
    id: 'cat-5',
    name: 'Summer Drop ‘26',
    slug: 'summer-drop-26',
    description: 'Limited seasonal drop crafted for warm weather comfort.',
    coverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=400&fit=crop&auto=format&q=80',
    itemCount: 2,
    isFeatured: true,
    status: 'active',
  },
]

export const getCategories = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CATEGORIES))
  } catch (e) {}
  return INITIAL_CATEGORIES
}

export const saveCategories = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
  } catch (e) {}
}

export const createCategory = (data) => {
  const categories = getCategories()
  const newCat = {
    ...data,
    id: `cat-${Date.now()}`,
    itemCount: data.itemCount || 0,
    slug:
      data.slug ||
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
    status: data.status || 'active',
  }
  const updated = [newCat, ...categories]
  saveCategories(updated)
  return newCat
}

export const updateCategory = (id, updates) => {
  const categories = getCategories()
  const updated = categories.map((c) => (c.id === id ? { ...c, ...updates } : c))
  saveCategories(updated)
  return updated.find((c) => c.id === id)
}

export const deleteCategory = (id) => {
  const categories = getCategories()
  const updated = categories.filter((c) => c.id !== id)
  saveCategories(updated)
  return true
}

export const toggleFeaturedCategory = (id) => {
  const categories = getCategories()
  const cat = categories.find((c) => c.id === id)
  if (!cat) return null
  return updateCategory(id, { isFeatured: !cat.isFeatured })
}
