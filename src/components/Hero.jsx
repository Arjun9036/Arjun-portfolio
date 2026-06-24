import { useState, useEffect, useRef } from 'react'
import styles from './Hero.module.css'

const INITIAL_HISTORY = [
  { type: 'input', text: 'whoami' },
  { type: 'output', text: 'arjungoyal (AI/ML Engineer & Software Engineer)' },
  { type: 'input', text: 'cat welcome.txt' },
  { type: 'output', text: 'Welcome to arjun.sys. Click buttons below or type commands directly to query the system.' }
]

const COMMAND_OUTPUTS = {
  help: `Available commands:
  cat about.md      - Display core developer profile
  node skills.js    - Run skill matrix analysis
  npm run projects  - List key active projects
  clear             - Flush terminal buffer`,
  
  'cat about.md': `# Profile: Arjun Goyal
----------------------------------------------
Role:       AI/ML Engineer & Full-Stack Developer
Education:  B.Tech CSE @ VIT (CGPA: 8.57)
Location:   Lucknow, India (Open to SWE / AI roles)
Motto:      Building product-grade intelligent systems.`,
  
  'node skills.js': `[Skills Analyzer] Running...
==============================================
AI/ML     :: PyTorch, TensorFlow, Keras, OpenCV, NLP, DQN
Fullstack :: React, FastAPI, Django, Laravel, REST APIs
Data/Ops  :: SQL, Pandas, NumPy, Git, MLOps, CI/CD`,
  
  'npm run projects': `> arjun-sys@2026:projects
> Parsing projects database...

- [01] Cognitive Compliance Platform (NLP, FastAPI, React)
- [02] AI Co-director (CrewAI, Multimodal Emotion Engine)
- [03] Abnormal Activity Detection (CNN + RNN, OpenCV)
- [04] Warehouse Robo - Path Planning (Deep Reinforcement Learning) [Featured]`
}

export default function Hero() {
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [inputValue, setInputValue] = useState('')
  const [isTypingAuto, setIsTypingAuto] = useState(false)
  const terminalBodyRef = useRef(null)
  const inputRef = useRef(null)

  // Auto scroll terminal to bottom on update
  useEffect(() => {
    const body = terminalBodyRef.current
    if (body) {
      body.scrollTop = body.scrollHeight
    }
  }, [history])

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase()
    
    if (trimmed === '') {
      setHistory(prev => [...prev, { type: 'input', text: cmdText }])
      return
    }

    if (trimmed === 'clear') {
      setHistory([])
      return
    }

    const output = COMMAND_OUTPUTS[trimmed] || `Unknown command: "${trimmed}". Type "help" for a list of commands.`
    
    setHistory(prev => [
      ...prev,
      { type: 'input', text: cmdText },
      { type: 'output', text: output }
    ])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue)
      setInputValue('')
    }
  }

  // Simulates keyboard typing effect when clicking shortcut buttons
  const triggerAutoType = (cmdText) => {
    if (isTypingAuto) return
    setIsTypingAuto(true)
    setInputValue('')
    
    let currentIdx = 0
    const interval = setInterval(() => {
      if (currentIdx < cmdText.length) {
        setInputValue(prev => prev + cmdText[currentIdx])
        currentIdx++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          executeCommand(cmdText)
          setInputValue('')
          setIsTypingAuto(false)
        }, 250)
      }
    }, 45)
  }

  const focusInput = () => {
    if (!isTypingAuto) {
      inputRef.current?.focus()
    }
  }

  return (
    <section className={styles.heroSection} id="hero">
      {/* Left Column: Heading and Introduction */}
      <div className={styles.heroLeft}>
        <div className={styles.heroPill}>
          <span className={styles.pulsingDot}></span>
          AI/ML Engineer · Software Engineer
        </div>
        <p className={styles.heroYear}>PORTFOLIO / 2026</p>
        <h1 className={styles.heroHeading}>
          Building intelligent systems with product-grade software craft.
        </h1>
        <p className={styles.heroDescription}>
          I'm Arjun Goyal, a CS Engineering student at VIT Chennai with hands-on experience in AI/ML systems, full-stack development, and data pipelines — focused on shipping intelligent, user-facing products.
        </p>
        <div className={styles.heroCtas}>
          <a
            href="https://www.linkedin.com/in/arjun-goyal-0276241ab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            id="hero-linkedin-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            Connect on LinkedIn
          </a>
          <a
            href="#selected-work"
            className="btn btn-secondary"
            id="hero-work-btn"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#selected-work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View selected work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Right Column: Interactive Developer Terminal */}
      <div className={styles.heroRight}>
        <div className={styles.terminalWrapper} onClick={focusInput}>
          {/* Header Bar */}
          <div className={styles.terminalHeader}>
            <div className={styles.windowDots}>
              <span className={`${styles.dot} ${styles.dotRed}`}></span>
              <span className={`${styles.dot} ${styles.dotYellow}`}></span>
              <span className={`${styles.dot} ${styles.dotGreen}`}></span>
            </div>
            <span className={styles.terminalTitle}>terminal@arjun-sys: ~</span>
            <div className={styles.terminalSize}>640x360</div>
          </div>
          
          {/* Output History Screen */}
          <div className={styles.terminalBody} ref={terminalBodyRef}>
            {history.map((line, idx) => (
              <div key={idx} className={styles.historyLine}>
                {line.type === 'input' ? (
                  <div className={styles.inputLine}>
                    <span className={styles.prompt}>guest@arjungoyal.dev:~$</span>
                    <span className={styles.commandText}> {line.text}</span>
                  </div>
                ) : (
                  <pre className={styles.outputText}>{line.text}</pre>
                )}
              </div>
            ))}
            
            {/* Live Typing Line */}
            <div className={styles.inputArea}>
              <span className={styles.prompt}>guest@arjungoyal.dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                className={styles.terminalInput}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTypingAuto}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
              <span className={styles.cursor}></span>
            </div>
          </div>

          {/* Quick Actions Shortcuts Panel */}
          <div className={styles.quickActions}>
            <span className={styles.actionLabel}>QUICK RUN:</span>
            <div className={styles.actionButtons}>
              <button 
                className={styles.actionBtn} 
                onClick={() => triggerAutoType('cat about.md')}
                disabled={isTypingAuto}
              >
                cat about.md
              </button>
              <button 
                className={styles.actionBtn} 
                onClick={() => triggerAutoType('node skills.js')}
                disabled={isTypingAuto}
              >
                node skills.js
              </button>
              <button 
                className={styles.actionBtn} 
                onClick={() => triggerAutoType('npm run projects')}
                disabled={isTypingAuto}
              >
                npm run projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
