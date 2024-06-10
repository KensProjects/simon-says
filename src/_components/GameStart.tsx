import { useGameStore, type GameStoreTypes } from "../store"

export default function GameStart() {

    const startGame = useGameStore((state: GameStoreTypes) => state.startGame)
    const isGameStarted = useGameStore((state: GameStoreTypes) => state.isGameStarted)

    if (isGameStarted) {
        return null
    }

    return (
        <div className='flex flex-col justify-between items-center gap-4 w-full sm:w-3/4 h-auto border-2 border-purple-500 rounded-lg overflow-hidden'>
            <h1 className="mt-8">Simon Says</h1>
            <button className="w-full h-12 hover:bg-green-400 bg-green-300" onClick={() => startGame()}>Start Game</button>
        </div>
    )
}
