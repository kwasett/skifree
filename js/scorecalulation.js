var scoreCal = function (gameControls, rhinoCtrl, levelMgt) {

    var actionScores = {
        'move': 1,
        'collide': -50,
        'rhinoEat': -100
    };

    var calculateScore = function (scoreItem) {
        if (gameControls.hasMoved)
            addScore(actionScores[scoreItem] * (gameControls.skierSpeed * gameControls.skierLevel) + 0);
    }


    var addMoveScore = function (item) {
        if (item == "move"){
            addScore(actionScores[item] * (gameControls.skierSpeed * gameControls.skierLevel) + 0);
        }
           
        else
            addScore(actionScores[item]);
    }
    var addScore = function (itemScore) {
        if (!gameControls.gamePaused) {
            itemScore = isNaN(itemScore) ? 0 : itemScore;
            gameControls.skierScore += (itemScore + 0);
            addScoreListeners(itemScore, gameControls.skierScore, gameControls.skierSpeed, gameControls.skierLevel);
        }
    }

    var addScoreListeners = function (scoreJustAdded, skierScore, skierSpeed, skierLevel) {
        levelMgt.changeLevel(skierScore, skierSpeed, skierLevel)
        var rhin = rhinoCtrl.rhinoChase(skierScore, gameControls.scoreForChase);
        rhinoSpeed = rhin.speed;
        rhinoAttack = rhin.attack;
    }

    return { calculateScore, addScore, addScoreListeners, addMoveScore }


}