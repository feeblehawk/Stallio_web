import { NOTIFICATION_ITEMS } from '../data/notificationData'

const STORAGE_KEY = 'stallio_notifications_v1'
const CHANGE_EVENT = 'stallio:notifications-changed'

const cloneItems = (items) => items.map((item) => ({ ...item }))

export const getNotifications = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (error) {
    console.error('Failed to load notifications:', error)
  }

  const initialItems = cloneItems(NOTIFICATION_ITEMS)
  saveNotifications(initialItems)
  return initialItems
}

export const saveNotifications = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save notifications:', error)
  }
}

const publishChange = () => {
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export const markNotificationRead = (notificationId) => {
  const updatedItems = getNotifications().map((item) => (
    item.id === notificationId ? { ...item, unread: false } : item
  ))
  saveNotifications(updatedItems)
  publishChange()
  return updatedItems
}

export const markAllNotificationsRead = () => {
  const updatedItems = getNotifications().map((item) => ({ ...item, unread: false }))
  saveNotifications(updatedItems)
  publishChange()
  return updatedItems
}

export const deleteNotification = (notificationId) => {
  const updatedItems = getNotifications().filter((item) => item.id !== notificationId)
  saveNotifications(updatedItems)
  publishChange()
  return updatedItems
}

export const subscribeToNotifications = (listener) => {
  const handleChange = () => listener(getNotifications())
  window.addEventListener(CHANGE_EVENT, handleChange)
  window.addEventListener('storage', handleChange)

  return () => {
    window.removeEventListener(CHANGE_EVENT, handleChange)
    window.removeEventListener('storage', handleChange)
  }
}