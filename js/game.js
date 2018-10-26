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

    var gameWidth = window.innerWidth *0.8; //80% of the screen
    var gameHeight = window.innerHeight;
    var canvas = $('<canvas></canvas>')
        .attr('width', gameWidth * window.devicePixelRatio)
        .attr('height', gameHeight * window.devicePixelRatio)
        .css({
            width: gameWidth + 'px',
            height: gameHeight + 'px',
            border: 'solid 2px #ddd',
            float : 'left'
        });
    var details = $('<div></div>')
        .attr("id", "details")
        .css({
            width : (0.18 * window.innerWidth)+'px', 
            height: gameHeight,
            float : 'right' 
        })
        .append($("<div><em>To Pause or Resume use the space Bar , Press F to make it move faster and D for slow down</em></div>").attr("id", "status"))
        .append($("<div>Scores : <span></span></div>").attr("id", "scores"))
        .append($("<div>Speed : <span></span></div>").attr("id", "speed"))
        .append($("<div>No of Lives : <span></span></div>").attr("id", "collisions"))
        .append($("<div>Status : <span></span></div>").attr("id", "status"))
         .append($("<div><br /><br /><h3>Top Scores</h3><ol></ol></div>").attr("id", "topscores"));
    $('body').append(details).append(canvas);
    var ctx = canvas[0].getContext('2d');

    var skierDirection = 5;
    var skierMapX = 0;
    var skierMapY = 0;
    var rhinoMapX = 0;
    var rhinoMapY = 0;
    var skierSpeed = 10;
    var rhinoSpeed = skierSpeed * 1.2;
    var skierLevel = 1;
    var skierScore = 0;
    var scoreForChase = 5000;
    var rhinoAttack = false;
    var maxCollisions = 3;
    var livesCount = maxCollisions;
    var gamePaused = false;
    var scoreItem = "";

    var hasMoved = false;

    var clearCanvas = function () {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
    };


    var displayDetails = function () {
        $("#scores span").html(skierScore);
        $("#speed span").html(skierSpeed);
        $("#collisions span").html(livesCount);
        $("#status span").html(gamePaused ? "Paused" : "Playing");
    }

    var moveRhino = function () {
        if (gamePaused)
            return;

        switch (skierDirection) {
            case 1:
                rhinoMapX -= rhinoSpeed;
                break;
            case 2:
                rhinoMapX -= Math.round(rhinoSpeed / 1.4142);
                rhinoMapY += Math.round(rhinoSpeed / 1.4142);
                break;
            case 3:
                rhinoMapY += rhinopeed;
                break;
            case 4:
                rhinoMapX += rhinoSpeed / 1.4142;
                rhinoMapY += rhinoSpeed / 1.4142;
                break;
        }
    }

    var moveSkier = function () {
        if (gamePaused)
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
        }

        skierMoved(oldx, oldy);

    };


    var skierMoved = function (oldX, oldY) {

        scoreItem = "";
        if (oldX === skierMapX && oldY === skierMapY) {

            hasMoved = false;
        } else {
            scoreItem = "move"; hasMoved = true;
        }

    }

    var showTopScores = function(){
        var topScores = highestScores();
        $("#topscores ol").html("");
        var scoresLength = topScores.length;
        for (var i = 0; i < scoresLength; i++) {
            $(displaySingleScore(topScores[i])).appendTo("#topscores ol");
            //Do something
        }

    }

    var  displaySingleScore = function(score){
        return '<li>'+score.name +'   : <strong>'+score.score+'</li>';
    }

    var calculateScore = function () {
        if (hasMoved)
            addScore(actionScores[scoreItem] * (skierSpeed * skierLevel) + 0);
    }
    var addScore = function (itemScore) {
        if (!gamePaused) {
            console.log("Old Score Value :" + skierScore);
            itemScore = isNaN(itemScore) ? 0 : itemScore;
            skierScore += (itemScore + 0);
        }
    }


    var rhinoChase = function () {
        if (itemScore >= scoreForChase) {
            drawRhino();
        }
    }


    drawRhino = function () {

        ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
    }

    var getRhinoAsset = function () {
        var skierAssetName;
        switch (skierDirection) {
            case 0:
                skierAssetName = 'rhinoEat';
                break;
            case 1:
                skierAssetName = 'rhinoLeft';
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
            default:
                console.log("None FOund : " + skierDirection);
                break;
        }

        return skierAssetName;
    };

    var getSkierAsset = function () {
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
            default:
                console.log("None FOund : " + skierDirection);
                break;
        }

        return skierAssetName;
    };

    var drawSkier = function () {
        var skierAssetName = getSkierAsset();
        var skierImage = loadedAssets[skierAssetName];
        var x = (gameWidth - skierImage.width) / 2;
        var y = (gameHeight - skierImage.height) / 2;

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

    var checkIfSkierHitObstacle = function () {
        var skierAssetName = getSkierAsset();

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

        calculateScore();
        displayDetails();

        checkIfSkierHitObstacle();

        drawSkier();

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

        var topscores= highestScores();
        
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
        console.log(JSON.stringify(scores));
        return scores;
    }

    var getScores = function (limit, sortAble, sortByField, sortDirection) {
            const scores = getlocalScores();
            var list =  _.orderBy(scores, [sortByField],[sortDirection]);
            return list.slice(1,limit);
    }

    var pauseResume = function () {
        gamePaused = !gamePaused;
    }



    var endGame = function () {
        var cname = prompt("Game Ended your score was " + skierScore+"\n\nKindly enter your name.");
        saveScores(cname,skierScore);
        showTopScores();
        reset()
    }


    var setupKeyhandler = function () {
        $(window).keydown(function (event) {
            console.log("Key Presed : " + event.which);
            switch (event.which) {
                case 37: // left

                    if (skierDirection === 1) {
                        skierMapX -= skierSpeed;
                        placeNewObstacle(skierDirection);
                    }
                    else {
                        console.log("Key AM sure colided : " + skierDirection);
                        skierDirection = 1;
                    }
                    event.preventDefault();
                    break;
                case 39: // right
                    if (skierDirection === 5) {
                        skierMapX += skierSpeed;
                        placeNewObstacle(skierDirection);
                    }
                    else {
                        skierDirection++;
                    }
                    event.preventDefault();
                    break;
                case 38: // up
                    if (skierDirection === 1 || skierDirection === 5) {
                        skierMapY -= skierSpeed;
                        placeNewObstacle(6);
                    }
                    event.preventDefault();
                    break;
                case 40: // down
                    skierDirection = 3;
                    event.preventDefault();
                    break;
                case 32: //spacebar
                    pauseResume();
                    event.preventDefault();
                    break;

                case 70: //F for faster
                    skierSpeed *= 2;
                    event.preventDefault();
                    break;
                case 68: //d for slower
                    skierSpeed /= 2;
                    event.preventDefault();
                    break;
                case 82: //R for reset of the game

                    reset();
                    event.preventDefault();
                    break;



            }
        });
    };

    var defaultSettings = function () {
         skierDirection = 5;
         skierMapX = 0;
         skierMapY = 0;
         skierSpeed = 8;
         skierLevel = 1;
         skierScore = 0;
         gamePaused = false;
         livesCount = maxCollisions;
       

         loadedAssets = {};

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