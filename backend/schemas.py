from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class GameStartResponse(BaseModel):
    session_id: str
    message: str
    ascii_art: str
    prompt: str
    choices: Dict[str, str]
    current_step: str

class GameChoiceRequest(BaseModel):
    choice: str

class GameChoiceResponse(BaseModel):
    success: bool
    message: str
    prompt: Optional[str] = None
    choices: Optional[Dict[str, str]] = None
    next_step: Optional[str] = None
    game_over: bool
    won: Optional[bool] = False
    session_id: str

class GameStatusResponse(BaseModel):
    session_id: str
    user_id: str
    current_step: str
    choices_made: List[Dict[str, Any]]
    won: bool
    game_over: bool
    created_at: str
    updated_at: str

class LeaderboardEntry(BaseModel):
    user_id: str
    wins: int
    last_win: str

class LeaderboardResponse(BaseModel):
    leaderboard: List[LeaderboardEntry]