/**
 * Stallio Storefront Service
 * Data-driven storefront layouts, modular section schemas, multi-page data, and live persistence.
 */

export const STOREFRONT_LAYOUTS = [
  {
    id: 'modern',
    name: 'Modern',
    tagline: 'High-energy contemporary apparel & streetwear drops',
    description: 'Hero billboard leading into a responsive product showcase with compact collection pills and buyer trust perks.',
    primaryColor: '#18181b',
    accentColor: '#4f46e5',
    backgroundColor: '#ffffff',
    surfaceColor: '#f8fafc',
    fontHeading: 'Space Grotesk, sans-serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    borderRadius: 'rounded-2xl',
    buttonStyle: 'pill',
    spacingDensity: 'normal',
    headerStyle: 'standard',
    badge: 'Trending',
    homeSections: [
      {
        type: 'hero_banner',
        title: 'Hero Billboard',
        defaultData: {
          badgeText: 'SUMMER VAULT DROP 2026',
          heading: 'Timeless Vintage & Heavyweight Essentials',
          subheading: 'Hand-picked pre-loved streetwear, oversized fleece hoodies, and Japanese denim.',
          primaryBtnText: 'Shop New Arrivals',
          primaryBtnLink: '#products',
          secondaryBtnText: 'Explore Categories',
          secondaryBtnLink: '#categories',
          bgImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400&auto=format&fit=crop',
          overlayDarkness: 40,
          alignment: 'center',
        },
      },
      {
        type: 'product_grid',
        title: 'Trending Drops',
        defaultData: {
          heading: 'Trending Drops',
          subheading: 'Limited stock. Once sold out, they do not restock.',
          columnsMobile: 2,
          columnsDesktop: 4,
          showBadges: true,
          showQuickAdd: true,
        },
      },
      {
        type: 'category_strip',
        title: 'Curated Collections',
        defaultData: {
          heading: 'Shop by Collection',
          categories: [
            { id: 'cat-1', name: 'Oversized Tees', icon: 'Shirt', count: 18 },
            { id: 'cat-2', name: 'Vintage Denim', icon: 'Scissors', count: 12 },
            { id: 'cat-3', name: 'Heavyweight Fleece', icon: 'Flame', count: 9 },
            { id: 'cat-4', name: 'Caps & Accessories', icon: 'Glasses', count: 14 },
          ],
        },
      },
      {
        type: 'trust_badges',
        title: 'Buyer Guarantees',
        defaultData: {
          badges: [
            { icon: 'Truck', title: 'Nationwide Delivery', desc: 'Dispatched via TCS & Trax in 2-4 days' },
            { icon: 'RotateCcw', title: '7-Day Easy Exchange', desc: 'Hassle-free size and defect exchanges' },
            { icon: 'ShieldCheck', title: '100% Authentic Quality', desc: 'Hand-inspected before dispatch' },
            { icon: 'MessageCircle', title: 'Live WhatsApp Support', desc: 'Direct merchant assistance' },
          ],
        },
      },
    ],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Quiet luxury, generous whitespace & restrained elegance',
    description: 'Clean typography and understated visual hierarchy designed for lifestyle, skincare, and refined boutiques.',
    primaryColor: '#171717',
    accentColor: '#52525b',
    backgroundColor: '#ffffff',
    surfaceColor: '#fafafa',
    fontHeading: 'Inter, sans-serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    borderRadius: 'rounded-xl',
    buttonStyle: 'sharp',
    spacingDensity: 'relaxed',
    headerStyle: 'minimal',
    badge: 'Clean',
    homeSections: [
      {
        type: 'hero_banner',
        title: 'Hero Banner',
        defaultData: {
          badgeText: 'STUDIO COLLECTION',
          heading: 'Thoughtfully Crafted Everyday Essentials',
          subheading: 'Minimalist forms, premium materials, and sustainable small-batch production.',
          primaryBtnText: 'View Lookbook',
          primaryBtnLink: '#products',
          secondaryBtnText: 'Our Philosophy',
          secondaryBtnLink: '#about',
          bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop',
          overlayDarkness: 30,
          alignment: 'left',
        },
      },
      {
        type: 'category_strip',
        title: 'Curated Categories',
        defaultData: {
          heading: 'Collections',
          categories: [
            { id: 'cat-1', name: 'Apparel', icon: 'Shirt', count: 24 },
            { id: 'cat-2', name: 'Objects', icon: 'Scissors', count: 16 },
            { id: 'cat-3', name: 'Footwear', icon: 'Flame', count: 8 },
            { id: 'cat-4', name: 'Accessories', icon: 'Glasses', count: 12 },
          ],
        },
      },
      {
        type: 'product_grid',
        title: 'Selected Pieces',
        defaultData: {
          heading: 'Selected Works',
          subheading: 'Edition of 50 pieces each.',
          columnsMobile: 1,
          columnsDesktop: 4,
          showBadges: false,
          showQuickAdd: true,
        },
      },
      {
        type: 'trust_badges',
        title: 'Service Commitments',
        defaultData: {
          badges: [
            { icon: 'Truck', title: 'Carbon Neutral Delivery', desc: 'Complimentary on orders above ₨ 3,000' },
            { icon: 'ShieldCheck', title: 'Quality Guarantee', desc: 'Crafted with premium durable textiles' },
            { icon: 'RotateCcw', title: 'Seamless Returns', desc: '14-day return window' },
            { icon: 'MessageCircle', title: 'Direct Concierge', desc: 'WhatsApp support 7 days a week' },
          ],
        },
      },
    ],
  },
  {
    id: 'editorial',
    name: 'Editorial',
    tagline: 'High-fashion magazine aesthetic with rich storytelling',
    description: 'Serif headlines, full-bleed imagery, and founder narratives integrated directly into the shopping journey.',
    primaryColor: '#09090b',
    accentColor: '#c2410c',
    backgroundColor: '#ffffff',
    surfaceColor: '#f8fafc',
    fontHeading: 'Cinzel, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    borderRadius: 'rounded-none',
    buttonStyle: 'sharp',
    spacingDensity: 'relaxed',
    headerStyle: 'editorial',
    badge: 'Luxury',
    homeSections: [
      {
        type: 'hero_banner',
        title: 'Editorial Showcase',
        defaultData: {
          badgeText: 'AUTUMN / WINTER 2026',
          heading: 'The Art of Archival Dressing',
          subheading: 'A curated dialogue between 90s subcultures and bespoke tailoring.',
          primaryBtnText: 'Explore Lookbook',
          primaryBtnLink: '#products',
          secondaryBtnText: 'Read The Journal',
          secondaryBtnLink: '#story',
          bgImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop',
          overlayDarkness: 45,
          alignment: 'center',
        },
      },
      {
        type: 'about_story',
        title: 'Founder Narrative',
        defaultData: {
          badge: 'OUR HERITAGE',
          heading: 'Preserving Rare Fashion Archives',
          paragraphs: [
            'Denzen was founded on a singular conviction: genuine garments carry stories that fast-fashion can never replicate.',
            'Every item in our collection is hand-sourced from private archives across Tokyo, Milan, and London.',
          ],
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
        },
      },
      {
        type: 'product_grid',
        title: 'Curated Drops',
        defaultData: {
          heading: 'Archival Catalog',
          subheading: 'Individually authenticated pieces.',
          columnsMobile: 2,
          columnsDesktop: 4,
          showBadges: true,
          showQuickAdd: true,
        },
      },
      {
        type: 'category_strip',
        title: 'Curated Categories',
        defaultData: {
          heading: 'Browse by Archive',
          categories: [
            { id: 'cat-1', name: 'Vintage Outerwear', icon: 'Shirt', count: 14 },
            { id: 'cat-2', name: 'Selvedge Denim', icon: 'Scissors', count: 9 },
            { id: 'cat-3', name: 'Heavy Fleece', icon: 'Flame', count: 11 },
            { id: 'cat-4', name: 'Leather Goods', icon: 'Glasses', count: 6 },
          ],
        },
      },
      {
        type: 'trust_badges',
        title: 'White Glove Guarantees',
        defaultData: {
          badges: [
            { icon: 'ShieldCheck', title: '100% Authenticated', desc: 'Multi-point verification inspection' },
            { icon: 'Truck', title: 'Priority Dispatch', desc: 'TCS Express delivery within 48h' },
            { icon: 'RotateCcw', title: 'Concierge Exchange', desc: 'Complimentary size exchange' },
            { icon: 'MessageCircle', title: 'Stylist WhatsApp', desc: 'Direct merchant consulting' },
          ],
        },
      },
    ],
  },
  {
    id: 'commerce',
    name: 'Commerce',
    tagline: 'High-conversion retail powerhouse with instant discovery',
    description: 'Category navigation above the fold, strong buyer assurances, and dense product grids optimized for mobile sales.',
    primaryColor: '#0f172a',
    accentColor: '#059669',
    backgroundColor: '#ffffff',
    surfaceColor: '#f1f5f9',
    fontHeading: 'Cabinet Grotesk, sans-serif',
    fontBody: 'Inter, sans-serif',
    borderRadius: 'rounded-2xl',
    buttonStyle: 'pill',
    spacingDensity: 'compact',
    headerStyle: 'standard',
    badge: 'High Conversion',
    homeSections: [
      {
        type: 'category_strip',
        title: 'Quick Category Navigation',
        defaultData: {
          heading: 'Popular Collections',
          categories: [
            { id: 'cat-1', name: 'Oversized Tees', icon: 'Shirt', count: 28 },
            { id: 'cat-2', name: 'Vintage Denim', icon: 'Scissors', count: 19 },
            { id: 'cat-3', name: 'Hoodies & Fleece', icon: 'Flame', count: 14 },
            { id: 'cat-4', name: 'Accessories', icon: 'Glasses', count: 22 },
          ],
        },
      },
      {
        type: 'hero_banner',
        title: 'Promotional Banner',
        defaultData: {
          badgeText: 'FLASH SALE LIVE',
          heading: 'Extra 10% Off All Pre-Loved Drops',
          subheading: 'Use code DENZEN10 at checkout. Cash on Delivery supported nationwide.',
          primaryBtnText: 'Shop Sale Drops',
          primaryBtnLink: '#products',
          secondaryBtnText: 'View All',
          secondaryBtnLink: '#categories',
          bgImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1400&auto=format&fit=crop',
          overlayDarkness: 40,
          alignment: 'center',
        },
      },
      {
        type: 'product_grid',
        title: 'Catalog Bestsellers',
        defaultData: {
          heading: 'Bestselling Drops',
          subheading: 'Over 4,800 happy customers across Pakistan.',
          columnsMobile: 2,
          columnsDesktop: 4,
          showBadges: true,
          showQuickAdd: true,
        },
      },
      {
        type: 'trust_badges',
        title: 'Buyer Guarantees',
        defaultData: {
          badges: [
            { icon: 'Truck', title: 'Nationwide COD', desc: 'Pay Cash on Delivery at your doorstep' },
            { icon: 'RotateCcw', title: '7-Day Easy Exchange', desc: 'Hassle-free size replacement' },
            { icon: 'ShieldCheck', title: 'Hand-Checked Quality', desc: '100% verified before courier dispatch' },
            { icon: 'MessageCircle', title: '1-Tap WhatsApp Order', desc: 'Instant support on +92 300 1234567' },
          ],
        },
      },
      {
        type: 'faq_accordion',
        title: 'Shopping FAQ',
        defaultData: {
          heading: 'Got Questions? We Have Answers.',
          faqs: [
            {
              q: 'How long does delivery take in Pakistan?',
              a: 'Standard courier delivery via TCS/Trax takes 2 to 4 business days for major cities (Karachi, Lahore, Islamabad, Rawalpindi).',
            },
            {
              q: 'Can I pay Cash on Delivery (COD)?',
              a: 'Yes! Cash on Delivery is supported across all cities and towns in Pakistan.',
            },
            {
              q: 'What if I need a size exchange?',
              a: 'Simply message our WhatsApp support within 7 days and we will immediately process an exchange.',
            },
          ],
        },
      },
    ],
  },
]

