import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [schools, setSchools] = useState([])
  const [loadingSchools, setLoadingSchools] = useState(true)
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    school_id: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoadingSchools(true)
        const res = await fetch(`${BASE_URL}/schools`)
        if (!res.ok) throw new Error('Napaka pri pridobivanju šol')
        const data = await res.json()
        const items = data.items || []
        setSchools(items)
        if (items.length > 0) {
          setForm(prev => ({ ...prev, school_id: items[0].id }))
        }
      } catch (e) {
        setError(e.message || 'Napaka omrežja')
      } finally {
        setLoadingSchools(false)
      }
    }
    fetchSchools()
  }, [])

  const title = useMemo(() => (mode === 'login' ? 'Prijava' : 'Ustvari račun'), [mode])
  const description = useMemo(
    () =>
      mode === 'login'
        ? 'Dobrodošel nazaj v Učilnici AI.'
        : 'Ustvari račun, izberi šolo in začni.'
    , [mode]
  )

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      if (mode === 'signup') {
        const res = await fetch(`${BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
            email: form.email || `${form.username}@example.com`,
            school_id: form.school_id || undefined,
          })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Registracija ni uspela')
        // Avtomatska prijava po uspešni registraciji
      }

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Prijava ni uspela')

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify({ username: form.username }))

      navigate('/');
    } catch (e) {
      setError(e.message || 'Prišlo je do napake')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />

      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-white/80">
            <img src="/flame-icon.svg" className="h-8 w-8" alt="Učilnica AI" />
            <span className="font-semibold tracking-tight">Učilnica AI</span>
          </a>
          <a href="/" className="text-sm text-white/70 hover:text-white">Nazaj na domačo</a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur md:p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
              <p className="mt-1 text-white/70">{description}</p>
            </div>
            <div className="inline-flex rounded-full bg-white/10 p-1">
              <button
                onClick={() => setMode('login')}
                className={`px-3 py-1 text-sm rounded-full transition ${mode==='login' ? 'bg-blue-500 text-white' : 'text-white/80 hover:text-white'}`}
              >Prijava</button>
              <button
                onClick={() => setMode('signup')}
                className={`px-3 py-1 text-sm rounded-full transition ${mode==='signup' ? 'bg-blue-500 text-white' : 'text-white/80 hover:text-white'}`}
              >Registracija</button>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-white/80">Uporabniško ime</label>
              <input
                name="username"
                value={form.username}
                onChange={onChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-blue-400/50"
                placeholder="npr. jan.novak"
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="mb-1 block text-sm text-white/80">E-pošta (sintetično dovoljeno)</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-blue-400/50"
                  placeholder="npr. jan@example.com"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm text-white/80">Geslo</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-blue-400/50"
                placeholder="••••••••"
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="mb-1 block text-sm text-white/80">Šola</label>
                <div className="relative">
                  <select
                    name="school_id"
                    value={form.school_id}
                    onChange={onChange}
                    disabled={loadingSchools}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-white outline-none transition focus:border-blue-400/50 disabled:opacity-50"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id} className="bg-slate-900">
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">▾</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-blue-500 px-5 py-3 font-medium text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 disabled:opacity-60"
            >
              {submitting ? 'Pošiljanje...' : (mode === 'login' ? 'Prijava' : 'Ustvari račun')}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-white/70">
            {mode === 'login' ? (
              <>
                Nimaš računa?{' '}
                <button onClick={() => setMode('signup')} className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                  Ustvari račun
                </button>
              </>
            ) : (
              <>
                Že imaš račun?{' '}
                <button onClick={() => setMode('login')} className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                  Prijava
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
