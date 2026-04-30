import { useState } from 'react'

export default function App() {
  const [result, setResult] = useState(null)

  const flip = () => {
    const coin = Math.random() < 0.5 ? 'Kopf' : 'Zahl'
    setResult(coin)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h1>Coinflip Game</h1>

      <button onClick={flip}>Flip Coin</button>

      {result && <h2>{result}</h2>}
    </div>
  )
}