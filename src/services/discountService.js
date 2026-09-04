/**
 * discountService.js
 * Promo Codes & Discounts Management Service for Stallio Merchant App
 */

const STORAGE_KEY = 'stallio_discounts_v1'

export const INITIAL_DISCOUNTS = [
  {
    id: 'disc-1',
    code: 'SUMMER20',
    type: 'percentage', // 'percentage' | 'fixed' | 'shipping'
    value: 20, // 20%
    minPurchase: 3000,
    usageCount: 42,
    usageLimit: 100,
    status: 'active', // 'active' | 'expired' | 'scheduled'
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(), // 6 days left
    createdAt: '2026-08-15T10:00:00.000Z',
    description: '20% off all apparel orders above ₨ 3,000.',
  },
  {
    id: 'disc-2',
    code: 'FREESHIP',
    type: 'shipping',
    value: 250, // 100% free delivery
    minPurchase: 2500,
    usageCount: 88,
    usageLimit: null, // Unlimited
    status: 'active',
    expiresAt: null, // Never expires
    createdAt: '2026-08-01T12:00:00.000Z',
    description: 'Free nationwide delivery on orders over ₨ 2,500.',
  },
  {
    id: 'disc-3',
    code: 'FLAT500',
    type: 'fixed',
    value: 500, // ₨ 500 off
    minPurchase: 4500,
    usageCount: 15,
    usageLimit: 50,
    status: 'active',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    createdAt: '2026-08-20T08:30:00.000Z',
    description: 'Flat ₨ 500 instant discount on sneakers and hoodies.',
  },
  {
    id: 'disc-4',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 0,
    usageCount: 120,
    usageLimit: null,
    status: 'active',
    expiresAt: null,
    createdAt: '2026-07-01T00:00:00.000Z',
    description: '10% off welcome coupon for new bio link visitors.',
  },
  {
    id: 'disc-5',
    code: 'EIDSPECIAL',
    type: 'percentage',
    value: 25,
    minPurchase: 5000,
    usageCount: 50,
    usageLimit: 50,
    status: 'expired',
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    createdAt: '2026-06-15T00:00:00.000Z',
    description: 'Eid holiday promotional campaign.',
  },
]

export const getDiscounts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DISCOUNTS))
  } catch (e) {}
  return INITIAL_DISCOUNTS
}

export const saveDiscounts = (discounts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(discounts))
  } catch (e) {}
}

export const createDiscount = (data) => {
  const discounts = getDiscounts()
  const newDiscount = {
    ...data,
    id: `disc-${Date.now()}`,
    code: data.code.toUpperCase().replace(/[^A-Z0-9_-]/g, ''),
    usageCount: 0,
    status: data.status || 'active',
    createdAt: new Date().toISOString(),
  }
  const updated = [newDiscount, ...discounts]
  saveDiscounts(updated)
  return newDiscount
}

export const updateDiscount = (id, updates) => {
  const discounts = getDiscounts()
  const updated = discounts.map((d) => (d.id === id ? { ...d, ...updates } : d))
  saveDiscounts(updated)
  return updated.find((d) => d.id === id)
}

export const deleteDiscount = (id) => {
  const discounts = getDiscounts()
  const updated = discounts.filter((d) => d.id !== id)
  saveDiscounts(updated)
  return true
}

export const toggleDiscountStatus = (id) => {
  const discounts = getDiscounts()
  const discount = discounts.find((d) => d.id === id)
  if (!discount) return null
  const newStatus = discount.status === 'active' ? 'expired' : 'active'
  return updateDiscount(id, { status: newStatus })
}

export const calculateDiscountStats = (discounts = []) => {
  const activeCount = discounts.filter((d) => d.status === 'active').length
  const totalRedemptions = discounts.reduce((sum, d) => sum + (d.usageCount || 0), 0)
  const discountRevenue = totalRedemptions * 4200 // estimated assisted revenue

  return { activeCount, totalRedemptions, discountRevenue }
}
