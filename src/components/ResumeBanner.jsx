import { useCursorGlow } from '../hooks/useCursorGlow'
import styles from './ResumeBanner.module.css'

export default function ResumeBanner() {
  const glowRef = useCursorGlow()

  return (
    <section className={`glow-card ${styles.resumeBanner}`} id="resume" ref={glowRef}>
      <div className={styles.resumeBannerLeft}>
        <div className={styles.sectionTag}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          RESUME
        </div>
        <h2 className={styles.resumeHeading}>Want the full background? View my resume.</h2>
        <p className={styles.resumeDesc}>
          A complete overview of my education, experience, and projects in AI/ML and software engineering.
        </p>
      </div>
      <a
        href="https://drive.google.com/file/d/1OR9EdroaCedKZGWffSTsbnNtcqOzoVTd/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        id="resume-view-btn"
      >
        View Resume
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </section>
  )
}
