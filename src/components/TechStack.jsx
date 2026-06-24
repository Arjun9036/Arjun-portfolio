import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCursorGlow } from '../hooks/useCursorGlow'
import styles from './TechStack.module.css'

const SKILL_CATEGORIES = [
  {
    title: 'Programming & Core Tools',
    skills: ['Python', 'MySQL', 'Java', 'JavaScript', 'Git', 'Linux', 'Spark', 'Tableau', 'UI/UX'],
    color: '#3b82f6', // blue
  },
  {
    title: 'Machine Learning & Data Science',
    skills: ['TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'NLTK', 'SpaCy', 'Matplotlib', 'Seaborn', 'PyTorch'],
    color: '#a78bfa', // purple
  },
  {
    title: 'Web & API Architecture',
    skills: ['ReactJS', 'Django', 'Laravel', 'HTML', 'CSS', 'REST APIs', 'FastAPI'],
    color: '#10b981', // green
  },
  {
    title: 'AI Engineering & MLOps',
    skills: ['LLM Systems', 'OpenAI SDK', 'LangChain', 'Data Validation', 'Data Cleaning', 'Pipeline Testing', 'Model Debugging'],
    color: '#fbbf24', // yellow
  },
]

function SkillCard({ category }) {
  const cardRef = useCursorGlow()

  return (
    <div 
      className={`glow-card ${styles.skillCard}`} 
      data-animate 
      ref={cardRef}
      style={{ '--glow-color': category.color }}
    >
      <h3 className={styles.categoryTitle}>{category.title}</h3>
      <div className={styles.skillsGrid}>
        {category.skills.map((skill) => (
          <span key={skill} className={styles.skillChip}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const sectionRef = useRef(null)
  useScrollAnimation(sectionRef)

  return (
    <section className={styles.stackSection} id="tech-stack" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>TECHNICAL MATRICES</div>
        <h2 className={styles.sectionHeading}>A vetted toolbox built for enterprise-grade execution.</h2>
      </div>
      <div className={styles.stackGrid}>
        {SKILL_CATEGORIES.map((cat) => (
          <SkillCard key={cat.title} category={cat} />
        ))}
      </div>
    </section>
  )
}
