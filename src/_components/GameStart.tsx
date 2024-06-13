import { useGameStore, type GameStoreTypes } from "../store"

export default function GameStart() {

    const startGame = useGameStore((state: GameStoreTypes) => state.startGame)
    const isGameStarted = useGameStore((state: GameStoreTypes) => state.isGameStarted)

    if (isGameStarted) {
        return null
    }

    return (
        <button className='flex flex-col justify-around items-center w-full sm:w-3/4 h-1/2 border-4 border-purple-500 rounded-lg overflow-hidden bg-green-300 text-3xl font-semibold' onClick={() => startGame()}>
            <h1>Simon Says</h1>
        </button>
    )
}
