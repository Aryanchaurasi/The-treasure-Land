print('''
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
''')
print('WELCOME TO THE TREASURE LAND')
print('Your mission is to find the treasure')
a=input('you are at the cross side where do you want to go (l-left of r-right)?      ')
a=a.lower()
if(a=='l'):
    print('wooooho you are now redirected to nest step as by choosing left side you have been got saved by falling into the hole')
    print('Now you are the riverside what whould you do next')
    b=input('Do you will wait for the boat or will swim to the next bank of river(w-wait and s- swim)?       ' )
    b=b.lower()
    if(b=='w'):
        print('woooho, You are at the next level')
        print('Now there are three door of three diffrent colour')
        print('Red,Green and Yellow')
        c=input('Type r-Red g-Green and y-Yellow ?    ')
        c=c.lower()
        if(c=='y'):
            print('you won the game')
            print('You find the treasure as the yellow color is the significance of the treasure')
        elif(c=='r'):
            print("ohoo")
            print('You got burned by the fire as the red symbol is the significance of Danger')
            print('Game Over')
        elif(c=='b'):
            print('ohooo')
            print('You got eaten by the beast as the blue colour is the symbol of beast ')
            print('Game over')
        else:
            print('Game Over')
    else:
        print('Sorry, You have got attacked by the crocodiles that are in the river')
        print('So the Game is over now as you are no more in the game try in your next time')
        print('Game Over')

else:
    print('You fall in to the hole')
    print('So the game is over now as you are no more in the game try in your next time')
    print('Game over')