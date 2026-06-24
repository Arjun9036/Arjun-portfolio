import { useState } from 'react'
import { useCursorGlow } from '../hooks/useCursorGlow'
import styles from './Contact.module.css'

export default function Contact() {
  const glowRef = useCursorGlow()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, submitting, success

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    
    setStatus('submitting')
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'your_key_here'
    
    if (!accessKey || accessKey === 'your_key_here') {
      // Synchronous mailto fallback if key is not configured
      const mailtoUrl = `mailto:arjungoyal66796@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(
        `Sender Name: ${form.name}\nSender Email: ${form.email}\n\nMessage:\n${form.message}`
      )}`
      window.location.href = mailtoUrl
      
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`
        })
      })
      
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        console.error('Web3Forms submit error:', result)
        setStatus('error')
        
        // Fallback to mailto
        const mailtoUrl = `mailto:arjungoyal66796@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(
          `Sender Name: ${form.name}\nSender Email: ${form.email}\n\nMessage:\n${form.message}`
        )}`
        window.location.href = mailtoUrl
      }
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
      
      // Fallback to mailto
      const mailtoUrl = `mailto:arjungoyal66796@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(
        `Sender Name: ${form.name}\nSender Email: ${form.email}\n\nMessage:\n${form.message}`
      )}`
      window.location.href = mailtoUrl
    } finally {
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.contactLeft}>
        <div className={styles.sectionTag}>CONTACT CONNECTION</div>
        <h2 className={styles.contactHeading}>
          Let's build intelligent software together.
        </h2>
        <p className={styles.contactDesc}>
          I'm open to Software Engineering and AI/ML positions. Send an email to{' '}
          <a href="mailto:arjungoyal66796@gmail.com" className={styles.emailLink}>
            arjungoyal66796@gmail.com
          </a>{' '}
          or type a message in the system console.
        </p>

        <div className={styles.contactButtons}>
          <a
            href="https://www.linkedin.com/in/arjun-goyal-0276241ab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            id="contact-linkedin-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/Arjun9036"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            id="contact-github-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>

      {/* Right Column: Console Feedback Box */}
      <div className={styles.contactRight}>
        <div className={`glow-card ${styles.consoleForm}`} ref={glowRef}>
          <div className={styles.consoleHeader}>
            <span className={styles.consoleTitle}>message_compiler.sh</span>
            <div className={styles.consoleButtons}>
              <span className={styles.consoleDot}></span>
              <span className={styles.consoleDot}></span>
              <span className={styles.consoleDot}></span>
            </div>
          </div>
          <form className={styles.consoleBody} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <span className={styles.prompt}>$ export NAME=</span>
              <input
                type="text"
                name="name"
                className={styles.consoleInput}
                placeholder="&quot;your name&quot;"
                value={form.name}
                onChange={handleChange}
                required
                disabled={status === 'submitting' || status === 'success'}
              />
            </div>
            
            <div className={styles.formRow}>
              <span className={styles.prompt}>$ export EMAIL=</span>
              <input
                type="email"
                name="email"
                className={styles.consoleInput}
                placeholder="&quot;email@domain.com&quot;"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'submitting' || status === 'success'}
              />
            </div>

            <div className={styles.formRow} style={{ alignItems: 'flex-start' }}>
              <span className={styles.prompt} style={{ marginTop: '2px' }}>$ export MSG=</span>
              <textarea
                name="message"
                className={`${styles.consoleInput} ${styles.consoleTextArea}`}
                placeholder="&quot;type your message here...&quot;"
                value={form.message}
                onChange={handleChange}
                rows={3}
                required
                disabled={status === 'submitting' || status === 'success' || status === 'error'}
              />
            </div>

            <div className={styles.submitRow}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'submitting' || status === 'success' || status === 'error'}
              >
                {status === 'idle' && './compile_message.sh'}
                {status === 'submitting' && 'Compiling package...'}
                {status === 'success' && 'Package sent successfully!'}
                {status === 'error' && 'Compilation Failed!'}
              </button>
            </div>

            {status === 'submitting' && (
              <div className={styles.statusLogs}>
                <p>&gt; Connection established with mailer API...</p>
                <p>&gt; Encoding form payload in base64...</p>
                <p>&gt; Shipping network packets...</p>
              </div>
            )}

            {status === 'success' && (
              <div className={styles.statusLogsSuccess}>
                <p>&gt; Transmission complete. Exit code: 0.</p>
                <p>&gt; Thank you! I will get back to you shortly.</p>
              </div>
            )}

            {status === 'error' && (
              <div className={styles.statusLogsError}>
                <p>&gt; Transmission failed. Exit code: 1.</p>
                <p>&gt; Error: Web3Forms submission failed. Falling back to mailto...</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
