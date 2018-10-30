var myFeature = {
    myProperty: "hello",
 
    myMethod: function() {
        console.log( myFeature.myProperty );
    },
 
    init: function( settings ) {
        myFeature.settings = settings;
    },
 
    readSettings: function() {
        console.log( myFeature.settings );
    }
};

var gameControls = function(){
    
    console.log("game Controller")
    function start(){
        console.log("Start")
    }
    function stop(){
        console.log("stop")
    }
    function pauseOrResume(){

    }
   return {start , stop, pauseOrResume}
};


var gameSetting = {
  
    ctx,

    skierDirection,
     skierMapX = 0,
     skierMapY = 0,

     skX=0, skY = 0,
     skierSpeed = 8,
     skierLevel = 1,
     scorePerLevel = 4000,
     skierScore = 0,
     scoreForChase = 5000,
     showRhino = true,
     oldDirection = 1,


     rhinoSpeed = skierSpeed,
     rhinoMapX = 0,
     rhinoMapY = 0,
     rhinoAttack = false,
     rhinoDirection = 0,
     rhinoSkierCollide = 0,

     maxCollisions = 3,
     livesCount = maxCollisions,
     gamePaused = false,
     scoreItem = "",

     hasMoved = false,
     skierCanMove = true,
     skierJumping = false,
     skierJumpingCount = 0
}

var rhino = function(gameSetting){
    var moveRhino = function () {
        if (!showRhino || gamePaused || !rhinoAttack)
            return;

        if (rhinoSkierCollide > 0) {
            eatValue = rhinoEating(rhinoSkierCollide);
            rhinoDirection = 6 + eatValue;
            if (eatValue > 4) {
                endGame();
            }
        }
        else if (rhinoDirection !== 0) {

            var collided = checkIfRhinoSkierCollide();
            if (collided) {
                rhinoDirection = 5;
            } else {
                rhinoDirection = skierDirection;
            }

        }

        switch (rhinoDirection) {
            case 0:
                if (rMove <= 1) {
                    rhinoMapY = skY;
                    rhinoMapX = skX + Math.floor(gameWidth / 4);
                } else {
                    if (rhinoMapX < skX) {
                        rhinoMapX -= skX;
                        rhinoSkierCollide = 1;

                        skierCanMove = false;
                    }
                }
            case 1:
                rhinoMapX -= rhinoSpeed;
                break;
            case 2:
                rhinoMapX -= Math.round(rhinoSpeed / 1.4142);
                rhinoMapY += Math.round(rhinoSpeed / 1.4142);
                break;
            case 3:
                rhinoMapY += rhinoSpeed;
                break;
            case 4:
                rhinoMapX += rhinoSpeed / 1.4142;
                rhinoMapY += rhinoSpeed / 1.4142;
                break;
            case 5:

            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                //Collide NO movement
                rhinoMapX = skX + 8;
                rhinoMapY = skY;
                break;
        }
        rMove++;

    }

    var rhinoEating = function (eatingCount) {
        eat = 1;
        if (eatingCount <= 10) {
            eat = 1;
        }
        else if (eatingCount <= 20) {
            eat = 2;
        }

        else if (eatingCount <= 30) {
            eat = 3;
        }

        else if (eatingCount <= 40) {
            eat = 4;
        }
        else if (eatingCount > 40) {
            eat = 5;
        }

        return eat;

    }

    var rhinoChase = function (skierScore,scoreForChase) {
        rhinoSpeed = skierSpeed;
        rhinoAttack = false;
        if (skierScore >= scoreForChase) {
            rhinoAttack = true;
        }

        return {attack: rhinoAttack, speed : rhinoSpeed};
    }

    drawRhino = function () {
        if (!rhinoAttack)
            return;

        var skierAssetName = getRhinoAsset();
        var skierImage = loadedAssets[skierAssetName];
        ctx.drawImage(skierImage, rhinoMapX, rhinoMapY, skierImage.width, skierImage.height);
    }

    var getRhinoRect = function (rhinoImage) {
        rhino = {
            left: rhinoImage.x,
            right: rhinoImage.x + rhinoImage.width,
            top: rhinoImage.y + rhinoImage.height - 5,
            bottom: rhinoImage.y + rhinoImage.height
        };
    }


    var moveRhino = function () {
        if (!gameSetting.showRhino || gameSetting.gamePaused || !gameSetting.rhinoAttack)
            return;

        if (gameSetting.rhinoSkierCollide > 0) {
            eatValue = rhinoEating(gameSetting.rhinoSkierCollide);
            gameSetting.rhinoDirection = 6 + eatValue;
            if (eatValue > 4) {
                endGame();
            }
        }
        else if (gameSetting.rhinoDirection !== 0) {

            var collided = collision.rhinoSkierCollide();
            if (collided) {
                gameSetting.rhinoDirection = 5;
            } else {
                gameSetting.rhinoDirection = gameSetting.skierDirection;
            }

        }

        switch (gameSetting.rhinoDirection) {
            case 0:
                if (rMove <= 1) {
                    gameSetting.rhinoMapY = skY;
                    gameSetting.rhinoMapX = skX + Math.floor(gameWidth / 4);
                } else {
                    if (gameSetting.rhinoMapX < skX) {
                        gameSetting.rhinoMapX -= skX;
                        gameSetting.rhinoSkierCollide = 1;

                        gameSetting.skierCanMove = false;
                    }
                }
            case 1:
            gameSetting.rhinoMapX -= gameSetting.rhinoSpeed;
                break;
            case 2:
            gameSetting.rhinoMapX -= Math.round(gameSetting.rhinoSpeed / 1.4142);
            gameSetting.rhinoMapY += Math.round(gameSetting.rhinoSpeed / 1.4142);
                break;
            case 3:
            gameSetting.rhinoMapY += rhinoSpeed;
                break;
            case 4:
            gameSetting.rhinoMapX += gameSetting.rhinoSpeed / 1.4142;
            gameSetting.rhinoMapY += rgameSetting.hinoSpeed / 1.4142;
                break;
            case 5:

            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                //Collide NO movement
                gameSetting.rhinoMapX = gameSetting.skX + 8;
                gameSetting.rhinoMapY = gameSetting.skY;
                break;
        }
        rMove++;

    }

    return {};
}


