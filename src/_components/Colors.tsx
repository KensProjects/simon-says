import { type GameStoreTypes, useGameStore, type GameColors } from "../store"

export default function Colors() {

    const activeColor = useGameStore((state: GameStoreTypes) => state.activeColor)
    const roundIsActive = useGameStore((state: GameStoreTypes) => state.roundIsActive)
    const addColorGuess = useGameStore((state: GameStoreTypes) => state.addColorGuess)
    const selectGuess = useGameStore((state: GameStoreTypes) => state.selectGuess)

    function handleGuess(color: GameColors) {
        return [addColorGuess(color), selectGuess(color)]
    }

    const isActive = activeColor !== undefined
    const isRed = activeColor === 'red'
    const isYellow = activeColor === 'yellow'
    const isBlue = activeColor === 'blue'
    const isGreen = activeColor === 'green'

    const colorStyling = "w-32 h-32 sm:w-32 sm:h-32"
6
    const buttonIsDisabled = isActive || roundIsActive

    return (
        <ul className="flex flex-col sm:flex-row justify-center items-center w-full h-full gap-4">
            <li key={crypto.randomUUID()} className={`${colorStyling} ${isRed ? "bg-red-600" : "bg-red-200"}`}>
                <button disabled={buttonIsDisabled} onClick={() => handleGuess('red')} className="w-full h-full" />
            </li>
            <li key={crypto.randomUUID()} className={`${colorStyling} ${isYellow ? "bg-yellow-300" : "bg-yellow-200"}`}>
                <button disabled={buttonIsDisabled} onClick={() => handleGuess('yellow')} className="w-full h-full" />
            </li>
            <li key={crypto.randomUUID()} className={`${colorStyling} ${isBlue ? "bg-blue-600" : "bg-blue-200"}`}>
                <button disabled={buttonIsDisabled} onClick={() => handleGuess('blue')} className="w-full h-full" />
            </li>
            <li key={crypto.randomUUID()} className={`${colorStyling} ${isGreen ? "bg-green-600" : "bg-green-200"}`}>
                <button disabled={buttonIsDisabled} onClick={() => handleGuess('green')} className="w-full h-full" />
            </li>
        </ul>
    )
}
