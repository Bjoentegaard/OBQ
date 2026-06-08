import {type AppState, getDomainProgress, getKnownCount, getUnknownCount, type QuizResult} from './state'
import type {Flashcard} from './data/flashcards'
import type {QuizQuestion} from './data/quiz'

// ─── Types ───────────────────────────────────────────────────────────────────

type Page = 'dash' | 'fc' | 'quiz'
type Domain = Flashcard['domain']

interface AppOptions {
    mountEl: HTMLElement
    state: AppState
    flashcards: Flashcard[]
    quizQuestions: QuizQuestion[]
    onStateChange: (state: AppState) => void
}

// ─── Domain helpers ───────────────────────────────────────────────────────────

const DOMAIN_META: Record<Domain, { label: string; color: string; cls: string }> = {
    cloud: {label: 'Cloud Concepts', color: '#7ab3ff', cls: 'd-cloud'},
    security: {label: 'Security', color: '#3ecf8e', cls: 'd-security'},
    tech: {label: 'Technology', color: '#f5c842', cls: 'd-tech'},
    billing: {label: 'Billing & Pricing', color: '#d064ff', cls: 'd-billing'},
}

// ─── Quiz session state ───────────────────────────────────────────────────────

interface QuizSession {
    questions: QuizQuestion[]
    index: number
    correct: number
}

let quizSession: QuizSession | null = null


// ─── Main render ──────────────────────────────────────────────────────────────

