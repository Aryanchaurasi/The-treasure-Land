# 🏴‍☠️ Treasure Land Adventure

A production-ready full-stack treasure hunting adventure game that perfectly recreates the classic Python CLI experience with modern web technologies.

## 🎮 Game Overview

Navigate through treacherous paths, cross dangerous rivers, and choose the right door to find the legendary treasure! This game features:

- **Crossroads**: Choose left (safe) or right (deadly hole)
- **Riverside**: Wait for boat (safe) or swim with crocodiles (deadly)
- **Three Doors**: Yellow (treasure!), Red (fire death), Green (game over)

## 🚀 Quick Start (5 minutes)

### Option 1: Docker (Recommended)
```bash
# Clone and start
git clone https://github.com/Aryanchaurasi/The-treasure-Land
cd Treasure-Land
docker-compose up

# Play at: http://localhost:5173
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# API runs at: http://localhost:8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev

# Game runs at: http://localhost:5173
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** - Lightweight database for game sessions
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **React Confetti** - Victory celebrations

## 🎨 Features

### Visual Effects
- ⭐ Animated treasure map with ASCII art
- 🌊 Flowing river with crocodile animations
- 🚪 Glowing doors with special effects
- 🎊 Confetti celebration on victory
- 💀 Dramatic failure animations
- ✨ Particle effects and screen shake

### Game Mechanics
- 🎯 Exact Python CLI logic recreation
- 💾 Session-based game state persistence
- 🏆 Leaderboard for successful treasure hunters
- 📱 Mobile-first responsive design
- 🔄 Smooth state transitions

### PWA Features
- 📱 Installable as mobile app
- 🌐 Offline-ready service worker
- 🎮 Full-screen gaming experience
- 📤 Social sharing for victories

## 🏗️ Project Structure

```
Treasure-Land/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── game_logic.py        # Core game logic (exact CLI port)
│   ├── database.py          # SQLite database models
│   ├── schemas.py           # Pydantic schemas
│   ├── routers/
│   │   └── game.py          # Game API endpoints
│   ├── static/
│   │   └── treasure_ascii.txt
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── GameScreen.tsx
│   │   │   ├── Crossroads.tsx
│   │   │   ├── Riverside.tsx
│   │   │   ├── Doors.tsx
│   │   │   ├── WinScreen.tsx
│   │   │   └── LoseScreen.tsx
│   │   ├── stores/
│   │   │   └── gameStore.ts # Zustand state management
│   │   ├── hooks/
│   │   │   └── useGame.ts   # Game API integration
│   │   └── App.tsx
│   ├── public/
│   │   └── manifest.json    # PWA manifest
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🎯 API Endpoints

### Game Management
- `POST /api/game/start` - Start new game session
- `POST /api/game/{session_id}/choice` - Make game choice
- `GET /api/game/status/{session_id}` - Get game status
- `GET /api/game/leaderboard` - View top winners

### Example API Usage
```javascript
// Start game
const response = await fetch('/api/game/start', { method: 'POST' })
const game = await response.json()

// Make choice
await fetch(`/api/game/${game.session_id}/choice`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ choice: 'l' })
})
```

## 🎨 Design System

### Colors
- **Ocean Night**: `#0f172a` - Primary background
- **Treasure Gold**: `#fbbf24` - Success/treasure theme
- **Danger Red**: `#ef4444` - Failure/danger theme

### Typography
- **Pirata One** - Pirate-themed headings
- **Creepster** - Spooky game over text
- **Fira Code** - Monospace for ASCII art

### Animations
- Glowing buttons and treasure effects
- Water flow and ripple animations
- Door reveal and explosion effects
- Confetti celebrations and screen shake

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend
cd frontend
npm run build
npm run preview
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🎮 Game Flow

1. **Welcome Screen** - ASCII treasure map + start button
2. **Crossroads** - Left (safe) vs Right (hole death)
3. **Riverside** - Wait (boat) vs Swim (crocodiles)
4. **Three Doors** - Yellow (win!), Red (fire), Green (fail)
5. **Victory/Defeat** - Celebration or dramatic failure

## 🏆 Victory Conditions

- Choose **LEFT** at crossroads
- Choose **WAIT** at riverside  
- Choose **YELLOW** door
- **Result**: Treasure found! 🎉

## 💀 Failure Conditions

- Choose **RIGHT** → Fall in hole
- Choose **SWIM** → Crocodile attack
- Choose **RED** → Burned by fire
- Choose **GREEN** → Generic game over

## 🔧 Development

### Backend Development
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --log-level debug
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Database
- SQLite database auto-created on first run
- Game sessions stored with choices and outcomes
- Leaderboard tracks successful treasure hunters

## 📱 Mobile Experience

- Touch-optimized controls
- Haptic feedback on supported devices
- Full-screen immersive gameplay
- Swipe gestures and animations
- PWA installation prompts

## 🎵 Audio (Optional)

The game supports optional audio enhancements:
- Pirate-themed background music
- Sound effects for actions (treasure, fire, splash)
- Victory fanfare and defeat sounds

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Exact CLI Logic Recreation

This web version perfectly recreates the original Python CLI game logic:

```python
# Original Python logic preserved in game_logic.py
if choice == 'l':  # Left at crossroads
    if choice == 'w':  # Wait at riverside
        if choice == 'y':  # Yellow door
            return "YOU WON! Found treasure!"
        elif choice == 'r':  # Red door
            return "BURNED BY FIRE - Game Over"
        elif choice == 'g':  # Green door
            return "Game Over"
```

---
**🏴‍☠️ Made with Love by Aryan chaurasia !**