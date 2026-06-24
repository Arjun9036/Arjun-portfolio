import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ResumeBanner from './components/ResumeBanner'
import FocusAreas from './components/FocusAreas'
import TechStack from './components/TechStack'
import SelectedWork from './components/SelectedWork'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import styles from './App.module.css'

export default function App() {
  return (
    <>
      {/* Background ambient light mesh system */}
      <div className="ambient-bg">
        <div className="ambient-orb-1"></div>
        <div className="ambient-orb-2"></div>
        <div className="ambient-orb-3"></div>
      </div>

      <Navbar />
      
      <div className={styles.pageContainer}>
        <Hero />
        <ResumeBanner />
        <FocusAreas />
        <TechStack />
        <SelectedWork />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
