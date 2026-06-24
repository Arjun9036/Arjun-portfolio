import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to a container ref.
 * All children with [data-animate] inside the container will
 * get the 'in-view' class added with a staggered delay when visible.
 */
export function useScrollAnimation(containerRef) {
  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    const targets = container.querySelectorAll('[data-animate]')
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target
            const siblings = Array.from(
              parent.parentElement?.querySelectorAll('[data-animate]') || [parent]
            )
            const index = siblings.indexOf(parent)
            setTimeout(() => {
              parent.classList.add('in-view')
            }, index * 80)
            observer.unobserve(parent)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [containerRef])
}

/**
 * Observe a single element ref; returns nothing — just adds 'in-view' class.
 */
export function useSingleScrollAnimation(ref, delay = 0) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('in-view'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, delay])
}
