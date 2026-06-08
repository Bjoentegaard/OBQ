import './styles/main.css'
import { loadState, saveState } from './state'
import { flashcards } from './data/flashcards'
import { quizQuestions } from './data/quiz'
import { renderApp } from './app'

const state = loadState()

renderApp({
    mountEl: document.getElementById('app')!,
    state,
    flashcards,
    quizQuestions,
    onStateChange: (newState) => saveState(newState),
})