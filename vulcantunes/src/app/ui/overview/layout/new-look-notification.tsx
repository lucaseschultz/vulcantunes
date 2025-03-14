'use client'

import { X } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'

export default function NewLookNotification() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="new-look">
      <div className="new-look-content">
        <div className="new-look-text">
          <h3>Welcome to our new look! 🎵</h3>
          <p>
            We've refreshed our design to serve you better, but we're still the same VulcanTunes you know and trust. Enjoy the new experience!
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="new-look-close"
          aria-label="Close notification"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  )
}
