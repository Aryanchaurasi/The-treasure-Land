import sqlite3
from typing import Optional, List, Dict, Any
import json
import uuid
from datetime import datetime

DATABASE_URL = "treasure_game.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS game_sessions (
            session_id TEXT PRIMARY KEY,
            user_id TEXT,
            current_step TEXT DEFAULT 'welcome',
            choices_made TEXT DEFAULT '[]',
            won BOOLEAN DEFAULT FALSE,
            game_over BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

class GameSession:
    def __init__(self, session_id: str = None, user_id: str = None):
        self.session_id = session_id or str(uuid.uuid4())
        self.user_id = user_id or "anonymous"
        self.current_step = "welcome"
        self.choices_made = []
        self.won = False
        self.game_over = False
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def save(self):
        conn = get_db_connection()
        conn.execute('''
            INSERT OR REPLACE INTO game_sessions 
            (session_id, user_id, current_step, choices_made, won, game_over, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            self.session_id,
            self.user_id,
            self.current_step,
            json.dumps(self.choices_made),
            self.won,
            self.game_over,
            datetime.now()
        ))
        conn.commit()
        conn.close()

    @classmethod
    def get_by_session_id(cls, session_id: str) -> Optional['GameSession']:
        conn = get_db_connection()
        row = conn.execute(
            'SELECT * FROM game_sessions WHERE session_id = ?',
            (session_id,)
        ).fetchone()
        conn.close()
        
        if row:
            session = cls()
            session.session_id = row['session_id']
            session.user_id = row['user_id']
            session.current_step = row['current_step']
            session.choices_made = json.loads(row['choices_made'])
            session.won = bool(row['won'])
            session.game_over = bool(row['game_over'])
            session.created_at = row['created_at']
            session.updated_at = row['updated_at']
            return session
        return None

    @classmethod
    def get_leaderboard(cls, limit: int = 10) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        rows = conn.execute('''
            SELECT user_id, COUNT(*) as wins, MAX(updated_at) as last_win
            FROM game_sessions 
            WHERE won = TRUE 
            GROUP BY user_id 
            ORDER BY wins DESC, last_win DESC 
            LIMIT ?
        ''', (limit,)).fetchall()
        conn.close()
        
        return [dict(row) for row in rows]

    def add_choice(self, choice: str):
        self.choices_made.append({
            "step": self.current_step,
            "choice": choice,
            "timestamp": datetime.now().isoformat()
        })

    def to_dict(self) -> Dict[str, Any]:
        return {
            "session_id": self.session_id,
            "user_id": self.user_id,
            "current_step": self.current_step,
            "choices_made": self.choices_made,
            "won": self.won,
            "game_over": self.game_over,
            "created_at": self.created_at.isoformat() if isinstance(self.created_at, datetime) else self.created_at,
            "updated_at": self.updated_at.isoformat() if isinstance(self.updated_at, datetime) else self.updated_at
        }