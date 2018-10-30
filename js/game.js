$(document).ready(function () {

    var assets = {
        'skierCrash': 'img/skier_crash.png',
        'skierLeft': 'img/skier_left.png',
        'skierLeftDown': 'img/skier_left_down.png',
        'skierDown': 'img/skier_down.png',
        'skierRightDown': 'img/skier_right_down.png',
        'skierRight': 'img/skier_right.png',

        'tree': 'img/tree_1.png',
        'treeCluster': 'img/tree_cluster.png',
        'rock1': 'img/rock_1.png',
        'rock2': 'img/rock_2.png',

        'rhino': 'img/rhino_default.png',
        'rhinoRunLeft': 'img/rhino_run_left.png',
        'rhinoRunLeft2': 'img/rhino_run_left_2.png',
        'rhinoLift': 'img/rhino_lift.png',
        'rhinoLiftMouthOpen': 'img/rhino_lift_mouth_open.png',
        'rhinoLiftEat1': 'img/rhino_lift_eat_1.png',
        'rhinoLiftEat2': 'img/rhino_lift_eat_2.png',
        'rhinoLiftEat3': 'img/rhino_lift_eat_3.png',
        'rhinoLiftEat4': 'img/rhino_lift_eat_4.png',


        'skierJump1': 'img/skier_jump_1.png',
        'skierJump2': 'img/skier_jump_2.png',
        'skierJump3': 'img/skier_jump_3.png',
        'skierJump4': 'img/skier_jump_4.png',
        'skierJump5': 'img/skier_jump_5.png'


    };

    var actionScores = {
        'move': 1,
        'collide': -50,
        'rhinoEat': -1000
    };

    var loadedAssets = {};

    var obstacleTypes = [
        'tree',
        'treeCluster',
        'rock1',
        'rock2'
    ];

    var obstacles = [];

    var gameWidth = window.innerWidth * 0.8; //80% of the screen
    var gameHeight = window.innerHeight;
    var canvas = $('<canvas></canvas>')
        .attr('width', gameWidth * window.devicePixelRatio)
        .attr('height', gameHeight * window.devicePixelRatio)
        .css({
            width: gameWidth + 'px',
            height: gameHeight + 'px',
            border: 'solid 2px #ddd',
            float: 'left'
        });


    var details = $('<div></div>')
        .attr("id", "details")
        .css({
            width: (0.18 * window.innerWidth) + 'px',
            height: gameHeight,
            float: 'right'
        })
        .append($("<div><em>To Pause or Resume use the space Bar , Press F to make it move faster and D for slow down</em></div>").attr("id", "status"))
        .append($("<div>Scores : <span></span></div>").attr("id", "scores"))
        .append($("<div>Speed : <span></span></div>").attr("id", "speed"))
        .append($("<div>Level : <span></span></div>").attr("id", "level"))
        .append($("<div>No of Lives : <span></span></div>").attr("id", "collisions"))
        .append($("<div>Status : <span></span></div>").attr("id", "status"))
        .append($("<div><br /><br /><h3>Top Scores</h3><ol></ol></div>").attr("id", "topscores"));
    $('body').append(details).append(canvas);

    var ctx = canvas[0].getContext('2d');

    var skierDirection = 5;
    var skierMapX = 0;
    var skierMapY = 0;

    var skX, skY = 0;
    var defaultSpeed = 8;
    var skierSpeed = defaultSpeed;
    var skierLevel = 1;
    var scorePerLevel = 4000;
    var skierScore = 0;
    var scoreForChase = 1000;
    var showRhino = true;
    var oldDirection = 1;


    var rhinoSpeed = skierSpeed;
    var rhinoMapX = 0;
    var rhinoMapY = 0;
    var rhinoRadius =0;
    var rhinoAttack = false;
    var rhinoDirection = 0;
    var rhinoSkierCollide = 0;
    var rhinoCenterCoordinates={x:0, y:0};

    var maxCollisions = 3;
    var livesCount = maxCollisions;
    var gamePaused = false;
    var scoreItem = "";

    var hasMoved = false;
    var skierCanMove = true;
    var skierJumping = false;
    var skierJumpingCount = 0;

    //tobe delete

    var rMove = 0;

    var clearCanvas = function () {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
    };


    var displayDetails = function () {
        $("#scores span").html(skierScore);
        $("#speed span").html(skierSpeed);
        $("#collisions span").html(livesCount);
        $("#level span").html(skierLevel);
        $("#status span").html(gamePaused ? "Paused" : "Playing");
    }

    var rhinoPosition =function(x,centerxy,radius, speed){
        x-=speed;
        y = Math.sqrt(Math.pow(radius,2) - Math.pow(x-centerxy.x,2)) +centerxy.y
        console.log("RHino Pos : {"+x+","+y+"}");
        return {x,y};
    }
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
                    rhinoRadius = (gameWidth/4)+(defaultSpeed*5);
                    rhinoCenterCoordinates = {y:skY-rhinoRadius, x:skX}
                    rhinoMapX= rhinoCenterCoordinates.x+rhinoRadius;
                    var posRhino = rhinoPosition(rhinoMapX,rhinoCenterCoordinates,rhinoRadius,skierSpeed)
                    rhinoMapY = posRhino.y;
                } else {
                    if (rhinoMapX < skX) {
                        rhinoMapX -= skX;
                        rhinoSkierCollide = 1;

                        skierCanMove = false;
                    }else{
                        var posRhino = rhinoPosition(rhinoMapX,rhinoCenterCoordinates,rhinoRadius,skierSpeed)
                        rhinoMapY = posRhino.y;
                        rhinoMapX = posRhino.x;
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
                rhinoMapX = skX + 8;
                rhinoMapY = skY;
                break;
        }
        rMove++;

    }

    var moveSkier = function () {
        if (gamePaused || !skierCanMove)
            return;
        var oldx = skierMapX, oldy = skierMapY;
        switch (skierDirection) {
            case 1:
                skierMapX -= skierSpeed;

                placeNewObstacle(skierDirection);
                break;
            case 2:
                skierMapX -= Math.round(skierSpeed / 1.4142);
                skierMapY += Math.round(skierSpeed / 1.4142);

                placeNewObstacle(skierDirection);
                break;
            case 3:
                skierMapY += skierSpeed;

                placeNewObstacle(skierDirection);
                break;
            case 4:
                    skierMapX += skierSpeed / 1.4142;
                    skierMapY += skierSpeed / 1.4142;
    
                    placeNewObstacle(skierDirection);
                    break;
            case 6:

                    var xy = jumpCoordinates(skierJumpingCount,16,skierMapX,skierMapY)
                        skierMapX = xy.x;
                        skierMapY = xy.y;
        
                        placeNewObstacle(skierDirection);
                        break;
        }

        skierMoved(oldx, oldy);

    };

    var skierMoved = function (oldX, oldY) {

        scoreItem = "";
        if (oldX === skierMapX && oldY === skierMapY) {
            hasMoved = false;
        } else {
            scoreItem = "move";
            hasMoved = true;
        }
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

    var calculateScore = function () {
        if (hasMoved)
            addScore(actionScores[scoreItem] * (skierSpeed * skierLevel) + 0);
    }

    var addScore = function (itemScore) {
        if (!gamePaused) {
            itemScore = isNaN(itemScore) ? 0 : itemScore;
            skierScore += (itemScore + 0);
            addScoreListeners(itemScore,skierScore, skierSpeed, skierLevel);
        }
    }

    var addScoreListeners = function (scoreJustAdded,skierScore, skierSpeed, skierLevel) {
        changeLevel(skierScore, skierSpeed, skierLevel)
        var rhino = rhinoChase(skierScore,scoreForChase);
        rhinoSpeed = rhino.speed;
        rhinoAttack = rhino.attack;
    }


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

    var rhinoChase = function (skierScore,scoreForChase) {
        rhinoSpeed = skierSpeed;
        rhinoAttack = false;
        if (skierScore >= scoreForChase) {
            rhinoAttack = true;
        }

        return {attack: rhinoAttack, speed : rhinoSpeed};
    }


    var drawDemoRhino = function () {
        var skierImage = loadedAssets["rhino"];
    }

    drawRhino = function () {
        if (!rhinoAttack)
            return;
        var skierAssetName = getRhinoAsset();
        var skierImage = loadedAssets[skierAssetName];
        console.log("Rhino Pos Draw {"+rhinoMapX+":::"+rhinoMapY+"}")
        ctx.drawImage(skierImage, rhinoMapX, rhinoMapY, skierImage.width, skierImage.height);
    }

    var getRhinoAsset = function () {
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


    var jumpToShow = function (jumpCount) {
        var jump = Math.floor(jumpCount / 20) + 1;

        if (jumpCount >= 100) {
            jump = 5;
            jumpStop();
        }
        return jump;

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


    var drawSkier = function (skierDirection,skierJumpingCount, skierJumping) {
        var skierAssetName = getSkierAsset(skierDirection);
        var skierImage = loadedAssets[skierAssetName];
        var x = (gameWidth - skierImage.width) / 2;
        var y = (gameHeight - skierImage.height) / 2;
        if (skierJumping) {
            var xy = jumpCoordinates(skierJumpingCount, skierImage.width/2,x, y)
            skX = xy.x;
            skY = xy.y;
        }else {
            skX = x;
            skY = y;
        }


        ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);

    };

    var drawObstacles = function () {
        var newObstacles = [];

        _.each(obstacles, function (obstacle) {
            var obstacleImage = loadedAssets[obstacle.type];
            var x = obstacle.x - skierMapX - obstacleImage.width / 2;
            var y = obstacle.y - skierMapY - obstacleImage.height / 2;

            if (x < -100 || x > gameWidth + 50 || y < -100 || y > gameHeight + 50) {
                return;
            }

            ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);

            newObstacles.push(obstacle);
        });

        obstacles = newObstacles;
    };

    var placeInitialObstacles = function () {
        var numberObstacles = Math.ceil(_.random(5, 7) * (gameWidth / 800) * (gameHeight / 500));

        var minX = -50;
        var maxX = gameWidth + 50;
        var minY = gameHeight / 2 + 100;
        var maxY = gameHeight + 50;

        for (var i = 0; i < numberObstacles; i++) {
            placeRandomObstacle(minX, maxX, minY, maxY);
        }

        obstacles = _.sortBy(obstacles, function (obstacle) {
            var obstacleImage = loadedAssets[obstacle.type];
            return obstacle.y + obstacleImage.height;
        });
    };

    var placeNewObstacle = function (direction) {
        var shouldPlaceObstacle = _.random(1, 8);
        if (shouldPlaceObstacle !== 8) {
            return;
        }

        var leftEdge = skierMapX;
        var rightEdge = skierMapX + gameWidth;
        var topEdge = skierMapY;
        var bottomEdge = skierMapY + gameHeight;

        switch (direction) {
            case 1: // left
                placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
                break;
            case 2: // left down
                placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
                placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 3: // down
                placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 4: // right down
                placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
                placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                break;
            case 5: // right
                placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
                break;
            case 6: // up
                placeRandomObstacle(leftEdge, rightEdge, topEdge - 50, topEdge);
                break;
        }
    };

    var placeRandomObstacle = function (minX, maxX, minY, maxY) {
        var obstacleIndex = _.random(0, obstacleTypes.length - 1);

        var position = calculateOpenPosition(minX, maxX, minY, maxY);

        obstacles.push({
            type: obstacleTypes[obstacleIndex],
            x: position.x,
            y: position.y
        })
    };

    var calculateOpenPosition = function (minX, maxX, minY, maxY) {
        var x = _.random(minX, maxX);
        var y = _.random(minY, maxY);

        var foundCollision = _.find(obstacles, function (obstacle) {
            return x > (obstacle.x - 50) && x < (obstacle.x + 50) && y > (obstacle.y - 50) && y < (obstacle.y + 50);
        });

        if (foundCollision) {
            return calculateOpenPosition(minX, maxX, minY, maxY);
        }
        else {
            return {
                x: x,
                y: y
            }
        }
    };


    var checkIfRhinoSkierCollide = function () {
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

    var getRhinoImage = function () {

        var skierAssetName = getRhinoAsset();
        return loadedAssets[skierAssetName];
    }

    var getSkierImage = function (skierDirection) {

        var skierAssetName = getSkierAsset(skierDirection);
        return loadedAssets[skierAssetName];
    }

    var getSkierRect = function (skierImage) {
        return {
            left: skierMapX + gameWidth / 2,
            right: skierMapX + skierImage.width + gameWidth / 2,
            top: skierMapY + skierImage.height - 5 + gameHeight / 2,
            bottom: skierMapY + skierImage.height + gameHeight / 2
        };
    }

    var getRhinoRect = function (rhinoImage) {
        rhino = {
            left: rhinoImage.x,
            right: rhinoImage.x + rhinoImage.width,
            top: rhinoImage.y + rhinoImage.height - 5,
            bottom: rhinoImage.y + rhinoImage.height
        };
    }

    var checkIfSkierHitObstacle = function () {
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

    var gameLoop = function () {

        ctx.save();

        // Retina support
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        clearCanvas();

        moveSkier();
        moveRhino();
        calculateScore();
        displayDetails();

        checkIfSkierHitObstacle();

        drawSkier(skierDirection,skierJumpingCount, skierJumping);
        drawRhino();

        drawDemoRhino();
        drawObstacles();

        ctx.restore();

        requestAnimationFrame(gameLoop);

    };

    var loadAssets = function () {
        var assetPromises = [];

        _.each(assets, function (asset, assetName) {
            var assetImage = new Image();
            var assetDeferred = new $.Deferred();

            assetImage.onload = function () {
                assetImage.width /= 2;
                assetImage.height /= 2;

                loadedAssets[assetName] = assetImage;
                assetDeferred.resolve();
            };
            assetImage.src = asset;

            assetPromises.push(assetDeferred.promise());
        });

        return $.when.apply($, assetPromises);
    };

    var saveScores = function (name, score) {

        let oldScores = getlocalScores();
        oldScores.push({ name: name, score: score })
        let valueJson = JSON.stringify(oldScores);
        localStorage.setItem(GAME_SCORES, valueJson);

        var topscores = highestScores();

    }

    
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

    const GAME_SCORES = "GameScores";
    var getlocalScores = function () {
        const scores = localStorage.getItem(GAME_SCORES);
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

    var pauseResume = function () {
        gamePaused = !gamePaused;
    }

    var endGame = function () {
        var cname = prompt("Game Ended your score was " + skierScore + "\n\nKindly enter your name.");
        saveScores(cname, skierScore);
        showTopScores();
       
        reset()
    }


    var keyEventsHandler = function (keypressed) {
        console.log("Keypressed : "+keypressed);
        switch (keypressed) {
            case 37: // left
                if (skierDirection === 1) {
                    skierMapX -= skierSpeed;
                    placeNewObstacle(skierDirection);
                }
                else {
                    skierDirection = 1;
                }
                break;
            case 39: // right
                if (skierDirection === 5) {
                    skierMapX += skierSpeed;
                    placeNewObstacle(skierDirection);
                }
                else {
                    skierDirection++;
                }
                break;
            case 38: // up
                if (skierDirection === 1 || skierDirection === 5) {
                    skierMapY -= skierSpeed;
                    placeNewObstacle(6);
                }
                break;
            case 40: // down
                skierDirection = 3;
                break;
            case 32: //spacebar
                pauseResume();
                break;

            case 70: //F for faster
                skierSpeed += 1;
                break;
            case 68: //d for slower
                skierSpeed -= 1;
                break;
            case 82: //R for reset of the game
                reset();
            case 74: //J for reset of the game
                jumpSkier();

                break;



        }
    }
    var setupKeyhandler = function () {

        $(window).keydown(function (event) {
            keyEventsHandler(event.which);
            event.preventDefault();
        });
    };

    var defaultSettings = function () {
         skierDirection = 5;
         skierMapX = 0;
         skierMapY = 0;
    
         skX, skY = 0;
         defaultSpeed = 8;
         skierSpeed = defaultSpeed;
         skierLevel = 1;
         scorePerLevel = 4000;
         skierScore = 0;
         scoreForChase = 1000;
         showRhino = true;
         oldDirection = 1;
    
    
         rhinoSpeed = skierSpeed;
         rhinoMapX = 0;
         rhinoMapY = 0;
         rhinoRadius =0;
         rhinoAttack = false;
         rhinoDirection = 0;
         rhinoSkierCollide = 0;
         rhinoCenterCoordinates={x:0, y:0};
    
         maxCollisions = 3;
         livesCount = maxCollisions;
         gamePaused = false;
         scoreItem = "";
    
         hasMoved = false;
         skierCanMove = true;
         skierJumping = false;
         skierJumpingCount = 0;

        obstacleTypes = [
            'tree',
            'treeCluster',
            'rock1',
            'rock2'
        ];

        obstacles = [];

    };

    var reset = function () {
        defaultSettings();
        
        initGame(gameLoop);
    }

    var initGame = function () {
        setupKeyhandler();
        loadAssets().then(function () {
            placeInitialObstacles();
            requestAnimationFrame(gameLoop);
        });
    };

    showTopScores();
    initGame(gameLoop);
});