from typing import Dict, Any, Optional

TREASURE_ASCII = '''
*******************************************************************************
          |                   |                  |                     |
 _________|________________.=""_;=.______________|_____________________|_______
|                   |  ,-"_,=""     `"=.|                  |
|___________________|__"=._o`"-._        `"=.______________|___________________
          |                `"=._o`"=._      _`"=._                     |
 _________|_____________________:=._o "=._."_.-="'"=.__________________|_______
|                   |    __.--" , ; `"=._o." ,-"""-._ ".   |
|___________________|_._"  ,. .` ` `` ,  `"-._"-._   ". '__|___________________
          |           |o`"=._` , "` `; .". ,  "-._"-._; ;              |
 _________|___________| ;`-.o`"=._; ." ` '`."\` . "-._ /_______________|_______
|                   | |o;    `"-.o`"=._``  '` " ,__.--o;   |
|___________________|_| ;     (#) `-.o `"=.`_.--"_o.-; ;___|___________________
____/______/______/___|o;._    "      `".o|o_.--"    ;o;____/______/______/____
/______/______/______/_"=._o--._        ; | ;        ; ;/______/______/______/_
____/______/______/______/__"=._o--._   ;o|o;     _._;o;____/______/______/____
/______/______/______/______/____"=._o._; | ;_.--"o.--"_/______/______/______/_
____/______/______/______/______/_____"=.o|o_.--""___/______/______/______/____
/______/______/______/______/______/______/______/______/______/______/_____ /
*******************************************************************************
'''

class GameLogic:
    def __init__(self):
        self.steps = {
            "welcome": {
                "message": "WELCOME TO THE TREASURE LAND\nYour mission is to find the treasure",
                "ascii_art": TREASURE_ASCII,
                "prompt": "You are at the crossroads. Where do you want to go?",
                "choices": {"l": "left", "r": "right"}
            },
            "crossroads": {
                "message": "You are at the crossroads. Where do you want to go?",
                "choices": {"l": "left", "r": "right"}
            },
            "riverside": {
                "message": "Woooho! You are now redirected to the next step. By choosing left side you have been saved from falling into the hole.\nNow you are at the riverside. What would you do next?",
                "prompt": "Do you want to wait for the boat or swim to the next bank of river?",
                "choices": {"w": "wait", "s": "swim"}
            },
            "doors": {
                "message": "Woooho! You are at the next level.\nNow there are three doors of three different colors: Red, Green and Yellow",
                "prompt": "Which door do you choose?",
                "choices": {"r": "red", "g": "green", "y": "yellow"}
            }
        }

    def process_choice(self, current_step: str, choice: str) -> Dict[str, Any]:
        choice = choice.lower()
        
        if current_step == "welcome" or current_step == "crossroads":
            if choice == "l":
                return {
                    "success": True,
                    "next_step": "riverside",
                    "message": self.steps["riverside"]["message"],
                    "prompt": self.steps["riverside"]["prompt"],
                    "choices": self.steps["riverside"]["choices"],
                    "game_over": False
                }
            elif choice == "r":
                return {
                    "success": False,
                    "message": "You fall into the hole\nSo the game is over now as you are no more in the game. Try again next time!",
                    "game_over": True
                }
            else:
                return {
                    "success": False,
                    "message": "Invalid choice. Game Over!",
                    "game_over": True
                }
        
        elif current_step == "riverside":
            if choice == "w":
                return {
                    "success": True,
                    "next_step": "doors",
                    "message": self.steps["doors"]["message"],
                    "prompt": self.steps["doors"]["prompt"],
                    "choices": self.steps["doors"]["choices"],
                    "game_over": False
                }
            elif choice == "s":
                return {
                    "success": False,
                    "message": "Sorry, You have got attacked by the crocodiles that are in the river\nSo the Game is over now as you are no more in the game. Try again next time!",
                    "game_over": True
                }
            else:
                return {
                    "success": False,
                    "message": "Invalid choice. Game Over!",
                    "game_over": True
                }
        
        elif current_step == "doors":
            if choice == "y":
                return {
                    "success": True,
                    "message": "YOU WON! You found the treasure!\nYou find the treasure as the yellow color is the significance of the treasure",
                    "game_over": True,
                    "won": True
                }
            elif choice == "r":
                return {
                    "success": False,
                    "message": "Ohoo! You got burned by the fire as the red symbol is the significance of Danger\nGame Over",
                    "game_over": True
                }
            elif choice == "g":
                return {
                    "success": False,
                    "message": "Game Over",
                    "game_over": True
                }
            else:
                return {
                    "success": False,
                    "message": "Game Over",
                    "game_over": True
                }
        
        return {
            "success": False,
            "message": "Invalid game state. Game Over!",
            "game_over": True
        }