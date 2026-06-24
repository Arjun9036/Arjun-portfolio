import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useCursorGlow } from '../hooks/useCursorGlow'
import styles from './SelectedWork.module.css'

const PROJECTS = [
  {
    id: 1,
    label: '01 / AI PRODUCT',
    title: 'Cognitive Compliance Platform',
    desc: 'AI-powered compliance platform that automates regulatory scanning, risk extraction, and LLM cross-verification. Uses transformer-based NER, context extraction, and Gemini LLMs for structured legal insights, with an interactive dashboard for filtering risks and exporting compliance summaries as PDF reports.',
    image: '/project1.png',
    tags: ['Python', 'Gemini LLM', 'NLP / NER', 'React', 'FastAPI'],
    gridClass: styles.cardNormal,
    liveUrl: 'https://cognitive-complaince-frontend.vercel.app/',
    gitUrl: 'https://github.com/Arjun9036/Cognitive-Complaince-Frontend',
    details: {
      metrics: 'NER Extractor Accuracy: 94.2% | Inference Latency: ~180ms',
      architecture: 'Transformer NER → Document Vector Search → Gemini LLM Validator',
      fileTree: `├── backend/
│   ├── api/
│   │   ├── scanner.py (regulatory OCR)
│   │   └── risk_extractor.py (NER model)
│   └── db/
│       └── vector_index.py
└── frontend/
    └── src/
        └── dashboard/`
    }
  },
  {
    id: 2,
    label: '02 / AGENTIC AI',
    title: 'AI Co-director',
    desc: 'Agentic AI script transformation system using CrewAI — a 3-agent pipeline (Writer → Critic → Rectifier) that converts scripts into intended genres via iterative validation. Includes a multimodal emotion intelligence engine fusing video, audio, and text to verify emotional alignment with narrative tone.',
    image: '/project2.png',
    tags: ['CrewAI', 'Multimodal AI', 'Generative AI', 'Python'],
    gridClass: styles.cardNormal,
    liveUrl: 'https://ai-co-direcctor.vercel.app/',
    gitUrl: 'https://github.com/Arjun9036/AI-co-direcctor',
    details: {
      metrics: 'Agent Validation Iterations: 3 (Auto-stop) | Emotion Fusing Frame Sync: 30fps',
      architecture: 'CrewAI Manager (Writer, Critic, Rectifier) + PyTorch Audio/Video Multimodal Alignment',
      fileTree: `├── crew/
│   ├── agents.py (Writer, Critic, Rectifier)
│   └── tasks.py
└── emotion_engine/
    ├── speech_analyzer.py
    └── video_tracker.py`
    }
  },
  {
    id: 3,
    label: '03 / DEEP LEARNING',
    title: 'Abnormal Activity Detection',
    desc: 'Deep learning pipeline for detecting abnormal human activities (burglary, abuse, arrest) from video input using a custom spatio-temporal model. CNN handles feature extraction; RNN models temporal sequences for real-time multi-class classification. Trained on UCF Crime dataset — achieved 77% multi-class accuracy with sequence-level augmentation and learning rate scheduling.',
    image: '/project3.png',
    tags: ['Python', 'CNN + RNN', 'OpenCV', 'TensorFlow', 'UCF Crime Dataset'],
    gridClass: styles.cardNormal,
    gitUrl: 'https://github.com/Arjun9036/Abnormal-Activity-Detection',
    details: {
      metrics: 'Multi-class Accuracy: 77.2% (UCF Crime) | Input Sequence window: 30 frames',
      architecture: 'Custom ResNet CNN Feature Extractor + Bidirectional LSTM Temporal Classifier',
      fileTree: `├── model/
│   ├── cnn_extractor.py
│   └── lstm_classifier.py
└── data/
    └── sequence_aug.py`
    }
  },
  {
    id: 4,
    label: '04 / FEATURED · DEEP REINFORCEMENT LEARNING',
    title: 'Warehouse Robo — Intelligent Path Planning',
    desc: 'An autonomous warehouse navigation system built with Deep Q-Networks (DQN) to optimize robot movement across a grid-based warehouse. The agent learns optimal routes through trial-and-error, minimizing travel time while avoiding obstacles, using experience replay, target networks, and epsilon-greedy exploration for stable convergence.',
    image: '/project4.png',
    tags: ['Python', 'TensorFlow / Keras', 'NumPy', 'Reinforcement Learning', 'DQN'],
    gridClass: styles.cardNormal,
    highlights: [
      'Designed a dynamic grid-based warehouse simulation environment.',
      'Trained a DQN agent to find optimal paths between storage and delivery.',
      'Improved navigation efficiency through reward-based learning.',
      'Visualized agent performance and training convergence.'
    ],
    details: {
      metrics: 'Steps to Convergence: ~4,500 | Reward Scheme: +10 Goal, -0.5 Step, -10 Obstacle',
      architecture: 'Experience Replay Buffer (N=10000) + Target Network Sync (every 50 episodes) + Epsilon decay (0.995)',
      fileTree: `├── agent/
│   ├── dqn_brain.py
│   └── replay_buffer.py
└── env/
    └── warehouse_grid.py`
    }
  }
]

