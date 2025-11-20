import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(59,130,246,0.25),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            Zasebna skupnost • Slovenske šole
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Učilnica AI — zasebna platforma za deljenje in organizacijo gradiv
          </h1>
          <p className="mt-5 text-lg text-white/80">
            Ustvari razred, povabi sošolce s kodo za pridružitev in varno delite zapiske, teste, slike, PDF-je in druge dokumente. Z AI lahko iz gradiv samodejno generiraš testna vprašanja.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
            <a href="#prijava" className="rounded-xl bg-white/90 px-5 py-3 text-slate-900 backdrop-blur transition hover:bg-white">
              Začni zdaj
            </a>
            <a href="#features" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-white backdrop-blur transition hover:bg-white/10">
              Oglej si funkcionalnosti
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
