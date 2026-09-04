/**
 * messageService.js
 * Centralized buyer chat & Quick-Replies service for Stallio Merchant App
 */

const STORAGE_KEY = 'stallio_conversations_v1'
const QUICK_REPLIES_KEY = 'stallio_quick_replies_v1'

export const INITIAL_QUICK_REPLIES = [
  'Your order has been confirmed! 🎉 We are packing it now.',
  'Please share your complete delivery address & city.',
  'Cash on delivery (COD) is available nationwide! 📦',
  'Your tracking number is: TCS-892341. Delivery in 2–3 business days.',
  'Yes! This item is in stock and ready to ship today.',
  'Thanks for reaching out! Let me know if you need any sizing help.',
]

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    customer: {
      name: 'Amna Khan',
      handle: '@amna.k',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format&q=80',
      phone: '0300-1234567',
      channel: 'whatsapp', // 'whatsapp' | 'instagram' | 'store'
    },
    orderId: 'STL-1048',
    unreadCount: 1,
    lastActivity: new Date(Date.now() - 1000 * 60 * 6).toISOString(), // 6 mins ago
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Salam! I just placed order #STL-1048 for the vintage tee and crossbody bag.',
        timestamp: '4:25 PM',
      },
      {
        id: 'm2',
        sender: 'merchant',
        text: 'Walaikum Assalam Amna! Thank you so much for your order. We have received it.',
        timestamp: '4:26 PM',
      },
      {
        id: 'm3',
        sender: 'customer',
        text: 'Can you please make sure it reaches before Friday? It is a birthday gift for my brother.',
        timestamp: '4:28 PM',
      },
    ],
  },
  {
    id: 'conv-2',
    customer: {
      name: 'Bilal Tariq',
      handle: '@bilal_tariq',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format&q=80',
      phone: '0321-9876543',
      channel: 'instagram',
    },
    orderId: 'STL-1047',
    unreadCount: 0,
    lastActivity: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    messages: [
      {
        id: 'm201',
        sender: 'customer',
        text: 'Hey bro, paid via Meezan bank transfer for the court sneakers. Sent screenshot on WhatsApp.',
        timestamp: '3:45 PM',
      },
      {
        id: 'm202',
        sender: 'merchant',
        text: 'Payment confirmed Bilal! Order #STL-1047 will be dispatched today with Trax.',
        timestamp: '3:50 PM',
      },
    ],
  },
  {
    id: 'conv-3',
    customer: {
      name: 'Zainab Ahmed',
      handle: '@zainab_style',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format&q=80',
      phone: '0333-4567890',
      channel: 'store',
    },
    orderId: 'STL-1046',
    unreadCount: 2,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    messages: [
      {
        id: 'm301',
        sender: 'customer',
        text: 'Hi! Is the raw linen kurta true to size or oversized fit?',
        timestamp: '2:10 PM',
      },
      {
        id: 'm302',
        sender: 'merchant',
        text: 'Hello Zainab! It has a relaxed silhouette, so we recommend your standard size for comfortable drape.',
        timestamp: '2:14 PM',
      },
      {
        id: 'm303',
        sender: 'customer',
        text: 'Great, just ordered 2 in Medium. Please let me know tracking once shipped!',
        timestamp: '2:15 PM',
      },
    ],
  },
  {
    id: 'conv-4',
    customer: {
      name: 'Hassan Raza',
      handle: '@hassan_r',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format&q=80',
      phone: '0301-5556677',
      channel: 'whatsapp',
    },
    orderId: 'STL-1045',
    unreadCount: 0,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    messages: [
      {
        id: 'm401',
        sender: 'customer',
        text: 'Received the heavyweight hoodie! Quality is insane, definitely ordering again.',
        timestamp: '11:30 AM',
      },
      {
        id: 'm402',
        sender: 'merchant',
        text: 'So happy to hear that Hassan! Appreciate your support. 🙏',
        timestamp: '11:45 AM',
      },
    ],
  },
]

/** Get conversations from storage */
export const getConversations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error('Failed to load conversations:', e)
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONVERSATIONS))
  } catch (e) {}
  return INITIAL_CONVERSATIONS
}

/** Save conversations */
export const saveConversations = (conversations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  } catch (e) {}
}

/** Send message */
export const sendMessage = (conversationId, text, sender = 'merchant') => {
  const conversations = getConversations()
  const conv = conversations.find((c) => c.id === conversationId)
  if (!conv) return null

  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const timeStr = `${hours % 12 || 12}:${minutes} ${ampm}`

  const newMessage = {
    id: `msg-${Date.now()}`,
    sender,
    text,
    timestamp: timeStr,
  }

  const updatedConv = {
    ...conv,
    lastActivity: now.toISOString(),
    messages: [...conv.messages, newMessage],
  }

  const updatedList = [
    updatedConv,
    ...conversations.filter((c) => c.id !== conversationId),
  ]
  saveConversations(updatedList)
  return updatedConv
}

/** Mark conversation read */
export const markAsRead = (conversationId) => {
  const conversations = getConversations()
  const updatedList = conversations.map((c) =>
    c.id === conversationId ? { ...c, unreadCount: 0 } : c
  )
  saveConversations(updatedList)
  return updatedList
}

/** Get Quick Replies */
export const getQuickReplies = () => {
  try {
    const raw = localStorage.getItem(QUICK_REPLIES_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  return INITIAL_QUICK_REPLIES
}

/** Add a new Quick Reply */
export const addQuickReply = (text) => {
  const list = getQuickReplies()
  const updated = [text, ...list]
  try {
    localStorage.setItem(QUICK_REPLIES_KEY, JSON.stringify(updated))
  } catch (e) {}
  return updated
}
