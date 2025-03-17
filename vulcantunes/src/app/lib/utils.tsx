'use client'

import { useState, useEffect } from 'react'
import type { WindowSize, ErrorType, ErrorMessageConfig } from './definitions';
import { PRODUCTS_ERROR_MESSAGES } from "@/src/app/lib/constants";

export function fetchWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export function debounce<T>(value: T, delay: number = 750): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function getErrorType(error: Error): ErrorType {
  if (!error) return 'unknown';

  const errorString = `${error.message} ${error.name}`.toLowerCase();

  const networkErrorPatterns = [
    'fetch', 'network', 'networkerror', 'aborterror',
    'timeouterror', 'failed to fetch', 'internet'
  ];
  if (networkErrorPatterns.some(pattern => errorString.includes(pattern))) {
    return 'network';
  }

  const notFoundPatterns = [
    '404', 'not found', 'resource missing', 'content unavailable'
  ];
  if (notFoundPatterns.some(pattern => errorString.includes(pattern))) {
    return 'notFound';
  }

  const serverErrorPatterns = [
    '500', '502', '503', 'server error', 'internal error',
    'service unavailable'
  ];
  if (serverErrorPatterns.some(pattern => errorString.includes(pattern))) {
    return 'serverError';
  }

  return 'unknown';
}

export function getErrorMessage(error: unknown): ErrorMessageConfig {
  const errorType = getErrorType(error as Error);
  return PRODUCTS_ERROR_MESSAGES[errorType] || PRODUCTS_ERROR_MESSAGES.unknown;
}
