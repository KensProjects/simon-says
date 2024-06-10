import { useEffect } from "react";
import { useGameStore, type GameStoreTypes } from "../store";
import Colors from "./Colors";

export default function Board() {

  const colors = useGameStore((state: GameStoreTypes) => state.colors)
  const colorGuesses = useGameStore((state: GameStoreTypes) => state.colorGuesses)
  const round = useGameStore((state: GameStoreTypes) => state.round)
  const checkBoard = useGameStore((state: GameStoreTypes) => state.checkBoard)
  const runRound = useGameStore((state: GameStoreTypes) => state.runRound)

  useEffect(() => {
    checkBoard()
  }, [colorGuesses])

  useEffect(() => {
    runRound()
  }, [colors])

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2>Simon Says</h2>
      <h3>Round: {round}</h3>
      <Colors />
    </div>
  )
}
