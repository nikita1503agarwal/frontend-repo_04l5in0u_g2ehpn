import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CTA from './components/CTA'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <footer className="border-t border-white/10 py-10 text-center text-white/60">
        © {new Date().getFullYear()} Učilnica AI • Zasebna platforma za deljenje šolskih gradiv
      </footer>
    </div>
  )
}

export default App
