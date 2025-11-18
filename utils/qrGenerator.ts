/**
 * QR Code Generation Utilities
 */

// Generate a unique store entrance QR code
export function generateStoreQR(storeId: string): string {
  return `CHECKY_STORE_${storeId.toUpperCase().replace('STORE_', '')}`;
}

// Generate a unique exit QR code for a transaction
export function generateExitQR(transactionId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  return `EXIT_${transactionId.toUpperCase()}_${timestamp}_CHECKY`;
}

// Validate a store QR code
export function validateStoreQR(qrCode: string): boolean {
  return /^CHECKY_STORE_\d{3}$/.test(qrCode);
}

// Validate an exit QR code
export function validateExitQR(qrCode: string): boolean {
  return /^EXIT_TXN_\d{3}_[A-Z0-9]+_CHECKY$/.test(qrCode);
}

// Extract store ID from QR code
export function extractStoreIdFromQR(qrCode: string): string | null {
  const match = qrCode.match(/^CHECKY_STORE_(\d{3})$/);
  return match ? `store_${match[1]}` : null;
}

// Extract transaction ID from exit QR code
export function extractTransactionIdFromQR(qrCode: string): string | null {
  const match = qrCode.match(/^EXIT_(TXN_\d{3})_[A-Z0-9]+_CHECKY$/);
  return match ? match[1].toLowerCase() : null;
}

