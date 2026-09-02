/**
 * storeService.js
 * Centralized mock data & state management for Stallio Merchant App
 */

export const MOCK_DASHBOARD_METRICS = {
  revenueToday: '₨ 48,200',
  revenueChange: '+18.4%',
  revenueIsPositive: true,

  ordersToday: 24,
  ordersChange: '+12.5%',
  ordersIsPositive: true,

  pendingOrders: 7,
  pendingBadge: 'Action needed',

  liveVisitors: 19,
  visitorsChange: '+5 vs yesterday',
  visitorsIsPositive: true,
}

export const MOCK_WEEKLY_SALES = [
  { day: 'Mon', revenue: 32000, orders: 14 },
  { day: 'Tue', revenue: 41500, orders: 19 },
  { day: 'Wed', revenue: 28000, orders: 11 },
  { day: 'Thu', revenue: 54000, orders: 26 },
  { day: 'Fri', revenue: 68000, orders: 32 },
  { day: 'Sat', revenue: 84500, orders: 40 },
  { day: 'Sun', revenue: 48200, orders: 24 },
]

export const MOCK_RECENT_ORDERS = [
  {
    id: 'STL-1048',
    customer: {
      name: 'Amna Khan',
      phone: '+92 300 1234567',
      city: 'Lahore',
      address: 'House 42, Street 8, Phase 5 DHA, Lahore',
    },
    items: [
      {
        name: 'Oversized Vintage Acid-Wash Tee',
        size: 'L',
        qty: 1,
        price: '₨ 3,200',
        img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&h=120&fit=crop&auto=format&q=80',
      },
      {
        name: 'Retro Canvas Crossbody Bag',
        size: 'One Size',
        qty: 1,
        price: '₨ 2,400',
        img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    total: '₨ 5,600',
    status: 'pending',
    paymentMethod: 'Cash on Delivery (COD)',
    time: '6m ago',
    date: 'Today at 4:28 PM',
  },
  {
    id: 'STL-1047',
    customer: {
      name: 'Bilal Tariq',
      phone: '+92 321 9876543',
      city: 'Karachi',
      address: 'Flat 4B, Clifton Block 2, Karachi',
    },
    items: [
      {
        name: 'Minimalist Cargo Pants - Olive',
        size: '32',
        qty: 1,
        price: '₨ 4,800',
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    total: '₨ 4,800',
    status: 'confirmed',
    paymentMethod: 'Bank Transfer (Paid)',
    time: '24m ago',
    date: 'Today at 4:10 PM',
  },
  {
    id: 'STL-1046',
    customer: {
      name: 'Zainab Ahmed',
      phone: '+92 333 4567890',
      city: 'Islamabad',
      address: 'House 19, Street 3, F-7/2, Islamabad',
    },
    items: [
      {
        name: 'Textured Linen Summer Kurta',
        size: 'M',
        qty: 2,
        price: '₨ 7,000',
        img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    total: '₨ 7,000',
    status: 'shipped',
    paymentMethod: 'Cash on Delivery (COD)',
    time: '1h ago',
    date: 'Today at 3:15 PM',
  },
  {
    id: 'STL-1045',
    customer: {
      name: 'Hassan Raza',
      phone: '+92 301 5556677',
      city: 'Rawalpindi',
      address: 'House 112, Sector C, Bahria Town, Rawalpindi',
    },
    items: [
      {
        name: 'Monochrome Heavyweight Hoodie',
        size: 'XL',
        qty: 1,
        price: '₨ 6,500',
        img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    total: '₨ 6,500',
    status: 'delivered',
    paymentMethod: 'Cash on Delivery (COD)',
    time: '3h ago',
    date: 'Today at 1:30 PM',
  },
  {
    id: 'STL-1044',
    customer: {
      name: 'Fatima Noor',
      phone: '+92 345 8899001',
      city: 'Peshawar',
      address: 'University Town, Peshawar',
    },
    items: [
      {
        name: 'Classic White Tennis Sneakers',
        size: '41',
        qty: 1,
        price: '₨ 8,900',
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format&q=80',
      },
    ],
    total: '₨ 8,900',
    status: 'delivered',
    paymentMethod: 'Debit Card (Stripe)',
    time: '5h ago',
    date: 'Today at 11:45 AM',
  },
]

export const MOCK_SETUP_CHECKLIST = [
  { id: 'store_link', label: 'Create unique store link', completed: true },
  { id: 'first_product', label: 'Add first 3 products to catalog', completed: true },
  { id: 'payment_methods', label: 'Set delivery zones & COD options', completed: true },
  { id: 'bio_link', label: 'Add stallio.shop/yourbrand to Instagram bio', completed: false },
]
