# Ceros Ski Code Challenge  By Seth

Welcome to the Ceros Code Challenge - Ski Edition! by Seth


The Game can be accessed via https://skifree.herokuapp.com/ . To play the game just use the down button.

What was done
* Fix left bug after a crush
* Implemented Jump
For the skier to jump press the J key 
this start counting 1 to 100 the skier image changes at very 20 count  
1-20 it stays at the same position changes image to skier_jump_1  
21-40 moves up changes image to skier_jump2  
41-60 moves up again changes image to skier_jump3  
61-80 starts decending to the same level as 21-40 but with image skier_jump_4  
81-100 return to same position as 1-20 but with image skier_jump_5  
101> resume status of the game  
* Implemented Scores
* Top Scorers Chart
* Pause and Resume of game
* Increase and decrease of game speed
* Implementation of Levels
* Rhino showing after skieing for a long
Rhino starts to change after skier scores if greater or equal to scoreForChase.
Once this condition is met the rhino counter starts counting,. rhinoAttack is set to true, rhinoDirection is set to that of the skier . set rhinoSpeed to that of skierSpeed.
the position of the rhino is determined by
```
 radius = (gameSetting.gameWidth/4)+(gameSetting.defaultSpeed*5);
 gameSetting.rhinoRadiu = radius
centerxy = {y:gameSetting.skY-gameSetting.rhinoRadius, x:gameSetting.skX}
 x-=rhinoSpeed;
 y = Math.sqrt(Math.pow(radius,2) - Math.pow(x-centerxy.x,2)) +centerxy.y

 ```


* Test added for basic task https://skifree.herokuapp.com/test.html


Keys that can be use 
* Down Arrow key to move down or start the game
* F key to move the skier faster increases the speed by 1.
* D key to move the skier slower decreases the speed by 1
* J key to jump
* R key to Reset/Restart the game 
* Space bar for pause or resume game

Scores:
* Scores are calculated per move is calculated by Speed of Skier * Level * 10 for a successful move
* Deduct 50 for a crush with any obstacle
* Deduct 100 for a Rhino Crush

Known Bugs
* The Rhino its almost inevitable to get pass him as it follows using the skier location

Things Left
* Refresh done by reloading the page //fix
* Test not totally exhaustive

----------------
For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 


We understand that everyone has varying levels of free time, so take a look through the requirements below and let us 
know when you will have something for us to look at (we also get to see how well you estimate and manage your time!). 
If anything is unclear, don't hesitate to reach out.

Requirements:
* The base game that we've sent you is not what we would consider production ready code. In fact, it's pretty far from
  it. As part of our development cycle, all code must go through a review. We would like you to perform a review
  on the base code and fix/refactor it until you believe it would be ready for production. Feel free to update the
  code/architecture as you see fit. If you feel that something should be done a better way, by all means do it! What 
  design patterns could we use? Is the codebase maintainable, unit-testable, and scalable? How hard would it be to add 
  a feature? Show us!
* There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)

  
* The game's a bit boring as it is. Add a new feature to the game to make it more enjoyable. Some ideas are:
  * Implement jumps. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included
      some jump trick assets if you wanted to get really fancy!
  * Add a score. How will you know that you're the best Ceros Skier if there's no score? Maybe store that score
      somewhere so that it is persisted across browser refreshes.
  * Feed the hungry Rhino. In the original Ski Free game, if you skied for too long, a yeti would chase you
      down and eat you.   In Ceros Ski, we've provided assets for a Rhino to catch the skier.
* Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
* Provide a way for us to view the completed code and run it, either locally or through a cloud provider
* Be original. Don’t copy someone else’s game implementation!

Bonus:
* Provide a way to reset the game once the game is over
* Provide a way to pause and resume the game
* Skier should get faster as the game progresses
* Deploy the game to a server so that we can play it without setting something up ourselves. We've included a 
  package.json and web.js file that will enable this to run on Heroku. Feel free to use those or use your own code to 
  deploy to a cloud service if you want.
* Write unit tests for your code

And don't think you have to stop there. If you're having fun with this and have the time, feel free to add anything else
you want and show us what you can do! 

We are looking forward to see what you come up with!
