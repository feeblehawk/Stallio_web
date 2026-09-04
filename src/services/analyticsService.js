/**
 * analyticsService.js
 * Business Intelligence & Analytics Service for Stallio Merchant App
 */

export const MOCK_TIMEFRAME_DATA = {
  '7days': {
    grossSales: 356200,
    salesChange: '+18.4%',
    ordersCount: 52,
    ordersChange: '+12.0%',
    aov: 6850,
    aovChange: '+5.7%',
    conversionRate: 3.8,
    conversionChange: '+0.6%',
    storeVisitors: 1370,
    revenueChart: [
      { label: 'Mon', revenue: 32000, orders: 5 },
      { label: 'Tue', revenue: 41500, orders: 6 },
      { label: 'Wed', revenue: 28000, orders: 4 },
      { label: 'Thu', revenue: 54000, orders: 8 },
      { label: 'Fri', revenue: 68000, orders: 10 },
      { label: 'Sat', revenue: 84500, orders: 12 },
      { label: 'Sun', revenue: 48200, orders: 7 },
    ],
  },
  '30days': {
    grossSales: 1420800,
    salesChange: '+24.6%',
    ordersCount: 210,
    ordersChange: '+19.2%',
    aov: 6765,
    aovChange: '+4.2%',
    conversionRate: 3.6,
    conversionChange: '+0.4%',
    storeVisitors: 5840,
    revenueChart: [
      { label: 'Week 1', revenue: 280000, orders: 42 },
      { label: 'Week 2', revenue: 345000, orders: 51 },
      { label: 'Week 3', revenue: 395000, orders: 58 },
      { label: 'Week 4', revenue: 400800, orders: 59 },
    ],
  },
  today: {
    grossSales: 48200,
    salesChange: '+8.2%',
    ordersCount: 7,
    ordersChange: '+2',
    aov: 6885,
    aovChange: '+3.1%',
    conversionRate: 4.2,
    conversionChange: '+0.8%',
    storeVisitors: 168,
    revenueChart: [
      { label: '9 AM', revenue: 4500, orders: 1 },
      { label: '12 PM', revenue: 8900, orders: 1 },
      { label: '3 PM', revenue: 13200, orders: 2 },
      { label: '6 PM', revenue: 15400, orders: 2 },
      { label: '9 PM', revenue: 6200, orders: 1 },
    ],
  },
}

export const TRAFFIC_SOURCES = [
  { source: 'Instagram Bio Link', percentage: 54, visitors: 3150, color: 'bg-purple-500' },
  { source: 'WhatsApp Catalog & Direct', percentage: 28, visitors: 1630, color: 'bg-[#25D366]' },
  { source: 'Direct / stallio.shop', percentage: 12, visitors: 700, color: 'bg-primary' },
  { source: 'TikTok & Other', percentage: 6, visitors: 360, color: 'bg-foreground' },
]

export const TOP_PRODUCTS_LEADERBOARD = [
  {
    name: 'Oversized Vintage Acid-Wash Tee',
    sku: 'STL-TEE-01',
    category: 'Apparel',
    revenue: 148500,
    unitsSold: 46,
    stockLeft: 18,
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&h=120&fit=crop&auto=format&q=80',
  },
  {
    name: 'Retro Classic Court Sneakers',
    sku: 'STL-SNK-02',
    category: 'Footwear',
    revenue: 124600,
    unitsSold: 14,
    stockLeft: 4,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format&q=80',
  },
  {
    name: 'Textured Linen Summer Kurta',
    sku: 'STL-KRT-03',
    category: 'Apparel',
    revenue: 81000,
    unitsSold: 18,
    stockLeft: 14,
    img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=120&h=120&fit=crop&auto=format&q=80',
  },
  {
    name: 'Monochrome Heavyweight Hoodie',
    sku: 'STL-HD-05',
    category: 'Apparel',
    revenue: 65000,
    unitsSold: 10,
    stockLeft: 2,
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=120&h=120&fit=crop&auto=format&q=80',
  },
]

export const TOP_CITIES = [
  { city: 'Lahore', percentage: 42, orders: 88 },
  { city: 'Karachi', percentage: 31, orders: 65 },
  { city: 'Islamabad / Rawalpindi', percentage: 19, orders: 40 },
  { city: 'Peshawar & Others', percentage: 8, orders: 17 },
]

export const getAnalyticsData = (timeframe = '7days') => {
  return MOCK_TIMEFRAME_DATA[timeframe] || MOCK_TIMEFRAME_DATA['7days']
}
