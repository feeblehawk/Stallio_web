import { createContext, useContext, useState } from 'react'

// ─── Currency Context ─────────────────────────────────────────────────────────
const CurrencyContext = createContext({ code: 'USD', symbol: '$' })

// ─── Billing Context ──────────────────────────────────────────────────────────
const BillingContext = createContext(['monthly', () => {}])

// ─── Combined Provider ────────────────────────────────────────────────────────
export const PricingProvider = ({ children }) => {
  const [currency, setCurrency] = useState({ code: 'USD', symbol: '$' })
  const [billing, setBilling] = useState('monthly')

  return (
    <CurrencyContext.Provider value={{ ...currency, setCurrency }}>
      <BillingContext.Provider value={[billing, setBilling]}>
        {children}
      </BillingContext.Provider>
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
export const useBilling  = () => useContext(BillingContext)