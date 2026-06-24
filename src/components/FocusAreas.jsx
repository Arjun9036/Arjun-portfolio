import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCursorGlow } from '../hooks/useCursorGlow'
import styles from './FocusAreas.module.css'

const FOCUS_CARDS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
        <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
        <circle cx="12" cy="12" r="1"/>
      </svg>
    ),
    title: 'AI/ML Engineering',
    desc: 'Building production-grade ML systems — from deep neural networks to LLM-powered agentic pipelines — using PyTorch, TensorFlow, Keras, and CrewAI.',
    badges: ['deep learning', 'NLP', 'LLM agents'],
    gridClass: styles.cardWide,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Full-Stack Development',
    desc: 'Shipping end-to-end applications with React, Django, FastAPI, and Laravel — from sleek interactive interfaces to optimized database queries.',
    badges: ['react', 'FastAPI', 'REST APIs'],
    gridClass: styles.cardNormal,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Data Systems & Analytics',
    desc: 'Processing datasets and orchestrating reliable pipelines with Pandas, NumPy, Spark, SQL, and Tableau — incorporating MLOps principles.',
    badges: ['pipelines', 'SQL', 'MLOps'],
    gridClass: styles.cardNormal,
  },
]

function FocusCard({ card }) {
  const cardRef = useCursorGlow()

  return (
    <div 
      className={`glow-card ${styles.focusCard} ${card.gridClass}`} 
      data-animate 
      ref={cardRef}
    >
      <div className={styles.focusCardHeader}>
        <div className={styles.focusCardIcon}>{card.icon}</div>
        <h3 className={styles.focusCardTitle}>{card.title}</h3>
      </div>
      <p className={styles.focusCardDesc}>{card.desc}</p>
      <div className={styles.focusBadges}>
        {card.badges.map((b, i) => (
          <span key={b} className={styles.badgeWrapper}>
            <span className={styles.badge}>{b}</span>
            {i < card.badges.length - 1 && <span className={styles.badgeDot}>·</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function FocusAreas() {
  const sectionRef = useRef(null)
  useScrollAnimation(sectionRef)

  return (
    <section className={styles.focusSection} id="focus" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>FOCUS AREAS</div>
        <h2 className={styles.sectionHeading}>Where AI systems meet production software.</h2>
      </div>
      <div className={styles.focusGrid}>
        {FOCUS_CARDS.map((card) => (
          <FocusCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  )
}
