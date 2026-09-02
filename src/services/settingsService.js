/**
 * settingsService.js
 * Persistent store configuration & merchant settings for Stallio
 */

const STORAGE_KEY = 'stallio_settings_v1'

export const CURRENCIES = [
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee (PKR - ₨)' },
  { code: 'USD', symbol: '$', name: 'US Dollar (USD - $)' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham (AED)' },
  { code: 'SAR', symbol: 'SAR ', name: 'Saudi Riyal (SAR)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (GBP - £)' },
  { code: 'EUR', symbol: '€', name: 'Euro (EUR - €)' },
]

export const LANGUAGES = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ur', name: 'اردو (Urdu)', dir: 'rtl' },
]

export const getCurrencySymbol = (code = 'PKR') => {
  const found = CURRENCIES.find((c) => c.code === code)
  return found ? found.symbol : '₨'
}

export const formatPrice = (amount = 0, currencyCode = 'PKR') => {
  const symbol = getCurrencySymbol(currencyCode)
  const num = Number(amount) || 0
  return `${symbol} ${num.toLocaleString()}`
}

export const DEFAULT_SETTINGS = {
  // ── Store Profile ──────────────────────────────────────────
  store: {
    name: 'Denzen Thrift',
    handle: 'denzen-thrift',
    bio: 'Curated vintage & minimalist fashion drops. New arrivals every Friday.',
    category: 'Fashion & Apparel',
    whatsapp: '0300-1234567',
    instagram: '@denzen_thrift',
    logo: '',
    status: 'live', // 'live' | 'paused'
    email: 'hello@denzenthrift.com',
    currency: 'PKR', // 'PKR' | 'USD' | 'AED' | 'SAR' | 'GBP' | 'EUR'
    language: 'en', // 'en' | 'ur'
  },

  // ── Payments ───────────────────────────────────────────────
  payments: {
    cod: true,
    bankTransfer: true,
    easypaisa: false,
    jazzcash: false,
    stripe: false,
    bankDetails: {
      accountTitle: 'Denzen Textiles Pvt Ltd',
      bankName: 'Meezan Bank',
      accountNumber: '01230123456789',
      iban: 'PK36MEZN0001230123456789',
    },
    easypaisaNumber: '',
    jazzcashNumber: '',
    minOrderValue: 1500,
    codCities: 'all', // 'all' | 'selected'
    selectedCodCities: [],
  },

  // ── Shipping & Delivery ────────────────────────────────────
  shipping: {
    defaultFee: 250,
    freeShippingThreshold: 4500,
    estimatedDays: '2–3 Business Days',
    coverage: 'nationwide', // 'nationwide' | 'selected'
    selectedCities: [],
    couriers: {
      tcs: true,
      trax: true,
      leopard: false,
      rider: false,
      bykea: false,
    },
    deliveryNote:
      'Your order has been dispatched via TCS Express. Expected delivery in 2–3 business days.',
  },

  // ── Notifications ──────────────────────────────────────────
  notifications: {
    newOrderBrowser: true,
    newOrderWhatsapp: true,
    lowStockThreshold: 5,
    orderStatusUpdatesToCustomer: true,
    weeklySummary: false,
  },

  // ── Account ────────────────────────────────────────────────
  account: {
    fullName: 'Ahmed Raza',
    email: 'ahmed@denzenthrift.com',
    avatar: '',
    twoFactorEnabled: false,
    googleLinked: true,
    appleLinked: false,
  },
}

function safeClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function deepMerge(target, source) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return target
  }
  const output = { ...target }
  for (const key of Object.keys(source)) {
    if (source[key] !== undefined && source[key] !== null) {
      if (
        typeof source[key] === 'object' &&
        !Array.isArray(source[key]) &&
        typeof target[key] === 'object' &&
        !Array.isArray(target[key])
      ) {
        output[key] = deepMerge(target[key] || {}, source[key])
      } else {
        output[key] = source[key]
      }
    }
  }
  return output
}

export const getSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return deepMerge(safeClone(DEFAULT_SETTINGS), parsed)
    }
  } catch (e) {
    console.error('Failed to load settings:', e)
  }
  return safeClone(DEFAULT_SETTINGS)
}

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    return true
  } catch (e) {
    console.error('Failed to save settings:', e)
    return false
  }
}

export const saveSectionSettings = (section, data) => {
  const current = getSettings()
  const updated = {
    ...current,
    [section]: {
      ...(current[section] || {}),
      ...(data || {}),
    },
  }
  return saveSettings(updated)
}

/** Export all store data as JSON file */
export const exportAllData = ({ orders, products, customers, settings }) => {
  const payload = {
    exportedAt: new Date().toISOString(),
    store: settings?.store,
    stats: {
      totalProducts: products?.length || 0,
      totalOrders: orders?.length || 0,
      totalCustomers: customers?.length || 0,
    },
    products: products || [],
    orders: orders || [],
    customers: customers || [],
  }

  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `stallio-export-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Reset store data (products, orders, customers) — keeps settings */
export const resetStoreData = () => {
  try {
    localStorage.removeItem('stallio_products_v1')
    localStorage.removeItem('stallio_orders_v1')
    localStorage.removeItem('stallio_customers_v1')
    localStorage.removeItem('stallio_conversations_v1')
    localStorage.removeItem('stallio_categories_v1')
    localStorage.removeItem('stallio_discounts_v1')
  } catch (e) {}
  return true
}
