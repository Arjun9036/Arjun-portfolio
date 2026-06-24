import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Work',       href: '#selected-work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume',     href: '#resume' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')

  // Darken nav glass on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={styles.navWrapper} id="top">
      <nav className={`${styles.navInner} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#top" className={styles.navLogo} onClick={(e) => handleNavClick(e, '#top')}>
          <div className={styles.navLogoBadge}>AG.sys</div>
          <span className={styles.navName}>Arjun Goyal</span>
        </a>
        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace('#', '')
            const isActive = activeId === sectionId
            return (
              <li key={label}>
                <a
                  href={href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
