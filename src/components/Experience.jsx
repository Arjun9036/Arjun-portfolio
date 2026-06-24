import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCursorGlow } from '../hooks/useCursorGlow'
import styles from './Experience.module.css'

function ExpCard({ title, company, date, bullets, badges }) {
  const cardRef = useCursorGlow()

  return (
    <div className={`glow-card ${styles.expCard}`} data-animate ref={cardRef}>
      <div className={styles.expCardHeader}>
        <div>
          <h3 className={styles.expTitle}>{title}</h3>
          <p className={styles.expCompany}>{company}</p>
        </div>
        <span className={styles.expDate}>{date}</span>
      </div>
      <ul className={styles.expList}>
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className={styles.expBadges}>
        {badges.map(b => (
          <span key={b} className={styles.badge}>{b}</span>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef(null)
  useScrollAnimation(sectionRef)

  const stackRef = useCursorGlow()
  const certRef = useCursorGlow()

  return (
    <section className={styles.expSection} id="experience" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>EXPERIENCE</div>
        <h2 className={styles.sectionHeading}>
          Real-world engineering across AI, data, and full-stack.
        </h2>
      </div>
      <div className={styles.expGrid}>
        
        {/* Left Column: Internship Timeline */}
        <div className={styles.expLeft}>
          <div className={styles.timelineContainer}>
            <div className={styles.timelineRail}></div>
            
            <div className={styles.timelineItem}>
              <div className={styles.timelineNode}>
                <div className={styles.pulsingCore}></div>
              </div>
              <ExpCard 
                title="Software Intern"
                company="Betalectic IT Projects Pvt Ltd"
                date="May 2024 – Jul 2024"
                bullets={[
                  "Designed and deployed UIs using ReactJS and Agile methodologies for user-centric solutions with rapid iteration.",
                  "Built and optimized analytics features with Laravel and RESTful APIs; enhanced scalability via performance refactoring and CI/CD best practices.",
                  "Improved performance of key visualization components, reducing load times by ~20%.",
                  "Gained real-world experience blending data analytics with web development through active debugging."
                ]}
                badges={['ReactJS', 'Laravel', 'REST APIs', 'CI/CD', 'Agile']}
              />
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineNode}>
                <div className={styles.pulsingCore}></div>
              </div>
              <ExpCard 
                title="Data Science Intern"
                company="Bharat Intern"
                date="Dec 2023 – Jan 2024"
                bullets={[
                  "Delivered a CNN image classifier and an SMS spam detector achieving 98% accuracy following MLOps best practices.",
                  "Applied NLP techniques — tokenization, stop-word removal, TF-IDF — with TensorFlow/Keras for data preprocessing.",
                  "Optimized models through feature engineering, hyperparameter tuning, cross-validation, and continuous evaluation."
                ]}
                badges={['TensorFlow', 'Keras', 'NLP / TF-IDF', 'CNN', 'MLOps']}
              />
            </div>

          </div>
        </div>

        {/* Right Column: Stack & Credentials */}
        <div className={styles.expRight}>
          
          {/* Core Stack Bento Card */}
          <div className={`glow-card ${styles.coreStackCard}`} data-animate ref={stackRef}>
            <div className={styles.cardHeaderArea}>
              <h3 className={styles.coreStackTitle}>Core stack</h3>
              <div className={styles.coreStackIcons}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stackIconBlue}>
                  <rect x="3" y="11" width="18" height="10" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  <circle cx="12" cy="16" r="1"/>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stackIconBlue}>
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
            </div>
            
            <div className={styles.stackCategories}>
              <div className={styles.stackCat}>
                <span className={styles.catLabel}>AI / ML</span>
                <div className={styles.catChips}>
                  <span className={styles.chip}>Python</span>
                  <span className={styles.chip}>TensorFlow</span>
                  <span className={styles.chip}>PyTorch</span>
                  <span className={styles.chip}>OpenCV</span>
                  <span className={styles.chip}>CrewAI</span>
                </div>
              </div>
              <div className={styles.stackCat}>
                <span className={styles.catLabel}>Web / Architecture</span>
                <div className={styles.catChips}>
                  <span className={styles.chip}>React</span>
                  <span className={styles.chip}>FastAPI</span>
                  <span className={styles.chip}>Django</span>
                  <span className={styles.chip}>Laravel</span>
                </div>
              </div>
              <div className={styles.stackCat}>
                <span className={styles.catLabel}>Data / Systems</span>
                <div className={styles.catChips}>
                  <span className={styles.chip}>SQL</span>
                  <span className={styles.chip}>Pandas</span>
                  <span className={styles.chip}>NumPy</span>
                  <span className={styles.chip}>Git</span>
                  <span className={styles.chip}>MLOps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Bento Card */}
          <div className={`glow-card ${styles.certCard}`} data-animate ref={certRef}>
            <h3 className={styles.certTitle}>Credentials &amp; Certs</h3>
            <ul className={styles.certList}>
              <li>
                <span className={styles.certStatusBadge}>active</span>
                <span className={styles.certName}>Microsoft Certified: Azure AI Engineer Associate</span>
              </li>
              <li>
                <span className={styles.certStatusBadge}>active</span>
                <span className={styles.certName}>Google Cybersecurity Professional</span>
              </li>
              <li>
                <span className={styles.certStatusBadge}>active</span>
                <span className={styles.certName}>AWS Academy Cloud Architecting</span>
              </li>
              <li>
                <span className={styles.certStatusBadge}>active</span>
                <span className={styles.certName}>Columbia+ Prompt Engineering &amp; OpenAI</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}
