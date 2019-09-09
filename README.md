# THE SABOTAGE GAME


A word guessing game built around penalizing users for wasting time. 
Screen time is deducted from the user’s score. 
Users win points back by playing the game and can see live rankings on the leaderboard.

the only way to win is not to play...
all screen time is deducted from your score

win points by playing sabotage

spin the wheel for a random bonus or penalty

check the leaderboard to see live scores

[Try out the beta](https://pointless-guessing-game.herokuapp.com/)

## GAMEPLAY

You will be given 45 seconds to type out a word that is randomly generated and displayed on your 
screen. Simple enough until you realize that the your keybpard is scrambled.

#### SCRAMBLE KEYBOARD CODE:    
```js
shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor( Math.random() * (i + 1) );
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
```

## LIVE LEADERBOARD

Every player will be able to check their standings amongst every other player on the Leaderboard
that is updated every 10 seconds. 
    


## ROULETTE WHEEL

After 3 wins or 2 losses, you will be given a chance to significantly improve or demolish 
your score.

![Roulette Wheel](/client/public/images/roulettewheel.png "Roulette Wheel")

## BUILT WITH

* [React.js](https://reactjs.org/) - Javascript Library
* [Pusher](https://bit.ly/2lKgIrW) - Realtime Communication 
* [MongoDB](https://www.mongodb.com/) - Database
* [Material-ui](https://material-ui.com/) - React Components 






## Team Members
* Zubin Mulji
* Lance Toledo
* Scott Hodges
* Quinton Smith
* Isabelle Farrell

