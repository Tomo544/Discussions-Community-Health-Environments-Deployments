import { useState } from 'react'

export default function App() {
  const [balance, setBalance] = useState(10)
  const [bet, setBet] = useState(1)
  const [choice, setChoice] = useState(null)
  const [coin, setCoin] = useState(null)
  const [message, setMessage] = useState('')
  const [gameOver, setGameOver] = useState(false)

  const flipCoin = () => {
    if (gameOver) return

    if (bet <= 0 || bet > balance) {
      setMessage('Ungültiger Einsatz')
      return
    }

    const result = Math.random() < 0.5 ? 'Kopf' : 'Zahl'
    setCoin(result)

    if (!choice) {
      setMessage('Bitte Kopf oder Zahl wählen')
      return
    }

    if (choice === result) {
      const newBalance = balance + bet
      setBalance(newBalance)
      setMessage(`Richtig! +${bet}`)

      if (newBalance >= 50) {
        setGameOver(true)
        setMessage('🎉 Du hast gewonnen! Ziel erreicht (50+)')
      }
    } else {
      const newBalance = balance - bet
      setBalance(newBalance)
      setMessage(`Falsch! -${bet}`)

      if (newBalance <= 0) {
        setGameOver(true)
        setMessage('💀 Game Over – kein Geld mehr')
      }
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 80 }}>
      <h1>Coinflip Betting Game</h1>
      <h3 style={{ color: 'green' }}>✅ LIVE VERSION (Production)</h3>

      <h2>Kapital: {balance} CHF</h2>

      <p>Ziel: 50 CHF erreichen</p>

      <div style={{ margin: 20 }}>
        <button onClick={() => setChoice('Kopf')}>Kopf</button>
        <button onClick={() => setChoice('Zahl')}>Zahl</button>
      </div>

      <div>
        <input
          type="number"
          value={bet}
          min="1"
          max={balance}
          onChange={(e) => setBet(Number(e.target.value))}
        />
      </div>

      <button onClick={flipCoin} disabled={gameOver}>
        Wetten
      </button>

      <h2>{coin && `Ergebnis: ${coin}`}</h2>
      <p>{message}</p>

      {gameOver && <h3>Spiel beendet</h3>}
    </div>
  )
}