export function renderApp(opts: AppOptions): void {
    const {mountEl, flashcards, quizQuestions} = opts
    let {state} = opts
    let currentPage: Page = 'dash'

    // Flashcard local state
    let fcDeck: Flashcard[] = [...flashcards]
    let fcIndex = 0
    let fcFlipped = false
    let fcFilter: Domain | 'all' | 'wrong' = 'all'

    function update(newState: AppState): void {
        state = newState
        opts.onStateChange(state)
    }

    function navigate(page: Page): void {
        currentPage = page
        renderPage()
    }

    mountEl.innerHTML = buildShell()
    bindKeyboard()
    navigate('dash')

    // ─── Shell ─────────────────────────────────────────────────────────────────

    function buildShell(): string {
        return `
      <nav class="topbar">
        <span class="brand">OBQ <span>CLF-C02</span></span>
        <div class="tabs">
          <button class="tab-btn" data-page="dash">
            ${iconGrid()} Oversikt
          </button>
          <button class="tab-btn" data-page="fc">
            ${iconCard()} Flashcards
          </button>
          <button class="tab-btn" data-page="quiz">
            ${iconQuestion()} Quiz
          </button>
        </div>
        <button class="reset-all" id="btn-reset">Nullstill alt</button>
      </nav>
      <main id="main-content"></main>
    `
    }

    function renderPage(): void {
        // Oppdater aktiv tab
        mountEl.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset['page'] === currentPage)
        })

        const main = mountEl.querySelector<HTMLElement>('#main-content')!

        if (currentPage === 'dash') main.innerHTML = buildDash()
        else if (currentPage === 'fc') {
            main.innerHTML = buildFlashcards();
            renderCard()
        } else if (currentPage === 'quiz') main.innerHTML = buildQuizSetup()

        bindPageEvents()
    }

    // ─── Dashboard ─────────────────────────────────────────────────────────────

    function buildDash(): string {
        const known = getKnownCount(state)
        const unsure = getUnknownCount(state)
        const qh = state.quizHistory
        const best = qh.length ? Math.max(...qh.map(r => r.percentage)) : null

        const domainBars = (Object.keys(DOMAIN_META) as Domain[]).map(d => {
            const pct = getDomainProgress(state, flashcards, d)
            const m = DOMAIN_META[d]
            return `
        <div class="domain-row">
          <span class="domain-name">${m.label}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${pct}%;background:${m.color}"></div>
          </div>
          <span class="domain-pct">${pct}%</span>
        </div>`
        }).join('')

        const historyRows = qh.length
            ? [...qh].reverse().slice(0, 8).map(r => {
                const pass = r.percentage >= 70
                const date = new Date(r.timestamp).toLocaleDateString('no-NO', {day: '2-digit', month: 'short'})
                return `
            <div class="history-item">
              <span class="h-score ${pass ? 'pass' : 'fail'}">${r.percentage}%</span>
              <div class="h-bar">
                <div class="h-bar-fill ${pass ? 'h-fill-pass' : 'h-fill-fail'}" style="width:${r.percentage}%"></div>
              </div>
              <span style="font-size:12px;color:var(--text3)">${r.correct}/${r.total}</span>
              <span class="h-date">${date}</span>
            </div>`
            }).join('')
            : '<p class="empty-state">Ingen quiz fullført ennå.</p>'

        return `
      <div class="page-inner">
        <p class="section-head">Din fremgang</p>
        <div class="dash-grid">
          <div class="stat-card"><div class="stat-label">Lærte kort</div><div class="stat-val green">${known}</div></div>
          <div class="stat-card"><div class="stat-label">Usikre kort</div><div class="stat-val red">${unsure}</div></div>
          <div class="stat-card"><div class="stat-label">Quiz tatt</div><div class="stat-val">${qh.length}</div></div>
          <div class="stat-card"><div class="stat-label">Beste quiz</div><div class="stat-val amber">${best !== null ? best + '%' : '—'}</div></div>
        </div>
        <p class="section-head">Fremgang per domene</p>
        <div class="domain-progress">${domainBars}</div>
        <p class="section-head">Quiz-historikk</p>
        <div class="history-list">${historyRows}</div>
      </div>`
    }

    // ─── Flashcards ────────────────────────────────────────────────────────────

    function buildFlashcards(): string {
        return `
      <div class="page-inner">
        <div class="filters">
          <button class="fc-filter active" data-filter="all">Alle</button>
          <button class="fc-filter" data-filter="cloud">Cloud Concepts</button>
          <button class="fc-filter" data-filter="security">Security</button>
          <button class="fc-filter" data-filter="tech">Technology</button>
          <button class="fc-filter" data-filter="billing">Billing</button>
          <button class="fc-filter" id="wrong-btn" data-filter="wrong" style="display:none">Øv på feil</button>
          <span id="fc-counter"></span>
        </div>
        <div class="card-wrap">
          <div class="fc-card" id="fc-card" tabindex="0" role="button">
            <div class="card-status" id="fc-status"></div>
            <div class="fc-side" id="fc-side">Spørsmål — klikk for å snu</div>
            <div id="fc-text" class="fc-q"></div>
            <span class="domain-pill" id="fc-domain"></span>
          </div>
        </div>
        <div class="result-row">
          <button class="result-btn btn-unsure" id="fc-btn-unsure" style="display:none">
            ${iconX()} Husket ikke
          </button>
          <button class="result-btn btn-know" id="fc-btn-know" style="display:none">
            ${iconCheck()} Kan det
          </button>
        </div>
        <div class="nav-row">
          <button class="nav-btn" id="fc-btn-prev">
            ${iconLeft()} Forrige
          </button>
          <div class="nav-center">
            <button class="nav-btn" id="fc-btn-shuffle">${iconShuffle()} Stokk</button>
            <button class="nav-btn" id="fc-btn-reset-filter">Nullstill filter</button>
          </div>
          <button class="nav-btn" id="fc-btn-next">Neste ${iconRight()}</button>
        </div>
        <div class="progress-wrap"><div id="fc-progress-bar"></div></div>
        <div class="score-row">
          <span id="fc-score-know">Kan: 0</span>
          <span id="fc-score-pct"></span>
          <span id="fc-score-unsure">Usikker: 0</span>
        </div>
        <p class="hint">
          <kbd>Space</kbd> snu &nbsp;·&nbsp;
          <kbd>←</kbd><kbd>→</kbd> naviger &nbsp;·&nbsp;
          <kbd>1</kbd> kan det &nbsp;·&nbsp;
          <kbd>2</kbd> husket ikke
        </p>
      </div>`
    }

    function renderCard(): void {
        const card = fcDeck[fcIndex]
        if (!card) return

        fcFlipped = false
        const cardEl = document.getElementById('fc-card')!
        cardEl.classList.remove('flipped')

        document.getElementById('fc-side')!.textContent = 'Spørsmål — klikk for å snu'
        document.getElementById('fc-text')!.textContent = card.question
        document.getElementById('fc-text')!.className = 'fc-q'

        const m = DOMAIN_META[card.domain]
        const domainEl = document.getElementById('fc-domain')!
        domainEl.textContent = m.label
        domainEl.className = `domain-pill ${m.cls}`

        document.getElementById('fc-counter')!.textContent = `${fcIndex + 1} / ${fcDeck.length}`
        document.getElementById('fc-btn-know')!.style.display = 'none'
        document.getElementById('fc-btn-unsure')!.style.display = 'none'

        const s = state.scores[card.question]
        const statusEl = document.getElementById('fc-status')!
        statusEl.className = 'card-status' + (s === true ? ' know' : s === false ? ' unsure' : '')

        ;(document.getElementById('fc-btn-prev') as HTMLButtonElement).disabled = fcIndex === 0
        ;(document.getElementById('fc-btn-next') as HTMLButtonElement).disabled = fcIndex === fcDeck.length - 1

        updateProgress()
    }

    function flipCard(): void {
        if (!fcDeck.length) return
        fcFlipped = !fcFlipped
        const card = fcDeck[fcIndex]
        document.getElementById('fc-card')!.classList.toggle('flipped', fcFlipped)

        if (fcFlipped) {
            document.getElementById('fc-side')!.textContent = 'Svar'
            document.getElementById('fc-text')!.textContent = card.answer
            document.getElementById('fc-text')!.className = 'fc-a'
            document.getElementById('fc-btn-know')!.style.display = 'inline-flex'
            document.getElementById('fc-btn-unsure')!.style.display = 'inline-flex'
        } else {
            document.getElementById('fc-side')!.textContent = 'Spørsmål — klikk for å snu'
            document.getElementById('fc-text')!.textContent = card.question
            document.getElementById('fc-text')!.className = 'fc-q'
            document.getElementById('fc-btn-know')!.style.display = 'none'
            document.getElementById('fc-btn-unsure')!.style.display = 'none'
        }
    }

    function markCard(known: boolean): void {
        const card = fcDeck[fcIndex]
        update({...state, scores: {...state.scores, [card.question]: known}})

        const wrongCount = flashcards.filter(c => state.scores[c.question] === false).length
        const wb = document.getElementById('wrong-btn')!
        wb.style.display = wrongCount > 0 ? 'inline-block' : 'none'
        wb.textContent = `Øv på feil (${wrongCount})`

        if (fcIndex < fcDeck.length - 1) {
            fcIndex++
            renderCard()
        } else {
            updateProgress()
        }
    }

    function setFilter(filter: typeof fcFilter): void {
        fcFilter = filter
        if (filter === 'all') fcDeck = [...flashcards]
        else if (filter === 'wrong') fcDeck = flashcards.filter(c => state.scores[c.question] === false)
        else fcDeck = flashcards.filter(c => c.domain === filter)
        fcIndex = 0
        renderCard()
    }

    function updateProgress(): void {
        const known = getKnownCount(state)
        const unsure = getUnknownCount(state)
        const pct = Math.round((known / flashcards.length) * 100)
        document.getElementById('fc-score-know')!.textContent = `Kan: ${known}`
        document.getElementById('fc-score-unsure')!.textContent = `Usikker: ${unsure}`
        document.getElementById('fc-score-pct')!.textContent = pct > 0 ? `${pct}% av alle` : ''
        document.getElementById('fc-progress-bar')!.style.width = `${pct}%`
    }

    // ─── Quiz ──────────────────────────────────────────────────────────────────

    function buildQuizSetup(): string {
        const history = buildHistoryHTML(state.quizHistory)
        return `
      <div class="page-inner" id="quiz-setup">
        <p class="section-head">Konfigurer quiz</p>
        <div class="quiz-controls">
          <select class="quiz-select" id="q-domain">
            <option value="all">Alle domener</option>
            <option value="cloud">Cloud Concepts</option>
            <option value="security">Security &amp; Compliance</option>
            <option value="tech">Cloud Technology</option>
            <option value="billing">Billing &amp; Pricing</option>
          </select>
          <select class="quiz-select" id="q-count">
            <option value="10">10 spørsmål</option>
            <option value="20" selected>20 spørsmål</option>
            <option value="25">25 spørsmål</option>
          </select>
          <button class="start-btn" id="btn-start-quiz">Start quiz</button>
        </div>
        <p class="section-head">Tidligere resultater</p>
        ${history}
      </div>`
    }

    function buildHistoryHTML(qh: QuizResult[]): string {
        if (!qh.length) return '<p class="empty-state">Ingen quiz fullført ennå.</p>'
        return '<div class="history-list">' + [...qh].reverse().slice(0, 8).map(r => {
            const pass = r.percentage >= 70
            const date = new Date(r.timestamp).toLocaleDateString('no-NO', {day: '2-digit', month: 'short'})
            return `
        <div class="history-item">
          <span class="h-score ${pass ? 'pass' : 'fail'}">${r.percentage}%</span>
          <div class="h-bar">
            <div class="h-bar-fill ${pass ? 'h-fill-pass' : 'h-fill-fail'}" style="width:${r.percentage}%"></div>
          </div>
          <span style="font-size:12px;color:var(--text3)">${r.correct}/${r.total}</span>
          <span class="h-date">${date}</span>
        </div>`
        }).join('') + '</div>'
    }

    function startQuiz(): void {
        const domain = (document.getElementById('q-domain') as HTMLSelectElement).value as Domain | 'all'
        const count = parseInt((document.getElementById('q-count') as HTMLSelectElement).value)

        let pool = domain === 'all' ? [...quizQuestions] : quizQuestions.filter(q => q.domain === domain)
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]]
        }
        pool = pool.slice(0, Math.min(count, pool.length))

        quizSession = {questions: pool, index: 0, correct: 0}
        renderQuizQuestion()
    }

    function renderQuizQuestion(): void {
        if (!quizSession) return
        const {questions, index} = quizSession
        const q = questions[index]
        const pct = Math.round((index / questions.length) * 100)
        const m = DOMAIN_META[q.domain]

        const main = document.getElementById('main-content')!
        main.innerHTML = `
      <div class="page-inner">
        <div class="quiz-header">
          <div class="quiz-meta">Spørsmål <span>${index + 1}</span> av <span>${questions.length}</span></div>
          <button class="quit-btn" id="btn-quit-quiz">Avslutt</button>
        </div>
        <div class="q-progress-wrap">
          <div class="q-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="question-card">
          <div class="q-domain-tag ${m.cls}">${m.label}</div>
          <div class="q-text">${q.question}</div>
          <div class="options">
            ${q.options.map((opt, i) => `
              <button class="option-btn" data-index="${i}">
                <span class="opt-letter">${'ABCD'[i]}</span>
                <span>${opt}</span>
              </button>`).join('')}
          </div>
          <div class="feedback-row" id="q-feedback"></div>
        </div>
        <button class="q-next-btn" id="btn-q-next" style="display:none">Neste spørsmål →</button>
      </div>`

        document.getElementById('btn-quit-quiz')!.onclick = () => navigate('quiz')
        document.getElementById('btn-q-next')!.onclick = () => advanceQuiz()
        document.querySelectorAll<HTMLButtonElement>('.option-btn').forEach(btn => {
            btn.onclick = () => answerQuiz(parseInt(btn.dataset['index']!))
        })
    }

    function answerQuiz(chosen: number): void {
        if (!quizSession) return
        const q = quizSession.questions[quizSession.index]
        const correct = q.answer
        const isRight = chosen === correct

        if (isRight) quizSession.correct++

        document.querySelectorAll<HTMLButtonElement>('.option-btn').forEach((btn, i) => {
            btn.disabled = true
            if (i === correct) btn.classList.add('correct')
            else if (i === chosen && !isRight) btn.classList.add('wrong')
        })

        const fb = document.getElementById('q-feedback')!
        fb.textContent = q.explanation
        fb.className = `feedback-row show ${isRight ? 'correct-fb' : 'wrong-fb'}`

        const nxt = document.getElementById('btn-q-next')!
        nxt.style.display = 'flex'
        nxt.textContent = quizSession.index < quizSession.questions.length - 1
            ? 'Neste spørsmål →'
            : 'Se resultat →'
    }

    function advanceQuiz(): void {
        if (!quizSession) return
        quizSession.index++
        if (quizSession.index >= quizSession.questions.length) finishQuiz()
        else renderQuizQuestion()
    }

    function finishQuiz(): void {
        if (!quizSession) return
        const {correct, questions} = quizSession
        const total = questions.length
        const percentage = Math.round((correct / total) * 100)
        const pass = percentage >= 70

        const result: QuizResult = {timestamp: Date.now(), correct, total, percentage}
        update({...state, quizHistory: [...state.quizHistory, result]})

        const main = document.getElementById('main-content')!
        main.innerHTML = `
      <div class="page-inner">
        <div class="result-hero">
          <div class="result-score-big ${pass ? 'pass' : 'fail'}">${percentage}%</div>
          <div class="result-label">${pass ? `Bestått · ${correct} av ${total} riktige` : 'Ikke bestått · Grense er 70%'}</div>
          <div class="result-stats">
            <div class="r-stat"><div class="r-stat-num">${correct}</div><div class="r-stat-lbl">Riktige</div></div>
            <div class="r-stat"><div class="r-stat-num">${total - correct}</div><div class="r-stat-lbl">Feil</div></div>
            <div class="r-stat"><div class="r-stat-num">${total}</div><div class="r-stat-lbl">Totalt</div></div>
          </div>
          <button class="retry-btn" id="btn-retry">↺ Ta quiz igjen</button>
        </div>
      </div>`

        document.getElementById('btn-retry')!.onclick = () => navigate('quiz')
    }

    // ─── Event binding ─────────────────────────────────────────────────────────

    function bindPageEvents(): void {
        // Topbar reset
        document.getElementById('btn-reset')?.addEventListener('click', () => {
            if (confirm('Nullstille ALL fremgang? Dette kan ikke angres.')) {
                update({scores: {}, quizHistory: []})
                fcDeck = [...flashcards]
                fcIndex = 0
                fcFlipped = false
                navigate('dash')
            }
        })

        // Tab navigation
        mountEl.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach(btn => {
            btn.onclick = () => navigate(btn.dataset['page'] as Page)
        })

        if (currentPage === 'fc') {
            document.getElementById('fc-card')!.onclick = () => flipCard()
            document.getElementById('fc-btn-prev')!.onclick = () => {
                fcIndex = Math.max(0, fcIndex - 1);
                renderCard()
            }
            document.getElementById('fc-btn-next')!.onclick = () => {
                fcIndex = Math.min(fcDeck.length - 1, fcIndex + 1);
                renderCard()
            }
            document.getElementById('fc-btn-know')!.onclick = () => markCard(true)
            document.getElementById('fc-btn-unsure')!.onclick = () => markCard(false)
            document.getElementById('fc-btn-shuffle')!.onclick = () => {
                for (let i = fcDeck.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [fcDeck[i], fcDeck[j]] = [fcDeck[j], fcDeck[i]]
                }
                fcIndex = 0;
                renderCard()
            }
            document.getElementById('fc-btn-reset-filter')!.onclick = () => setFilter('all')
            document.querySelectorAll<HTMLButtonElement>('.fc-filter').forEach(btn => {
                btn.onclick = () => {
                    document.querySelectorAll('.fc-filter').forEach(b => b.classList.remove('active'))
                    btn.classList.add('active')
                    setFilter(btn.dataset['filter'] as typeof fcFilter)
                }
            })
        }

        if (currentPage === 'quiz') {
            document.getElementById('btn-start-quiz')?.addEventListener('click', startQuiz)
        }
    }

    function bindKeyboard(): void {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (currentPage !== 'fc') return
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                flipCard()
            } else if (e.key === 'ArrowRight') {
                fcIndex = Math.min(fcDeck.length - 1, fcIndex + 1);
                renderCard()
            } else if (e.key === 'ArrowLeft') {
                fcIndex = Math.max(0, fcIndex - 1);
                renderCard()
            } else if (e.key === '1' && fcFlipped) markCard(true)
            else if (e.key === '2' && fcFlipped) markCard(false)
        })
    }

    // ─── SVG icons ─────────────────────────────────────────────────────────────

    function icon(path: string): string {
        return `<svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
    }

    function iconGrid(): string {
        return icon('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>')
    }

    function iconCard(): string {
        return icon('<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>')
    }

    function iconQuestion(): string {
        return icon('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>')
    }

    function iconLeft(): string {
        return icon('<polyline points="15 18 9 12 15 6"/>')
    }

    function iconRight(): string {
        return icon('<polyline points="9 18 15 12 9 6"/>')
    }

    function iconCheck(): string {
        return icon('<polyline points="20 6 9 17 4 12"/>')
    }

    function iconX(): string {
        return icon('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>')
    }

    function iconShuffle(): string {
        return icon('<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>')
    }

}