export const FONT_PAIRINGS = [
  {
    id: 'editorial',
    name: 'Editorial Serif & Clean Sans',
    heading: 'Cinzel, serif',
    body: 'Plus Jakarta Sans, sans-serif',
  },
  {
    id: 'modern_grotesk',
    name: 'Bold Grotesk & Inter',
    heading: 'Cabinet Grotesk, sans-serif',
    body: 'Inter, sans-serif',
  },
  {
    id: 'warm_heritage',
    name: 'Warm Heritage & DM Sans',
    heading: 'Fraunces, serif',
    body: 'DM Sans, sans-serif',
  },
  {
    id: 'tech_modern',
    name: 'Space Grotesk & Clean Sans',
    heading: 'Space Grotesk, sans-serif',
    body: 'Plus Jakarta Sans, sans-serif',
  },
]

export const COLOR_PALETTES = [
  { id: 'onyx', name: 'Deep Onyx', primary: '#18181b', accent: '#6366f1' },
  { id: 'indigo', name: 'Electric Indigo', primary: '#4f46e5', accent: '#06b6d4' },
  { id: 'emerald', name: 'Forest Emerald', primary: '#059669', accent: '#10b981' },
  { id: 'terracotta', name: 'Warm Terracotta', primary: '#9a3412', accent: '#f59e0b' },
  { id: 'navy', name: 'Royal Navy', primary: '#0f172a', accent: '#3b82f6' },
]

