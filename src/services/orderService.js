/**
 * orderService.js
 * Centralized Order Lifecycle & CRUD Service for Stallio Merchant App
 */

const STORAGE_KEY = 'stallio_orders_v1'

export const INITIAL_ORDERS = [
  {
    id: 'STL-1048',
    customer: {
      name: 'Amna Khan',
      phone: '+923001234567',
      formattedPhone: '0300-1234567',
      email: 'amna.khan@gmail.com',
      city: 'Lahore',
      address: 'House 42, Street 8, Phase 5 DHA, Lahore',
      notes: 'Please call before delivery. Ring bell twice.',
    },
    items: [
      {
        id: 'prod-001',
        name: 'Oversized Vintage Acid-Wash Tee',
        size: 'L',
        qty: 1,
        price: 3200,
        img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&h=120&fit=crop&auto=format&q=80',
      },
      {
        id: 'prod-004',
        name: 'Modular Crossbody Sling Bag',
        size: 'Matte Black',
        qty: 1,
        price: 3800,
        img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    subtotal: 7000,
    deliveryFee: 250,
    discount: 0,
    total: 7250,
    status: 'pending', // 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
    paymentMethod: 'Cash on Delivery (COD)',
    isPaid: false,
    trackingNumber: null,
    courier: 'TCS Express',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
  },
  {
    id: 'STL-1047',
    customer: {
      name: 'Bilal Tariq',
      phone: '+923219876543',
      formattedPhone: '0321-9876543',
      email: 'bilal.t@yahoo.com',
      city: 'Karachi',
      address: 'Flat 4B, Clifton Block 2, Karachi',
      notes: 'Leave package with security gate if not home.',
    },
    items: [
      {
        id: 'prod-002',
        name: 'Retro Classic Court Sneakers',
        size: 'EU 41',
        qty: 1,
        price: 8900,
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    subtotal: 8900,
    deliveryFee: 0,
    discount: 500,
    total: 8400,
    status: 'confirmed',
    paymentMethod: 'Bank Transfer',
    isPaid: true,
    trackingNumber: null,
    courier: 'Trax Logistics',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
  },
  {
    id: 'STL-1046',
    customer: {
      name: 'Zainab Ahmed',
      phone: '+923334567890',
      formattedPhone: '0333-4567890',
      email: 'zainab.a@outlook.com',
      city: 'Islamabad',
      address: 'House 19, Street 3, F-7/2, Islamabad',
      notes: '',
    },
    items: [
      {
        id: 'prod-003',
        name: 'Textured Linen Summer Kurta',
        size: 'M',
        qty: 2,
        price: 4500,
        img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    subtotal: 9000,
    deliveryFee: 250,
    discount: 0,
    total: 9250,
    status: 'shipped',
    paymentMethod: 'Cash on Delivery (COD)',
    isPaid: false,
    trackingNumber: 'TRX-998241',
    courier: 'Trax Logistics',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: 'STL-1045',
    customer: {
      name: 'Hassan Raza',
      phone: '+923015556677',
      formattedPhone: '0301-5556677',
      email: 'hassan.raza@gmail.com',
      city: 'Rawalpindi',
      address: 'House 112, Sector C, Bahria Town, Rawalpindi',
      notes: '',
    },
    items: [
      {
        id: 'prod-005',
        name: 'Monochrome Heavyweight Hoodie',
        size: 'XL',
        qty: 1,
        price: 6500,
        img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    subtotal: 6500,
    deliveryFee: 200,
    discount: 0,
    total: 6700,
    status: 'delivered',
    paymentMethod: 'Cash on Delivery (COD)',
    isPaid: true,
    trackingNumber: 'TCS-819203',
    courier: 'TCS Express',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
  },
  {
    id: 'STL-1044',
    customer: {
      name: 'Fatima Noor',
      phone: '+923458899001',
      formattedPhone: '0345-8899001',
      email: 'fatima.noor@gmail.com',
      city: 'Peshawar',
      address: 'House 5, University Town, Peshawar',
      notes: '',
    },
    items: [
      {
        id: 'prod-001',
        name: 'Oversized Vintage Acid-Wash Tee',
        size: 'S',
        qty: 2,
        price: 3200,
        img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    subtotal: 6400,
    deliveryFee: 250,
    discount: 640,
    total: 6010,
    status: 'delivered',
    paymentMethod: 'Debit Card (Stripe)',
    isPaid: true,
    trackingNumber: 'LEO-441209',
    courier: 'Leopard Courier',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: 'STL-1043',
    customer: {
      name: 'Usman Ali',
      phone: '+923021122334',
      formattedPhone: '0302-1122334',
      email: 'usman.ali@hotmail.com',
      city: 'Multan',
      address: 'Gulgasht Colony, Multan',
      notes: 'Cancelled due to out of city travel.',
    },
    items: [
      {
        id: 'prod-002',
        name: 'Retro Classic Court Sneakers',
        size: 'EU 42',
        qty: 1,
        price: 8900,
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    subtotal: 8900,
    deliveryFee: 250,
    discount: 0,
    total: 9150,
    status: 'cancelled',
    paymentMethod: 'Cash on Delivery (COD)',
    isPaid: false,
    trackingNumber: null,
    courier: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
]

/** Get all orders from storage */
export const getOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('Failed to load orders:', e)
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS))
  } catch (e) {}
  return INITIAL_ORDERS
}

/** Save orders to storage */
export const saveOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch (e) {
    console.error('Failed to save orders:', e)
  }
}

/** Create a manual or storefront order */
export const createOrder = (orderData) => {
  const orders = getOrders()
  const nextNum = Math.floor(1049 + orders.length)
  const newOrder = {
    ...orderData,
    id: `STL-${nextNum}`,
    createdAt: new Date().toISOString(),
    status: orderData.status || 'pending',
  }
  const updated = [newOrder, ...orders]
  saveOrders(updated)
  return newOrder
}

/** Update order details */
export const updateOrder = (id, updates) => {
  const orders = getOrders()
  const updated = orders.map((o) => (o.id === id ? { ...o, ...updates } : o))
  saveOrders(updated)
  return updated.find((o) => o.id === id)
}

/** 1-Tap Status progression helper */
export const progressOrderStatus = (id, trackingNumber = null) => {
  const orders = getOrders()
  const order = orders.find((o) => o.id === id)
  if (!order) return null

  let nextStatus = order.status
  const updates = {}

  if (order.status === 'pending') {
    nextStatus = 'confirmed'
  } else if (order.status === 'confirmed') {
    nextStatus = 'shipped'
    if (trackingNumber) updates.trackingNumber = trackingNumber
  } else if (order.status === 'shipped') {
    nextStatus = 'delivered'
    updates.isPaid = true
  }

  updates.status = nextStatus
  return updateOrder(id, updates)
}

/** Revert / Rollback Order Status (e.g., Shipped -> Confirmed -> Pending) */
export const revertOrderStatus = (id, targetStatus = 'pending') => {
  const orders = getOrders()
  const order = orders.find((o) => o.id === id)
  if (!order) return null

  const updates = {
    status: targetStatus,
  }

  if (targetStatus === 'pending' || targetStatus === 'confirmed') {
    updates.trackingNumber = null
    if (order.paymentMethod?.includes('Cash on Delivery')) {
      updates.isPaid = false
    }
  }

  return updateOrder(id, updates)
}

/** Delete an order */
export const deleteOrder = (id) => {
  const orders = getOrders()
  const updated = orders.filter((o) => o.id !== id)
  saveOrders(updated)
  return true
}

/** Calculate order KPIs */
export const calculateOrderStats = (orders = []) => {
  const total = orders.length
  const pending = orders.filter((o) => o.status === 'pending').length
  const confirmed = orders.filter((o) => o.status === 'confirmed').length
  const shipped = orders.filter((o) => o.status === 'shipped').length
  const delivered = orders.filter((o) => o.status === 'delivered').length
  const cancelled = orders.filter((o) => o.status === 'cancelled').length

  const grossVolume = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0)

  return {
    total,
    pending,
    confirmed,
    shipped,
    delivered,
    cancelled,
    grossVolume,
  }
}

/** Export orders to formatted CSV */
export const exportOrdersToCSV = (orders = []) => {
  const headers = [
    'Order ID',
    'Date',
    'Customer Name',
    'Customer Phone',
    'Customer City',
    'Customer Address',
    'Items',
    'Subtotal',
    'Delivery Fee',
    'Discount',
    'Total Amount',
    'Status',
    'Payment Method',
    'Tracking Number',
  ]

  const rows = orders.map((o) => [
    o.id,
    new Date(o.createdAt).toLocaleDateString(),
    `"${o.customer?.name || ''}"`,
    `"${o.customer?.phone || ''}"`,
    `"${o.customer?.city || ''}"`,
    `"${o.customer?.address || ''}"`,
    `"${o.items?.map((it) => `${it.name} (x${it.qty})`).join('; ')}"`,
    o.subtotal,
    o.deliveryFee,
    o.discount,
    o.total,
    o.status,
    `"${o.paymentMethod || ''}"`,
    `"${o.trackingNumber || ''}"`,
  ])

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `stallio_orders_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/** Helper: Generate direct WhatsApp order message URL */
export const getWhatsAppOrderLink = (order) => {
  if (!order || !order.customer?.phone) return '#'
  const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '')
  const message = `Salam ${order.customer.name}! Thank you for your order *#${order.id}* on Stallio.
Your order for *${order.items.map((i) => i.name).join(', ')}* (Total: ₨ ${order.total.toLocaleString()}) has been received and is being processed.`

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}
