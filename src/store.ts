import { create } from "zustand";

export type GameColors = "red" | "green" | 'blue' | 'yellow'

export const colors: GameColors[] = ["red", "green", 'blue', 'yellow']

export function getRandomColor() {
    const randomIdx = Math.floor(Math.random() * 4)
    const randomColor = colors[randomIdx]
    return randomColor
}

async function delay() {
    await new Promise(res => setTimeout(res, 400))
}

export type GameStoreTypes = {
    colors: GameColors[],
    round: number,
    colorGuesses: GameColors[],
    gameOver: boolean,
    colorBeingPicked: boolean,
    isGameStarted: boolean,
    guessesMatch: boolean | undefined,
    activeColor: GameColors | undefined,
    roundIsActive: boolean,
    selectGuess: (color: GameColors) => void,
    startGame: () => void,
    increaseRound: () => void,
    addColorGuess: (color: GameColors) => void,
    startNewRound: () => void[],
    addRandomColor: () => void,
    checkBoard: () => void | void[],
    resetGame: () => void,
    runRound: () => void
}

export const initialGameState = {
    round: 1,
    colors: [] as GameColors[],
    colorGuesses: [] as GameColors[],
    isGameStarted:false,
    gameOver: false,
    colorBeingPicked: false,
    guessesMatch: undefined,
    activeColor: undefined,
    roundIsActive: false,
}

export const useGameStore = create<GameStoreTypes>()((set, get) => ({
    colors: [],
    round: 1,
    colorGuesses: [],
    isGameStarted: false,
    gameOver: false,
    colorBeingPicked: false,
    guessesMatch: undefined,
    activeColor: undefined,
    roundIsActive: false,
    startGame: () => {
        const newColor = getRandomColor();

        set((state) => ({ isGameStarted: true, colors: [...state.colors, newColor].flat() }))
    },
    increaseRound: () => {
        set((state) => ({ round: state.round + 1 }))
    },
    addColorGuess: (color) => {

        const guesses = get().colorGuesses
        const colors = get().colors

        if (guesses.length === colors.length) return

        set((state) => ({ colorGuesses: [...state.colorGuesses, color].flat(), colorBeingPicked: true }))
        setTimeout(() => {
            set({ colorBeingPicked: false })
        }, 2000)
    },
    addRandomColor: () => {
        const newColor = getRandomColor();
        set((state) => ({ colors: [...state.colors, newColor].flat() }))
    },
    runRound: async () => {
        const colors = get().colors
        const roundLength = colors.length
        let idx = 0

        set({ roundIsActive: true })

        while (idx < roundLength) {
            await delay()
            set({ activeColor: colors[idx] })
            await delay()
            set({ activeColor: undefined })
            await delay()
            idx += 1
        }

        set({ activeColor: undefined, roundIsActive: false })
    },
    checkBoard: () => {

        const guesses = get().colorGuesses
        const colors = get().colors

        const startRound = get().startNewRound

        const everyColorCorrect = colors.every((color, idx) => (
            color === guesses[idx]
        ))

        if (guesses.length < colors.length) {
            return
        }
        if (!everyColorCorrect) {
            set({ gameOver: true, guessesMatch: false })
        } else {
            set({ guessesMatch: true })
            setTimeout(() => {
                [startRound(), set({ guessesMatch: undefined })]
            }, 2000)
        }

    },
    startNewRound: () => {
        const addColor = get().addRandomColor

        const increaseRound = get().increaseRound

        const runRound = get().runRound

        return [set({ colorGuesses: [] as GameColors[] }), addColor(), increaseRound(), runRound()]
    },
    selectGuess: async (color) => {
        set({ activeColor: color })
        await delay()
        set({ activeColor: undefined })
    },
    resetGame: () => {
        set(initialGameState)
    }
}))