export const SECTION_TEMPLATES = [
  {
    type: 'hero_banner',
    title: 'Hero Billboard',
    desc: 'High-impact full width banner with headline, badges, and primary action buttons.',
    icon: 'Sparkles',
    defaultData: {
      badgeText: 'NEW DROP 2026',
      heading: 'Timeless Vintage & Heavyweight Essentials',
      subheading: 'Hand-picked pre-loved streetwear, oversized fleece hoodies, and Japanese denim.',
      primaryBtnText: 'Shop Collection',
      primaryBtnLink: '#products',
      secondaryBtnText: 'Explore Categories',
      secondaryBtnLink: '#categories',
      bgImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400&auto=format&fit=crop',
      overlayDarkness: 40,
      alignment: 'center',
    },
  },
  {
    type: 'product_grid',
    title: 'Product Catalog Grid',
    desc: 'Display trending items with live pricing, stock badges, and 1-tap quick add.',
    icon: 'ShoppingBag',
    defaultData: {
      heading: 'Trending Drops',
      subheading: 'Limited stock. Once sold out, they do not restock.',
      columnsMobile: 2,
      columnsDesktop: 4,
      showBadges: true,
      showQuickAdd: true,
    },
  },
  {
    type: 'category_strip',
    title: 'Curated Collections',
    desc: 'Horizontal category pills or visual cards highlighting specific product lines.',
    icon: 'Layers',
    defaultData: {
      heading: 'Shop by Collection',
      categories: [
        { id: 'cat-1', name: 'Oversized Tees', icon: 'Shirt', count: 18 },
        { id: 'cat-2', name: 'Vintage Denim', icon: 'Scissors', count: 12 },
        { id: 'cat-3', name: 'Heavyweight Fleece', icon: 'Flame', count: 9 },
        { id: 'cat-4', name: 'Caps & Accessories', icon: 'Glasses', count: 14 },
      ],
    },
  },
  {
    type: 'trust_badges',
    title: 'Buyer Guarantees',
    desc: 'Increase conversion with Nationwide COD, 7-Day Exchange, and WhatsApp support badges.',
    icon: 'ShieldCheck',
    defaultData: {
      badges: [
        { icon: 'Truck', title: 'Nationwide Delivery', desc: 'Dispatched via TCS & Trax in 2-4 days' },
        { icon: 'RotateCcw', title: '7-Day Easy Exchange', desc: 'Hassle-free size and defect exchanges' },
        { icon: 'ShieldCheck', title: '100% Authentic Quality', desc: 'Hand-inspected before dispatch' },
        { icon: 'MessageCircle', title: 'Live WhatsApp Support', desc: 'Direct merchant assistance' },
      ],
    },
  },
  {
    type: 'about_story',
    title: 'Founder Story & Mission',
    desc: 'Narrative storytelling with cover photo and brand values to build customer trust.',
    icon: 'BookOpen',
    defaultData: {
      badge: 'OUR STORY',
      heading: 'Curating Rare Vintage Since 2022',
      paragraphs: [
        'Denzen Thrift began as an Instagram archive of rare 90s band tees, Japanese selvedge denim, and authentic vintage sportswear.',
        'We believe great fashion should not contribute to fast-fashion waste. Every single piece in our vault is individually thrifted, authenticated, washed, and steamed before being listed.',
      ],
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
    },
  },
  {
    type: 'contact_channels',
    title: 'Direct Support Desk',
    desc: '1-Tap WhatsApp support banner, customer service email, and studio dispatch location.',
    icon: 'MessageCircle',
    defaultData: {
      whatsapp: '+92 300 1234567',
      whatsappHours: 'Daily 10:00 AM – 10:00 PM',
      instagram: '@denzen.thrift',
      email: 'hello@denzenthrift.shop',
      locationCity: 'Gulberg III, Lahore, Pakistan',
    },
  },
  {
    type: 'faq_accordion',
    title: 'FAQ Accordion',
    desc: 'Collapsible questions & answers for shipping times, COD, and exchange policies.',
    icon: 'HelpCircle',
    defaultData: {
      heading: 'Got Questions? We Have Answers.',
      faqs: [
        {
          q: 'How long does nationwide shipping take?',
          a: 'Standard delivery via TCS/Trax takes 2 to 4 business days for major cities (Karachi, Lahore, Islamabad, Rawalpindi) and 3 to 5 days for other regions.',
        },
        {
          q: 'Do you offer Cash on Delivery (COD)?',
          a: 'Yes! We support Cash on Delivery across all cities in Pakistan. Advance bank transfer is also accepted for instant dispatch.',
        },
        {
          q: 'How do size exchanges work?',
          a: 'If a garment doesn’t fit, simply WhatsApp us within 7 days of receiving your parcel. We will arrange a courier pickup for replacement.',
        },
      ],
    },
  },
  {
    type: 'order_tracking',
    title: 'Live Order Tracker',
    desc: 'Interactive tracker simulating live courier fulfillment status.',
    icon: 'Truck',
    defaultData: {
      heading: 'Track Your Parcel',
      subheading: 'Enter your 4-digit Order ID or Phone Number to check real-time courier status.',
    },
  },
]

