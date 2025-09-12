/**
 * Security utility functions for input sanitization and validation
 */

// URL sanitization and validation
export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    
    // Only allow specific protocols
    const allowedProtocols = ['http:', 'https:'];
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
    
    // Return the sanitized URL
    return parsedUrl.toString();
  } catch {
    // Return a safe fallback for invalid URLs
    return '#';
  }
}

// Validate and sanitize external links
export function validateExternalLink(url: string): { isValid: boolean; sanitizedUrl: string } {
  try {
    const sanitized = sanitizeUrl(url);
    const isValid = sanitized !== '#';
    return { isValid, sanitizedUrl: sanitized };
  } catch {
    return { isValid: false, sanitizedUrl: '#' };
  }
}

// Sanitize HTML content (basic implementation)
export function sanitizeHtmlContent(content: string): string {
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate Instagram handle
export function validateInstagramHandle(handle: string): boolean {
  const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
  return instagramRegex.test(handle);
}

// Validate Discord invite link
export function validateDiscordInvite(invite: string): boolean {
  const discordRegex = /^https:\/\/discord\.gg\/[a-zA-Z0-9]{1,20}$/;
  return discordRegex.test(invite);
}

// Rate limiting helper (for future API integrations)
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
}

// CSP violation reporting helper
export function reportCSPViolation(violation: SecurityPolicyViolationEvent): void {
  // In production, send this to your monitoring service
  console.warn('CSP Violation:', {
    blockedURI: violation.blockedURI,
    violatedDirective: violation.violatedDirective,
    originalPolicy: violation.originalPolicy,
    sourceFile: violation.sourceFile,
    lineNumber: violation.lineNumber,
    columnNumber: violation.columnNumber
  });
}

// Initialize CSP violation reporting
export function initializeSecurityMonitoring(): void {
  if (typeof window !== 'undefined') {
    window.addEventListener('securitypolicyviolation', reportCSPViolation);
  }
}

// Error boundary security helper
export function sanitizeErrorMessage(error: Error): string {
  // Remove potentially sensitive information from error messages
  const sensitivePatterns = [
    /\/[A-Za-z]:[\\\/]/g, // Windows file paths
    /\/[^\/\s]+\/[^\/\s]+\//g, // Unix file paths
    /localhost:\d+/g, // Local URLs
    /127\.0\.0\.1:\d+/g, // Local IPs
    /api[_\-]?key/gi, // API keys
    /token/gi // Tokens
  ];
  
  let sanitized = error.message;
  sensitivePatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[REDACTED]');
  });
  
  return sanitized;
}