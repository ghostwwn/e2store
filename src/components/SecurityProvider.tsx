import React, { useEffect } from 'react';
import { initializeSecurityMonitoring } from '@/lib/security';

interface SecurityProviderProps {
  children: React.ReactNode;
}

/**
 * Security provider that initializes security monitoring and reporting
 */
export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize CSP violation reporting and other security monitoring
    initializeSecurityMonitoring();
    
    // Add global error handler for unhandled errors
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString()
      });
    };
    
    // Add global unhandled promise rejection handler
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        timestamp: new Date().toISOString()
      });
    };
    
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  
  return <>{children}</>;
};