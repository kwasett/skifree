//scores calculation
var scoreCal = function (gameControls, rhinoCtrl, levelMgt) {

    //list of scoreable items
    var actionScores = {
        'move': 1,
        'collide': -50,
        'rhinoEat': -100
    };

    //given a score item add or deduct from the scores
    var calculateScore = function (scoreItem) {
        if (gameControls.hasMoved)
            addScore(actionScores[scoreItem] * (gameControls.skierSpeed * gameControls.skierLevel) + 0);
    }


    //add move to the score 
    var addMoveScore = function (item) {
        if (item == "move"){
            addScore(actionScores[item] * (gameControls.skierSpeed * gameControls.skierLevel) + 0);
        }else
            addScore(actionScores[item]);
    }
    //add scores if game not paused
    var addScore = function (itemScore) {
        if (!gameControls.gamePaused) {
            itemScore = isNaN(itemScore) ? 0 : itemScore;
            gameControls.skierScore += (itemScore + 0);
            addScoreListeners(itemScore, gameControls.skierScore, gameControls.skierSpeed, gameControls.skierLevel);
        }
    }

    //actions that take place after a change is score
    //check level 
    //check if rhino should start chasing
    var addScoreListeners = function (scoreJustAdded, skierScore, skierSpeed, skierLevel) {
        levelMgt.changeLevel(skierScore, skierSpeed, skierLevel)
        var rhin = rhinoCtrl.rhinoChase(skierScore, gameControls.scoreForChase);
        rhinoSpeed = rhin.speed;
        rhinoAttack = rhin.attack;
    }

    return { calculateScore, addScore, addScoreListeners, addMoveScore }


}