import { motion } from 'framer-motion'
import { Lock, Users, FileText, Image as ImageIcon, FileDown, Wand2 } from 'lucide-react'

const Feature = ({ icon: Icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10"
  >
    <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/10 p-3 text-white">
      <Icon size={20} />
    </div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-white/70">{desc}</p>
  </motion.div>
)

export default function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Zakaj Učilnica AI?</h2>
        <p className="mt-2 max-w-2xl text-white/70">Platforma za dijake in študente, ki daje prednost zasebnosti, urejenosti in hitrosti.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Feature icon={Lock} title="Zasebni razredi" desc="Vsa gradiva so vidna le članom razreda s kodo za pridružitev." />
        <Feature icon={Users} title="Ustvari in povabi" desc="Ustvari razred in deli kodo za enostavno pridružitev sošolcev." />
        <Feature icon={FileText} title="Več tipov gradiv" desc="Zapisi, testi, PDF-ji, Word in PowerPoint – vse na enem mestu." />
        <Feature icon={Wand2} title="AI testi" desc="Iz naloženih gradiv samodejno generiraj vprašanja in kvize." />
        <Feature icon={ImageIcon} title="Predogled in prenos" desc="Predogled slik in dokumentov ter varen prenos datotek." />
        <Feature icon={FileDown} title="Baza šol" desc="Vgrajena baza vseh slovenskih šol za natančno razvrščanje." />
      </div>
    </section>
  )
}
