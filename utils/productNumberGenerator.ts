/**
 * Product Number Generation Utilities
 */

// Generate a sequential product number for a store
// Format: [Store Number][Sequential ID]
// Example: Store 001 → 1001, 1002, 1003...
//          Store 002 → 2001, 2002, 2003...

export function generateProductNumber(storeId: string, lastProductNumber?: string): string {
  // Extract store number from store_id (e.g., store_001 → 1)
  const storeNumber = parseInt(storeId.replace('store_', ''), 10);
  
  if (!lastProductNumber) {
    // First product for this store
    return `${storeNumber}001`;
  }
  
  // Increment the last product number
  const currentNumber = parseInt(lastProductNumber, 10);
  const nextNumber = currentNumber + 1;
  
  return nextNumber.toString();
}

// Validate product number format
export function validateProductNumber(productNumber: string): boolean {
  // Product numbers should be 4-6 digits
  return /^\d{4,6}$/.test(productNumber);
}

// Extract store ID from product number
export function extractStoreIdFromProductNumber(productNumber: string): string | null {
  if (!validateProductNumber(productNumber)) {
    return null;
  }
  
  // First digit(s) represent the store
  const storeNumber = productNumber.charAt(0);
  return `store_${storeNumber.padStart(3, '0')}`;
}

// Get next available product number for a store
export function getNextProductNumber(storeId: string, existingNumbers: string[]): string {
  if (existingNumbers.length === 0) {
    return generateProductNumber(storeId);
  }
  
  // Sort numbers and get the highest
  const sortedNumbers = existingNumbers
    .map(n => parseInt(n, 10))
    .sort((a, b) => b - a);
  
  const highestNumber = sortedNumbers[0].toString();
  return generateProductNumber(storeId, highestNumber);
}

