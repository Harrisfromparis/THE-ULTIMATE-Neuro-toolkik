import '../styles/globals.css'
import Banner from '../components/Banner'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'

function TopBarSearch() {
  const [q, setQ] = useState('')
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)
  const [focusIdx, setFocusIdx] = useState(-1)
  const inputRef = useRef(null)
  const boxRef = useRef(null)

  // Load index once on mount
  useEffect(() => {
    let mounted = true
    fetch('/search-index.json')
      .then(r => r.json())
      .then(j => { if (mounted) setData(j) })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  const items = useMemo(() => (data && Array.isArray(data.items)) ? data.items : [], [data])
  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return []
    const terms = query.split(/\s+/).filter(Boolean)
    const score = (it) => {
      let s = 0
      const hay = `${it.title} ${it.description || ''} ${(it.tags||[]).join(' ')} ${(it.keywords||[]).join(' ')}`.toLowerCase()
      for (const t of terms) {
        if (hay.includes(t)) s += 2
        if ((it.title || '').toLowerCase().includes(t)) s += 3
      }
      if (it.type === 'section' || it.type === 'entitlement') s += 1
      if (it.type === 'page') s += 0.5
      return s
    }
    return items.map(it => ({ it, s: score(it) }))
      .filter(x => x.s > 0)
      .sort((a,b) => b.s - a.s)
      .slice(0, 8)
      .map(x => x.it)
  }, [items, q])

  // Close on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (!boxRef.current) return
      if (!boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const onKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) setOpen(true)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusIdx(i => Math.min((i < 0 ? -1 : i) + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      if (focusIdx >= 0 && results[focusIdx]) {
        window.location.href = results[focusIdx].url
      } else {
        window.location.href = `/search?q=${encodeURIComponent(q)}`
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current && inputRef.current.blur()
    }
  }

  return (
    <div className="relative w-full max-w-xs" ref={boxRef}>
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setFocusIdx(-1) }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search DCA, autism unit, OT…"
        className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
        aria-label="Site search"
      />
      {open && q.trim() && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded border border-gray-200">
          <ul className="max-h-80 overflow-auto">
            {results.map((r, idx) => (
              <li key={idx} className={"border-b last:border-b-0 " + (idx === focusIdx ? 'bg-blue-50' : '')}>
                <a href={r.url} className="block px-3 py-2">
                  <div className="text-xs text-gray-500 flex gap-2 items-center mb-1">
                    <span className="px-2 py-0.5 rounded bg-gray-100 border capitalize">{r.type}</span>
                    {r.tags && r.tags[0] && <span className="px-2 py-0.5 rounded bg-gray-50 border text-gray-600">{r.tags[0]}</span>}
                  </div>
                  <div className="text-sm font-medium text-gray-900">{r.title}</div>
                  {r.description && <div className="text-xs text-gray-600">{r.description}</div>}
                </a>
              </li>
            ))}
            {!results.length && (
              <li className="px-3 py-2 text-sm text-gray-600">No quick matches. Press Enter to view all results…</li>
            )}
          </ul>
          <div className="px-3 py-2 text-xs text-gray-500">Press Enter to search all • Esc to close</div>
        </div>
      )}
    </div>
  )
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <>
      {!isHomePage && <Banner />}
      <Component {...pageProps} />
    </>
  )
}
