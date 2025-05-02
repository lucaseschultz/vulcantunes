'use client'

import React, {createContext, useState, useContext, ReactNode} from 'react'
import {NotificationType} from '@/src/app/lib/definitions'

const NotificationContext = createContext<NotificationType | undefined>(undefined)

export function NotificationProvider({children}: { children: ReactNode }) {
  const [showWishListNotification, setShowWishListNotification] = useState(false)

  return (
    <NotificationContext.Provider value={{showWishListNotification: showWishListNotification, setShowWishListNotification: setShowWishListNotification}}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
