/**
 * signupData.js
 * Country + currency data for the Signup flow.
 * Flag emojis use Unicode regional indicator pairs — no image dependency.
 */

export const COUNTRIES = [
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'AE', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: 'QA', flag: '🇶🇦', name: 'Qatar' },
  { code: 'KW', flag: '🇰🇼', name: 'Kuwait' },
  { code: 'BH', flag: '🇧🇭', name: 'Bahrain' },
  { code: 'OM', flag: '🇴🇲', name: 'Oman' },
  { code: 'JO', flag: '🇯🇴', name: 'Jordan' },
  { code: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: 'IN', flag: '🇮🇳', name: 'India' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya' },
]

export const CURRENCIES = [
  { code: 'PKR', name: 'Pakistani Rupee',   symbol: '₨',  country: 'PK' },
  { code: 'SAR', name: 'Saudi Riyal',        symbol: '﷼',  country: 'SA' },
  { code: 'AED', name: 'UAE Dirham',         symbol: 'د.إ', country: 'AE' },
  { code: 'QAR', name: 'Qatari Riyal',       symbol: '﷼',  country: 'QA' },
  { code: 'KWD', name: 'Kuwaiti Dinar',      symbol: 'د.ك', country: 'KW' },
  { code: 'BHD', name: 'Bahraini Dinar',     symbol: '.د.ب', country: 'BH' },
  { code: 'OMR', name: 'Omani Rial',         symbol: '﷼',  country: 'OM' },
  { code: 'JOD', name: 'Jordanian Dinar',    symbol: 'JD',  country: 'JO' },
  { code: 'EGP', name: 'Egyptian Pound',     symbol: 'E£',  country: 'EG' },
  { code: 'TRY', name: 'Turkish Lira',       symbol: '₺',  country: 'TR' },
  { code: 'GBP', name: 'British Pound',      symbol: '£',  country: 'GB' },
  { code: 'USD', name: 'US Dollar',          symbol: '$',  country: 'US' },
  { code: 'EUR', name: 'Euro',               symbol: '€',  country: 'DE' },
  { code: 'CAD', name: 'Canadian Dollar',    symbol: 'CA$', country: 'CA' },
  { code: 'AUD', name: 'Australian Dollar',  symbol: 'A$',  country: 'AU' },
  { code: 'INR', name: 'Indian Rupee',       symbol: '₹',  country: 'IN' },
  { code: 'BDT', name: 'Bangladeshi Taka',   symbol: '৳',  country: 'BD' },
  { code: 'NGN', name: 'Nigerian Naira',     symbol: '₦',  country: 'NG' },
]

/** Helper: get a country's flag by its 2-letter code */
export const getFlagByCode = (code) =>
  COUNTRIES.find((c) => c.code === code)?.flag ?? '🌐'