export const applyLayoutToConfig = (existingConfig, layoutId) => {
  const layout = STOREFRONT_LAYOUTS.find((l) => l.id === layoutId) || STOREFRONT_LAYOUTS[0]

  // Preserve existing section customized content by section type
  const existingHomeSections = existingConfig.pages?.home?.sections || []
  const existingSectionDataByType = {}
  existingHomeSections.forEach((s) => {
    if (s.type) {
      existingSectionDataByType[s.type] = s.data || {}
    }
  })

  // Construct new home sections according to layout specification
  const newHomeSections = layout.homeSections.map((secDef, idx) => {
    const existingData = existingSectionDataByType[secDef.type] || {}
    return {
      id: `sec_${secDef.type}_${idx + 1}`,
      type: secDef.type,
      title: secDef.title,
      enabled: true,
      data: {
        ...secDef.defaultData,
        ...existingData, // Preserves custom merchant texts, images, and values
      },
    }
  })

  return {
    ...existingConfig,
    themeId: layout.id,
    theme: {
      ...existingConfig.theme,
      layoutId: layout.id,
      preset: layout.id,
      primaryColor: layout.primaryColor,
      accentColor: layout.accentColor,
      fontHeading: layout.fontHeading,
      fontBody: layout.fontBody,
      borderRadius: layout.borderRadius,
      buttonStyle: layout.buttonStyle,
      spacingDensity: layout.spacingDensity,
      headerStyle: layout.headerStyle,
    },
    pages: {
      ...existingConfig.pages,
      home: {
        ...existingConfig.pages.home,
        sections: newHomeSections,
      },
    },
  }
}