var levels = function(){

    var changeLevel = function (scores, speed) {
        var changes = checkLevelChange(scores, speed, skierLevel);
        if (changes.level !== skierLevel) {
            skierLevel = changes.level;
            skierSpeed = changes.speed;
        }
    }

    var getLevelMaxAmount = function (level) {
        if (level === 1)
            return scorePerLevel;
        else
            return (Math.pow(1.5, level - 1) * scorePerLevel);

    }

    var checkLevelChange = function (score, speed, level) {

        var levelAmt = getLevelMaxAmount(level);
        
        //Level change score is exponential by 1.5 exponent the level you are in
        if (score >= levelAmt) {
            level += 1;
            speed += 1;
        }
        return { level: level, speed: speed };
    }


    return {checkLevelChange,getLevelMaxAmount,changeLevel};
}
// 
var higestScores = function(storage){

    const GAME_SCORES = "GameScores";
    var getlocalScores = function () {
        const scores = storage.getItem(GAME_SCORES);
        if (!scores) {
            return [];
        } else
            return JSON.parse(scores)
    }

    var highestScores = function () {
        var scores = getScores(10, true, "score", "desc");
        return scores;
    }

    var getScores = function (limit, sortAble, sortByField, sortDirection) {
        const scores = getlocalScores();
        var list = _.orderBy(scores, [sortByField], [sortDirection]);
        return list.slice(0, limit);
    }
    var showTopScores = function () {
        var topScores = highestScores();
        $("#topscores ol").html("");
        var scoresLength = topScores.length;
        for (var i = 0; i < scoresLength; i++) {
            $(displaySingleScore(topScores[i])).appendTo("#topscores ol");
        }

    }
    
    var displaySingleScore = function (score) {
        return '<li>' + score.name + '   : <strong>' + score.score + '</li>';
    }
    var saveScore = function (name, score) {

        let oldScores = getlocalScores();
        oldScores.push({ name: name, score: score })
        let valueJson = JSON.stringify(oldScores);
        localStorage.setItem(GAME_SCORES, valueJson);

    }

    var saveScores = function (name, score) {
            saveScore(name,score);
            return highestScores();
    }
}

var scores = function(gameControls, rhinoCtrl,levelMgt){
    
    var actionScores = {
        'move': 1,
        'collide': -50,
        'rhinoEat': -100
    };

    var calculateScore = function (scoreItem) {
        if (gameControls.hasMoved)
            addScore(actionScores[scoreItem] * (gameControls.skierSpeed * gameControls.skierLevel) + 0);
    }

    var addScore = function (itemScore) {
        if (!gamePaused) {
            itemScore = isNaN(itemScore) ? 0 : itemScore;
            skierScore += (itemScore + 0);
            addScoreListeners(itemScore,skierScore, skierSpeed, skierLevel);
        }
    }

    var addScoreListeners = function (scoreJustAdded,skierScore, skierSpeed, skierLevel) {
        levelMgt.changeLevel(skierScore, skierSpeed, skierLevel)
        var rhino = rhinoCtrl.rhinoChase(skierScore,scoreForChase);
        rhinoSpeed = rhino.speed;
        rhinoAttack = rhino.attack;
    }

    return {calculateScore, addScore, addScoreListeners}


}

