export interface CurrencyConversion {
  originalAmount: number;
  originalCurrency: string;
  usdAmount: number;
  exchangeRate: number;
  lastUpdated: string;
}

const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

/**
 * Fetches current exchange rates from the API
 */
async function fetchRates(): Promise<{ [key: string]: number }> {
  try {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const rates: { [key: string]: number } = {};
    
    // Convert API rates to USD rates (API returns USD to currency, we need currency to USD)
    Object.entries(data.rates).forEach(([currency, rate]) => {
      if (typeof rate === 'number' && rate > 0) {
        rates[currency] = 1 / rate;
      }
    });
    
    // USD rate is always 1
    rates['USD'] = 1;
    
    return rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    throw new Error('Unable to fetch exchange rates at this time');
  }
}

/**
 * Converts an amount from one currency to USD
 */
export async function convertToUSD(amount: number, fromCurrency: string): Promise<CurrencyConversion> {
  // No conversion needed for USD
  if (fromCurrency === 'USD') {
    return {
      originalAmount: amount,
      originalCurrency: 'USD',
      usdAmount: amount,
      exchangeRate: 1,
      lastUpdated: new Date().toISOString()
    };
  }
  
  try {
    const rates = await fetchRates();
    const rate = rates[fromCurrency];
    
    if (!rate) {
      throw new Error(`Exchange rate not available for ${fromCurrency}`);
    }
    
    const usdAmount = amount * rate;
    
    return {
      originalAmount: amount,
      originalCurrency: fromCurrency,
      usdAmount: Math.round(usdAmount * 100) / 100,
      exchangeRate: rate,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Currency conversion failed:', error);
    
    // Fallback: return original amount as USD
    return {
      originalAmount: amount,
      originalCurrency: fromCurrency,
      usdAmount: amount,
      exchangeRate: 1,
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Formats a currency amount with proper symbol
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbols: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'CHF': 'CHF',
    'CNY': '¥',
    'SAR': 'SAR',
    'AED': 'AED',
    'EGP': 'EGP'
  };
  
  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toFixed(2)}`;
} 