export const THEME_PRESETS = STOREFRONT_LAYOUTS

export const DEFAULT_STOREFRONT_CONFIG = {
  themeId: 'modern',
  theme: {
    layoutId: 'modern',
    preset: 'modern',
    primaryColor: '#18181b',
    accentColor: '#4f46e5',
    fontHeading: 'Space Grotesk, sans-serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    borderRadius: 'rounded-2xl',
    buttonStyle: 'pill',
    spacingDensity: 'normal',
    headerStyle: 'standard',
    storeName: 'Denzen Thrift',
    storeTagline: 'Curated vintage, streetwear & timeless oversized essentials.',
    storeHandle: 'denzen-thrift',
    logoText: 'DENZEN',
  },
  announcement: {
    enabled: true,
    text: '⚡ Free Express Shipping across Pakistan on orders above ₨ 3,000',
    link: '#products',
    bgColor: '#18181b',
    textColor: '#ffffff',
  },
  cartSettings: {
    enableFreeShippingBar: true,
    freeShippingThreshold: 3000,
    allowWhatsAppCheckout: true,
    allowNativeCOD: true,
    allowOrderNotes: true,
  },
  pages: {
    home: {
      id: 'home',
      title: 'Home',
      sections: STOREFRONT_LAYOUTS[0].homeSections.map((secDef, idx) => ({
        id: `sec_${secDef.type}_${idx + 1}`,
        type: secDef.type,
        title: secDef.title,
        enabled: true,
        data: { ...secDef.defaultData },
      })),
    },
    about: {
      id: 'about',
      title: 'About Our Brand',
      enabled: true,
      sections: [
        {
          id: 'sec_about_hero',
          type: 'about_story',
          title: 'Founder Story',
          enabled: true,
          data: {
            badge: 'OUR STORY',
            heading: 'Curating Rare Vintage Since 2022',
            paragraphs: [
              'Denzen Thrift began as an Instagram archive of rare 90s band tees, Japanese selvedge denim, and authentic vintage sportswear.',
              'We believe great fashion should not contribute to fast-fashion waste. Every single piece in our vault is individually thrifted, authenticated, washed, and steamed before being listed.',
            ],
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
          },
        },
        {
          id: 'sec_about_stats',
          type: 'about_stats',
          title: 'Store Milestones',
          enabled: true,
          data: {
            stats: [
              { label: 'Orders Shipped', value: '4,800+' },
              { label: '5-Star Customer Reviews', value: '99.4%' },
              { label: 'Cities Covered', value: '45+ in Pakistan' },
              { label: 'Vintage Vault Drops', value: '120+' },
            ],
          },
        },
      ],
    },
    contact: {
      id: 'contact',
      title: 'Contact & Support',
      enabled: true,
      sections: [
        {
          id: 'sec_contact_channels',
          type: 'contact_channels',
          title: 'Direct Channels',
          enabled: true,
          data: {
            whatsapp: '+92 300 1234567',
            whatsappHours: 'Daily 10:00 AM – 10:00 PM',
            instagram: '@denzen.thrift',
            email: 'hello@denzenthrift.shop',
            locationCity: 'Gulberg III, Lahore, Pakistan',
          },
        },
        {
          id: 'sec_contact_faq',
          type: 'faq_accordion',
          title: 'Frequently Asked Questions',
          enabled: true,
          data: {
            heading: 'Got Questions? We Have Answers.',
            faqs: [
              {
                q: 'How long does nationwide shipping take?',
                a: 'Standard delivery via TCS/Trax takes 2 to 4 business days for major cities (Karachi, Lahore, Islamabad, Rawalpindi) and 3 to 5 days for other regions.',
              },
              {
                q: 'Do you offer Cash on Delivery (COD)?',
                a: 'Yes! We support Cash on Delivery across all cities in Pakistan. Advance bank transfer is also accepted for instant dispatch.',
              },
              {
                q: 'How do size exchanges work?',
                a: 'If a garment doesn’t fit, simply WhatsApp us within 7 days of receiving your parcel. We will arrange a courier pickup for replacement.',
              },
            ],
          },
        },
      ],
    },
    tracking: {
      id: 'tracking',
      title: 'Track Order',
      enabled: true,
      sections: [
        {
          id: 'sec_tracking_widget',
          type: 'order_tracking',
          title: 'Order Status Tracker',
          enabled: true,
          data: {
            heading: 'Track Your Parcel',
            subheading: 'Enter your 4-digit Order ID or Phone Number to check real-time courier status.',
          },
        },
      ],
    },
  },
  footer: {
    bio: 'Denzen Thrift is Pakistan’s premier destination for curated vintage and timeless heavyweight streetwear.',
    instagram: '@denzen.thrift',
    whatsapp: '+923001234567',
    showPaymentBadges: true,
    copyright: '© 2026 Denzen Thrift. Powered by Stallio Commerce.',
  },
}

const STORAGE_KEY = 'stallio_storefront_builder_config'

export const getStorefrontConfig = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return { ...DEFAULT_STOREFRONT_CONFIG, ...JSON.parse(raw) }
    }
  } catch (e) {
    console.error('Failed to load storefront config from storage:', e)
  }
  return DEFAULT_STOREFRONT_CONFIG
}

export const saveStorefrontConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    return true
  } catch (e) {
    console.error('Failed to save storefront config:', e)
    return false
  }
}

export const resetStorefrontConfig = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return DEFAULT_STOREFRONT_CONFIG
  } catch (e) {
    console.error('Failed to reset config:', e)
    return DEFAULT_STOREFRONT_CONFIG
  }
}
