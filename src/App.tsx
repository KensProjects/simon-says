import Board from "./_components/Board"
import GameOverScreen from "./_components/GameOverScreen"
import GameStart from "./_components/GameStart"
import { useGameStore, type GameStoreTypes } from "./store"

function App() {

  const isGameStarted = useGameStore((state: GameStoreTypes) => state.isGameStarted)
  const gameOver = useGameStore((state: GameStoreTypes) => state.gameOver)

  if (gameOver) return <GameOverScreen />

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {!isGameStarted ? <GameStart /> : <Board />}
    </div>

  )
}

export default App
