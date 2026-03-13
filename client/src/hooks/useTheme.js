import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('mode') || 'dark'
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('mode', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}