var collisions= function(){
    var rhinoSkierCollide = function () {
        if (rhinoSkierCollide > 0)
            return rhinoSkierCollide;
        var skierImage = getSkierImage(skierDirection);
        var skierRect = getSkierRect(skierImage);

        var rhinoImage = getRhinoAsset();
        var rhonoRec = getRhinoRect(rhinoImage);
        var collision = intersectRect(skierRect, rhonoRec);
        if (collision) {
            rhinoSkierCollide = 1;
            skierCanMove = false;
        }



        return collision;


    }

    var skierHitObstacle = function () {
        var skierAssetName = getSkierAsset(skierDirection);

        var skierImage = loadedAssets[skierAssetName];


        var skierRect = {
            left: skierMapX + gameWidth / 2,
            right: skierMapX + skierImage.width + gameWidth / 2,
            top: skierMapY + skierImage.height - 5 + gameHeight / 2,
            bottom: skierMapY + skierImage.height + gameHeight / 2
        };

        var collision = _.find(obstacles, function (obstacle) {
            var obstacleImage = loadedAssets[obstacle.type];
            var obstacleRect = {
                left: obstacle.x,
                right: obstacle.x + obstacleImage.width,
                top: obstacle.y + obstacleImage.height - 5,
                bottom: obstacle.y + obstacleImage.height
            };

            return intersectRect(skierRect, obstacleRect);
        });

        if (collision) {
            if (skierDirection !== 0) {
                livesCount--;
                addScore(actionScores["collide"]);
                if (livesCount <= 0) {
                    console.log("Reached Max Collission")
                    endGame()
                }
            }
            skierDirection = 0;
        }
    };

    var intersectRect = function (r1, r2) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };


    return{rhinoSkierCollide,skierHitObstacle,intersectRect}
}

var assets = function(){
    var getSkierImage = function (skierDirection) {
        var skierAssetName = getSkierAsset(skierDirection);
        return loadedAssets[skierAssetName];
    }

    var getSkierAsset = function (skierDirection) {
        var skierAssetName;
        switch (skierDirection) {
            case 0:
                skierAssetName = 'skierCrash';
                break;
            case 1:
                skierAssetName = 'skierLeft';
                break;
            case 2:
                skierAssetName = 'skierLeftDown';
                break;
            case 3:
                skierAssetName = 'skierDown';
                break;
            case 4:
                skierAssetName = 'skierRightDown';
                break;
            case 5:
                skierAssetName = 'skierRight';
                break;
            case 6:
                skierAssetName = "skierJump" + jumpToShow(skierJumpingCount);
                break;
            default:
                console.log("None FOund : " + skierDirection);
                break;
        }

        return skierAssetName;
    };

    var getRhinoAsset = function (rhinoDirection) {
        var skierAssetName;

        switch (rhinoDirection) {
            case 0:
                skierAssetName = 'rhino';
                break;
            case 1:
                skierAssetName = 'rhinoRunLeft';
                break;
            case 2:
            case 3:
            case 4:
                skierAssetName = 'rhinoRunLeft2';
                break;
            case 5:
                skierAssetName = 'rhinoLift';
                break;
            case 6:
                skierAssetName = 'rhinoLiftMouthOpen';
                break;
            case 7:
            case 8:
            case 9:
            case 10:
                skierAssetName = "rhinoLiftEat" + (rhinoDirection - 6);
                rhinoSkierCollide++;
                break;
            //Collide NO movement
        }
        console.log("rhino Skier : " + skierAssetName);

        return skierAssetName;
    };

    return {getSkierAsset, getSkierImage};
}

var skier = function(gameSetting){
    var skierMoved = function (oldX, oldY) {

        scoreItem = "";
        if (oldX === gameSetting.skierMapX && oldY === gameSetting.skierMapY) {
            gameSetting.hasMoved = false;
        } else {
            scoreItem = "move";
            gameSetting.hasMoved = true;
        }

    }
}

var jump = function(){
    var jumpSkier = function () {
        skierJumpingCount = 1;
        skierJumping = true;
        oldDirection = skierDirection;
        skierDirection = 6;
    }

    var jumpStop = function () {
        skierJumpingCount = 0;
        skierJumping = false;
        skierDirection = oldDirection;

    }

    var jumpCoordinates = function (jumpCount, width,x, y) {

        var jumpCountToShow = jumpToShow(jumpCount);

        //Greater than 3  start falling off or returning from fall
        if (jumpCountToShow > 3) {
            y -=((5 - jumpCountToShow) * skierSpeed)
        } else if (jumpCountToShow <= 3) {
            //going up 
            y +=((jumpCountToShow) * skierSpeed)
        }
        skierJumpingCount++;
        return { x: x, y: y };

    }

    var jumpToShow = function (jumpCount) {
        var jump = Math.floor(jumpCount / 20) + 1;

        if (jumpCount >= 100) {
            jump = 5;
            jumpStop();
        }
        return jump;

    }
}


var skifree = {
        init : function(){

        },

        start:function(){

        }
}


