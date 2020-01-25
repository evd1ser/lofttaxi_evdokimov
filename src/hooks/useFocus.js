import { useState, useRef, useEffect } from 'react'

// Hook
function useFocus(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef()
  const [isFocus, setIsFocus] = useState()

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  const focus = () => {
    setIsFocus(true)
  }
  const unFocus = () => {
    setIsFocus(false)
  }

  useEffect(
    () => {
      savedHandler.current
        .querySelector('input')
        .addEventListener('focus', focus)
      savedHandler.current
        .querySelector('input')
        .addEventListener('blur', unFocus)

      return () => {
        savedHandler.current
          .querySelector('input')
          .removeEventListener('focus', focus)
        savedHandler.current
          .querySelector('input')
          .removeEventListener('blur', unFocus)
      }
    },
    [savedHandler] // Re-run if eventName or element changes
  )

  return [savedHandler, isFocus]
}

export default useFocus
