import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  getSettings,
  saveSectionSettings,
  getCurrencySymbol,
  CURRENCIES,
  LANGUAGES,
} from '../services/settingsService'

const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => getSettings())

  const currency = settings?.store?.currency || 'PKR'
  const language = settings?.store?.language || 'en'
  const currencySymbol = getCurrencySymbol(currency)

  // Sync settings when storage changes
  useEffect(() => {
    const handleStorage = () => {
      setSettings(getSettings())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  // Format price helper
  const formatPrice = useCallback(
    (amount = 0) => {
      const num = Number(amount) || 0
      return `${currencySymbol} ${num.toLocaleString()}`
    },
    [currencySymbol]
  )

  const updateCurrency = useCallback((newCurrency) => {
    saveSectionSettings('store', { currency: newCurrency })
    setSettings(getSettings())
  }, [])

  const updateLanguage = useCallback((newLanguage) => {
    saveSectionSettings('store', { language: newLanguage })
    setSettings(getSettings())
  }, [])

  const refreshSettings = useCallback(() => {
    setSettings(getSettings())
  }, [])

  return (
    <StoreContext.Provider
      value={{
        currency,
        currencySymbol,
        language,
        formatPrice,
        updateCurrency,
        updateLanguage,
        refreshSettings,
        currencies: CURRENCIES,
        languages: LANGUAGES,
        settings,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    // Fallback if rendered outside provider
    const fallbackCurrency = 'PKR'
    const fallbackSymbol = '₨'
    return {
      currency: fallbackCurrency,
      currencySymbol: fallbackSymbol,
      language: 'en',
      formatPrice: (amt) => `${fallbackSymbol} ${(Number(amt) || 0).toLocaleString()}`,
      updateCurrency: () => {},
      updateLanguage: () => {},
      refreshSettings: () => {},
      currencies: CURRENCIES,
      languages: LANGUAGES,
      settings: getSettings(),
    }
  }
  return context
}

export default StoreContext
