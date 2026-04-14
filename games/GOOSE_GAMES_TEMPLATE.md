# 🪿 Goose Games — New Game Generator Template
# Paste this into Claude Code, Cursor, or Claude.ai chat
# Replace [PLACEHOLDERS] before submitting

---

## PROMPT TEMPLATE

Create a single self-contained HTML5 game file called `[GAME-SLUG].html`.

**Base game mechanic:** [CLASSIC GAME — e.g. Tetris / Pac-Man / Minesweeper / Space Invaders / Typing Tutor / Memory Match]

**Goose Games theme:**
- Game title: "[GOOSE GAME NAME — e.g. Goose Tetris / HONK-Man / Goose Mines]"
- Tagline: "[FUNNY TAGLINE — e.g. 'Stack bread. Honk forever.' / 'HONK your way out.']"
- Replace all generic game objects with goose-world equivalents:
  - Player character → goose (🪿) or egg (🥚)
  - Enemies/obstacles → dogs, foxes, tourists, or rogue bread loaves
  - Collectables → bread, pond water, goslings
  - Points/lives UI → use 🪿 emojis

**Visual style:**
- Color palette: [CHOOSE ONE → Bright grassy greens + white | Deep pond blues + gold | Sunset orange + teal | Night pond dark with moonlight]
- Typography: import ONE distinctive Google Font (NOT Inter, NOT Roboto) — something playful or bold
- Grid/board background: subtle texture (checkerboard, grass pattern, water ripples)
- Animated elements: idle goose animation on the start screen
- Particle effects on scoring / death

**Technical requirements:**
- Single HTML file, zero external dependencies (fonts via Google Fonts CDN only)
- Canvas-based OR DOM-based (choose what fits the game best)
- Controls: keyboard arrows/WASD + on-screen D-pad buttons for mobile
- localStorage high score persistence (key: `goose_[slug]_best`)
- Start screen overlay + game over overlay with score display
- Responsive: max width 420px, centered on page

**Goose personality touches:**
- Death message: something like "HONK! YOU DIED." or "THE GEESE HAVE WON."
- Score milestones trigger "HONK!" pop-up text animations
- Win condition message: "THE POND IS YOURS 🪿"
- At least one goose sound effect description in a comment (we'll add audio later)

**Output:** A single complete `.html` file, fully playable, no placeholders.

---

## EXAMPLE FILLED PROMPTS

### Week 1 — Goose Tetris
> Base mechanic: Tetris
> Title: "HONK-TRIS"
> Tagline: "Stack bread. Clear lines. HONK."
> Theme: Bright grassy greens + white
> Objects: Tetromino pieces = different geese formations, lines = pond lanes

### Week 2 — Goose Memory Match
> Base mechanic: Memory/card flip matching game
> Title: "GOOSE MEMORY"
> Tagline: "How good is your goose brain?"
> Theme: Sunset orange + teal
> Objects: Cards show goose-world icons (🪿🥚🍞🌊🦆💧🌿🐣)

### Week 3 — Goose Space Invaders  
> Base mechanic: Space Invaders
> Title: "BREAD INVADERS"
> Tagline: "They came for the bread. You came for blood."
> Theme: Night pond dark with moonlight
> Objects: Invaders = bread loaves + tourists, player = angry goose, bullets = HONK blasts

### Week 4 — Goose Minesweeper
> Base mechanic: Minesweeper
> Title: "GOOSE MINES"
> Tagline: "One wrong step and the geese attack."
> Theme: Deep pond blues + gold
> Objects: Mines = angry geese, safe tiles = bread crumbs, flags = 🪿 markers

---

## GOOSE GAMES REPO DEPLOYMENT

After generating each game, add it to your Goose Games repo:

```bash
# 1. Copy file to your games folder
cp [game-slug].html /path/to/goose-games/games/[game-slug].html

# 2. Add entry to games registry (games.json)
# {
#   "id": "[game-slug]",
#   "title": "[Game Title]",
#   "emoji": "🪿",
#   "description": "[Tagline]",
#   "file": "games/[game-slug].html",
#   "added": "[YYYY-MM-DD]"
# }

# 3. Git commit and push
git add games/[game-slug].html games.json
git commit -m "🪿 Add [Game Title] to Goose Games"
git push origin main
# Netlify auto-deploys from main
```

---

## GAMES BUILT SO FAR

| # | Slug | Title | Status |
|---|------|-------|--------|
| 1 | flappy | Flapsy (Flappy Bird) | ✅ Done |
| 2 | goose-snake | Goose Snake | ✅ Done |
| 3 | goose-2048 | Goose 2048 | ✅ Done |
| 4 | goose-breaker | Goose Breaker (Breakout) | ✅ Done |
| 5 | honk-tris | HONK-TRIS (Tetris) | 🔲 Next |
| 6 | bread-invaders | Bread Invaders (Space Invaders) | 🔲 Queue |
| 7 | goose-memory | Goose Memory Match | 🔲 Queue |
| 8 | goose-mines | Goose Mines (Minesweeper) | 🔲 Queue |
| 9 | goose-runner | Goose Runner (Endless Runner) | 🔲 Queue |
| 10 | honkle | Honkle (Wordle clone) | 🔲 Queue |