function ProjectCard({ project, onOpenDrawer }) {
  const cardRef = useCursorGlow()

  return (
    <div 
      className={`glow-card ${styles.projectCard} ${project.gridClass}`}
      data-animate
      ref={cardRef}
      onClick={() => onOpenDrawer(project)}
    >
      <div className={styles.projectImageWrapper}>
        <img src={project.image} alt={project.title} className={styles.projectImage} loading="lazy" />
        <div className={styles.projectImageOverlay}>
          <span className={styles.viewDetailsBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
            inspect system
          </span>
        </div>
      </div>
      <div className={styles.projectCardContent}>
        <div className={styles.projectMeta}>
          <span className={styles.projectLabel}>{project.label}</span>
          <div className={styles.projectLinks} onClick={(e) => e.stopPropagation()}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                Live
              </a>
            )}
            {project.gitUrl && (
              <a href={project.gitUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                GitHub
              </a>
            )}
          </div>
        </div>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.desc}</p>
        
        {project.highlights && (
          <div className={styles.projectHighlights}>
            <div className={styles.highlightsLabel}>KEY HIGHLIGHTS</div>
            <div className={styles.highlightsGrid}>
              <ul className={styles.highlightsList}>
                {project.highlights.slice(0, 2).map((h, i) => <li key={i}>{h}</li>)}
              </ul>
              <ul className={styles.highlightsList}>
                {project.highlights.slice(2, 4).map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div className={styles.projectTags}>
          {project.tags.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(null)
  const sectionRef = useRef(null)
  useScrollAnimation(sectionRef)

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeProject])

  return (
    <section className={styles.workSection} id="selected-work" ref={sectionRef}>
      <div className={`${styles.sectionHeader} ${styles.workHeader}`}>
        <div className={styles.sectionHeaderLeft}>
          <div className={styles.sectionTag}>SELECTED WORK</div>
          <h2 className={styles.sectionHeading}>Projects framed for proof, not decoration.</h2>
        </div>
      </div>

      <div className={styles.workGrid}>
        {PROJECTS.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpenDrawer={setActiveProject} 
          />
        ))}
      </div>

      {/* Slide-out Technical Details Drawer */}
      {activeProject && createPortal(
        <div className={styles.drawerOverlay} onClick={() => setActiveProject(null)}>
          <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div>
                <span className={styles.drawerMeta}>{activeProject.label}</span>
                <h3 className={styles.drawerTitle}>{activeProject.title}</h3>
              </div>
              <button className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); setActiveProject(null); }} aria-label="Close drawer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.drawerBody}>
              {/* Image Banner */}
              <div className={styles.drawerImageWrapper}>
                <img src={activeProject.image} alt={activeProject.title} className={styles.drawerImage} />
              </div>

              {/* Action Buttons */}
              <div className={styles.drawerActions}>
                {activeProject.liveUrl && (
                  <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Open Live Deployment
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
                {activeProject.gitUrl && (
                  <a href={activeProject.gitUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    View Source Code
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
              </div>

              {/* Technical Description */}
              <div className={styles.drawerSection}>
                <h4 className={styles.drawerSectionHeading}>FUNCTIONAL OVERVIEW</h4>
                <p className={styles.drawerText}>{activeProject.desc}</p>
              </div>

              {/* Engine Metrics */}
              <div className={styles.drawerSection}>
                <h4 className={styles.drawerSectionHeading}>SYSTEM PERFORMANCE & SPECIFICATION</h4>
                <div className={styles.metricBlock}>
                  <p className={styles.metricText}><strong>Metrics:</strong> {activeProject.details.metrics}</p>
                  <p className={styles.metricText}><strong>Engine Pattern:</strong> {activeProject.details.architecture}</p>
                </div>
              </div>

              {/* Source Directory Mock */}
              <div className={styles.drawerSection}>
                <h4 className={styles.drawerSectionHeading}>REPOSITORY FILE STRUCTURE</h4>
                <pre className={styles.drawerCode}>
                  {activeProject.details.fileTree}
                </pre>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
