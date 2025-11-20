import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section id="prijava" className="relative mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur md:p-12"
      >
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold text-white md:text-3xl">Pripravljeno za tvojo šolo</h3>
            <p className="mt-3 text-white/75">Prijavi se, ustvari razred in začni sodelovati v nekaj sekundah. Varnost in zasebnost sta na prvem mestu.</p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:justify-end">
            <a href="/auth" className="rounded-xl bg-blue-500 px-5 py-3 text-center text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400">Prijava</a>
            <a href="/auth#signup" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-center text-white backdrop-blur transition hover:bg-white/10">Ustvari račun</a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
