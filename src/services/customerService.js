/**
 * customerService.js
 * Persistent Customer CRM & Clienteling Service for Stallio Merchant App
 */

const STORAGE_KEY = 'stallio_customers_v1'

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Amna Khan',
    phone: '+92 300 1234567',
    email: 'amna.khan@gmail.com',
    city: 'Lahore',
    address: 'House 42, Street 8, Phase 5 DHA, Lahore',
    channel: 'whatsapp',
    ordersCount: 4,
    totalSpent: 18450,
    segment: 'vip', // 'vip' | 'repeat' | 'first_time'
    notes: 'Prefers weekend deliveries. Usually buys size L.',
    lastOrderDate: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    createdAt: '2026-06-10T11:00:00.000Z',
    orders: [
      { id: 'STL-1048', total: 7250, date: 'Today', status: 'pending' },
      { id: 'STL-1022', total: 4500, date: '12 Aug 2026', status: 'delivered' },
      { id: 'STL-0994', total: 3500, date: '28 Jul 2026', status: 'delivered' },
      { id: 'STL-0841', total: 3200, date: '14 Jun 2026', status: 'delivered' },
    ],
  },
  {
    id: 'cust-2',
    name: 'Bilal Tariq',
    phone: '+92 321 9876543',
    email: 'bilal.t@yahoo.com',
    city: 'Karachi',
    address: 'Flat 4B, Clifton Block 2, Karachi',
    channel: 'instagram',
    ordersCount: 3,
    totalSpent: 21800,
    segment: 'vip',
    notes: 'Always pays in advance via Meezan Bank.',
    lastOrderDate: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    createdAt: '2026-07-01T14:30:00.000Z',
    orders: [
      { id: 'STL-1047', total: 8400, date: 'Today', status: 'confirmed' },
      { id: 'STL-1011', total: 6900, date: '04 Aug 2026', status: 'delivered' },
      { id: 'STL-0955', total: 6500, date: '15 Jul 2026', status: 'delivered' },
    ],
  },
  {
    id: 'cust-3',
    name: 'Zainab Ahmed',
    phone: '+92 333 4567890',
    email: 'zainab.a@outlook.com',
    city: 'Islamabad',
    address: 'House 19, Street 3, F-7/2, Islamabad',
    channel: 'store',
    ordersCount: 2,
    totalSpent: 13750,
    segment: 'repeat',
    notes: 'Likes raw linen kurtas and earthy tones.',
    lastOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    createdAt: '2026-07-15T09:15:00.000Z',
    orders: [
      { id: 'STL-1046', total: 9250, date: 'Today', status: 'shipped' },
      { id: 'STL-0982', total: 4500, date: '22 Jul 2026', status: 'delivered' },
    ],
  },
  {
    id: 'cust-4',
    name: 'Hassan Raza',
    phone: '+92 301 5556677',
    email: 'hassan.raza@gmail.com',
    city: 'Rawalpindi',
    address: 'House 112, Sector C, Bahria Town, Rawalpindi',
    channel: 'whatsapp',
    ordersCount: 1,
    totalSpent: 6700,
    segment: 'first_time',
    notes: 'First time buyer from WhatsApp link in bio.',
    lastOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    createdAt: '2026-08-30T16:00:00.000Z',
    orders: [
      { id: 'STL-1045', total: 6700, date: 'Yesterday', status: 'delivered' },
    ],
  },
  {
    id: 'cust-5',
    name: 'Fatima Noor',
    phone: '+92 345 8899001',
    email: 'fatima.noor@gmail.com',
    city: 'Peshawar',
    address: 'House 5, University Town, Peshawar',
    channel: 'store',
    ordersCount: 2,
    totalSpent: 12410,
    segment: 'repeat',
    notes: 'Paid via Stripe online checkout.',
    lastOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    createdAt: '2026-08-10T12:00:00.000Z',
    orders: [
      { id: 'STL-1044', total: 6010, date: '2 days ago', status: 'delivered' },
      { id: 'STL-0970', total: 6400, date: '20 Jul 2026', status: 'delivered' },
    ],
  },
  {
    id: 'cust-6',
    name: 'Usman Ali',
    phone: '+92 302 1122334',
    email: 'usman.ali@hotmail.com',
    city: 'Multan',
    address: 'Gulgasht Colony, Multan',
    channel: 'instagram',
    ordersCount: 1,
    totalSpent: 0,
    segment: 'first_time',
    notes: 'Order was cancelled due to travel.',
    lastOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    createdAt: '2026-08-28T10:00:00.000Z',
    orders: [
      { id: 'STL-1043', total: 9150, date: '3 days ago', status: 'cancelled' },
    ],
  },
]

export const getCustomers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CUSTOMERS))
  } catch (e) {}
  return INITIAL_CUSTOMERS
}

export const saveCustomers = (customers) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers))
  } catch (e) {}
}

export const createCustomer = (data) => {
  const customers = getCustomers()
  const newCustomer = {
    ...data,
    id: `cust-${Date.now()}`,
    ordersCount: 0,
    totalSpent: 0,
    segment: 'first_time',
    orders: [],
    createdAt: new Date().toISOString(),
  }
  const updated = [newCustomer, ...customers]
  saveCustomers(updated)
  return newCustomer
}

export const updateCustomer = (id, updates) => {
  const customers = getCustomers()
  const updated = customers.map((c) => (c.id === id ? { ...c, ...updates } : c))
  saveCustomers(updated)
  return updated.find((c) => c.id === id)
}

export const deleteCustomer = (id) => {
  const customers = getCustomers()
  const updated = customers.filter((c) => c.id !== id)
  saveCustomers(updated)
  return true
}

export const calculateCustomerStats = (customers = []) => {
  const total = customers.length
  const repeatBuyers = customers.filter((c) => c.ordersCount > 1).length
  const repeatRate = total > 0 ? Math.round((repeatBuyers / total) * 100) : 0
  const vipCount = customers.filter((c) => c.totalSpent >= 15000).length
  const totalRevenue = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0)
  const averageLTV = total > 0 ? Math.round(totalRevenue / total) : 0

  return { total, repeatBuyers, repeatRate, vipCount, averageLTV }
}
