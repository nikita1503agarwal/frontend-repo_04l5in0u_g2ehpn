import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'

function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 backdrop-blur transition hover:bg-white/10"
      aria-label="Preklopi temo"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Svetlo' : 'Temno'}</span>
    </button>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <img src="/flame-icon.svg" className="h-8 w-8" alt="Učilnica AI" />
            <span className="text-lg font-semibold text-white tracking-tight">Učilnica AI</span>
          </a>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-white/80 hover:text-white transition">Funkcionalnosti</a>
          <a href="#varnost" className="text-sm text-white/80 hover:text-white transition">Zasebnost</a>
          <a href="#cena" className="text-sm text-white/80 hover:text-white transition">Cenik</a>
          <ThemeToggle />
          <a href="/auth" className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/30 hover:bg-blue-400 transition">Prijava</a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white/90">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur md:hidden">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-white/90">Funkcionalnosti</a>
            <a href="#varnost" className="text-white/90">Zasebnost</a>
            <a href="#cena" className="text-white/90">Cenik</a>
            <a href="/auth" className="rounded-xl bg-blue-500 px-4 py-2 text-white text-center">Prijava</a>
          </div>
        </div>
      )}
    </header>
  )
}
