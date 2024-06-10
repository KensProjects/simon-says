import { useGameStore, type GameStoreTypes } from "../store"

export default function GameOverScreen() {

  const round = useGameStore((state: GameStoreTypes) => state.round)
  const gameOver = useGameStore((state: GameStoreTypes) => state.gameOver)
  const resetGame = useGameStore((state: GameStoreTypes) => state.resetGame)

  if (!gameOver) {
    return null
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4">
        <h2>Game Over!</h2>
        <p>You made it to round {round}.</p>
        <button onClick={() => resetGame()} className="hover:bg-green-400 bg-green-300 w-40 h-12 rounded-lg">Try Again? </button>
    </div>
  )
}
