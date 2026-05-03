import { useState } from 'react'

export default function App() {
    const [balance, setBalance] = useState(10)
    const [bet, setBet] = useState(1)
    const [choice, setChoice] = useState(null)
    const [coin, setCoin] = useState(null)
    const [message, setMessage] = useState('')
    const [gameOver, setGameOver] = useState(false)

    // 🌍 ENV (Vercel_Test 2.0)
    const env = import.meta.env.VITE_APP_ENV

    const isProd = env === 'production'
    const isPreview = env === 'preview'
    const isDev = env === 'development'

    const flipCoin = () => {
        if (gameOver) return

        const betNumber = Number(bet)

        if (betNumber <= 0 || betNumber > balance) {
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
            const newBalance = balance + betNumber
            setBalance(newBalance)
            setMessage(`Richtig! +${betNumber}`)

            if (newBalance >= 50) {
                setGameOver(true)
                setMessage('🎉 Du hast gewonnen! Ziel erreicht (50+)')
            }
        } else {
            const newBalance = balance - betNumber
            setBalance(newBalance)
            setMessage(`Falsch! -${betNumber}`)

            if (newBalance <= 0) {
                setGameOver(true)
                setMessage('💀 Game Over – kein Geld mehr')
            }
        }
    }

    const resetGame = () => {
        setBalance(10)
        setBet(1)
        setChoice(null)
        setCoin(null)
        setMessage('')
        setGameOver(false)
    }

    return (
        <div style={{ textAlign: 'center', marginTop: 80 }}>
            <h1>Coinflip Betting Game</h1>

            {/* 🌍 ENV BADGE */}
            <h3
                style={{
                    color: isProd ? 'green' : isPreview ? 'orange' : 'gray'
                }}
            >
                {isProd
                    ? '🚀 Coinflip Betting Game ✅ LIVE VERSION (Production)'
                    : isPreview
                        ? '🧪 TEST VERSION (Preview / Staging)'
                        : '🛠 Development Mode'}
            </h3>

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
                    onChange={(e) => {
                        const value = e.target.value

                        if (value === '') {
                            setBet('')
                            return
                        }

                        setBet(String(Number(value)))
                    }}
                />
            </div>

            <button onClick={flipCoin} disabled={gameOver || !choice}>
                Wetten
            </button>

            <h2>{coin && `Ergebnis: ${coin}`}</h2>
            <p>{message}</p>

            {gameOver && (
                <div style={{ marginTop: 20 }}>
                    <h3>Spiel beendet</h3>
                    <button onClick={resetGame}>
                        🔁 Retry Game
                    </button>
                </div>
            )}
        </div>
    )
}