import type {Flashcard} from "./data/flashcards.ts";

export interface QuizResult {
    timestamp: number
    correct: number
    total: number
    percentage: number
}

export interface AppState {
    scores: Record<string, boolean>
    quizHistory: QuizResult[]
}

const STORAGE_KEY = 'obq_state_v1'

function defaultState(): AppState {
    return {scores: {}, quizHistory: []}
}

export function loadState(): AppState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? (JSON.parse(raw) as AppState) : defaultState()
    } catch {
        return defaultState()
    }
}

export function saveState(state: AppState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function getKnownCount(state: AppState): number {
    return Object.values(state.scores).filter(v => v === true).length
}

export function getUnknownCount(state: AppState): number {
    return Object.values(state.scores).filter(v => v === false).length
}

export function getDomainProgress(state: AppState, cards: Flashcard[], domain: Flashcard['domain']): number {
    const domainCards = cards.filter(card => card.domain === domain)
    const known = domainCards.filter(c => state.scores[c.question] === true).length
    return domainCards.length > 0 ? Math.round((known / domainCards.length) * 100) : 0
}