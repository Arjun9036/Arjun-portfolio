import { useRef, useEffect } from 'react'

/**
 * React hook that returns a ref to bind to any card element.
 * Tracks local cursor movement and sets --mouse-x and --mouse-y CSS variables.
 */
export function useCursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--mouse-x', `${x}px`)
      el.style.setProperty('--mouse-y', `${y}px`)
    }

    el.addEventListener('mousemove', handleMouseMove)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return ref
}
