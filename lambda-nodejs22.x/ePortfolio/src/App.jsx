import { useState } from 'react'
import './App.css'
import Footer from './footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1 className = "fade-in">Hello!</h1>
      <p className = "fade-in delay">I'm Nicholas Marolla, a student at CSU Monterey Bay.</p>
      <Footer />
    </>
  )
}

export default App
