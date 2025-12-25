from fastapi import APIRouter, HTTPException
from typing import Optional
from database import GameSession
from game_logic import GameLogic
from schemas import (
    GameStartResponse, GameChoiceRequest, GameChoiceResponse,
    GameStatusResponse, LeaderboardResponse, LeaderboardEntry
)

router = APIRouter()
game_logic = GameLogic()

@router.post("/start", response_model=GameStartResponse)
async def start_game(user_id: Optional[str] = None):
    """Start a new game session"""
    session = GameSession(user_id=user_id)
    session.save()
    
    welcome_data = game_logic.steps["welcome"]
    
    return GameStartResponse(
        session_id=session.session_id,
        message=welcome_data["message"],
        ascii_art=welcome_data["ascii_art"],
        prompt=welcome_data["prompt"],
        choices=welcome_data["choices"],
        current_step=session.current_step
    )

@router.post("/{session_id}/choice", response_model=GameChoiceResponse)
async def make_choice(session_id: str, choice_request: GameChoiceRequest):
    """Make a choice in the game"""
    session = GameSession.get_by_session_id(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Game session not found")
    
    if session.game_over:
        raise HTTPException(status_code=400, detail="Game is already over")
    
    # Process the choice using game logic
    result = game_logic.process_choice(session.current_step, choice_request.choice)
    
    # Update session
    session.add_choice(choice_request.choice)
    session.game_over = result["game_over"]
    
    if result.get("won"):
        session.won = True
    
    if result.get("next_step"):
        session.current_step = result["next_step"]
    
    session.save()
    
    return GameChoiceResponse(
        success=result["success"],
        message=result["message"],
        prompt=result.get("prompt"),
        choices=result.get("choices"),
        next_step=result.get("next_step"),
        game_over=result["game_over"],
        won=result.get("won", False),
        session_id=session.session_id
    )

@router.get("/status/{session_id}", response_model=GameStatusResponse)
async def get_game_status(session_id: str):
    """Get current game status"""
    session = GameSession.get_by_session_id(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Game session not found")
    
    return GameStatusResponse(**session.to_dict())

@router.get("/leaderboard", response_model=LeaderboardResponse)
async def get_leaderboard(limit: int = 10):
    """Get top winners leaderboard"""
    leaderboard_data = GameSession.get_leaderboard(limit)
    leaderboard = [
        LeaderboardEntry(
            user_id=entry["user_id"],
            wins=entry["wins"],
            last_win=entry["last_win"]
        )
        for entry in leaderboard_data
    ]
    
    return LeaderboardResponse(leaderboard=leaderboard)