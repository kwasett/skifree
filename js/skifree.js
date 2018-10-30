var skifree = function () {
    gameSetting = defaultSettings;
    gameSetting.gameWidth = window.innerWidth * 0.8; //80% of the screen
    gameSetting.gameHeight = window.innerHeight;
    var html = gameHtml();

    var canvas = html.canvas;
    var details = html.details;
    $('body').html("").append(details).append(canvas);

    var ctx = canvas[0].getContext('2d');
    var jump = jumper(gameSetting);
    var asset = assets(gameSetting,gameSetting.skierJumpingCount,jump);
    var level = levels(gameSetting);
    var obstacle = obstacles(ctx, gameSetting,asset);
    var scores = higestScores(localStorage);
    var rhinoCtl = rhinoActions(gameSetting);
    var scoreCalculation = scoreCal(gameSetting, rhinoCtl, level)
    var collision = collisions(gameSetting, asset, scoreCalculation,obstacle);
    var rhino = rhinoItem(gameSetting, canvas, ctx, asset, collision);
    var skier = skierItem(gameSetting, ctx, asset, jump, obstacle,scoreCalculation);

    var gameLoop = function () {

        ctx.save();

        // Retina support
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        clearCanvas();

        skier.move();
        rhino.move();
        scoreCalculation.calculateScore();
        displayDetails();

        collision.skierHitObstacle();
        checkStatus();
        skier.draw();
        rhino.draw();

        obstacle.drawObstacles();
    
        ctx.restore();

        requestAnimationFrame(gameLoop);

    };


    var keyEventsHandler = function (keypressed) {
        console.log("Keypressed : " + keypressed);
        switch (keypressed) {
            case 37: // left
                if (gameSetting.skierDirection === 1) {
                    gameSetting.skierMapX -= gameSetting.skierSpeed;
                    obstacle.placeNewObstacle(gameSetting.skierDirection);
                }
                else {
                    gameSetting.skierDirection = 1;
                }
                break;
            case 39: // right
                if (gameSetting.skierDirection === 5) {
                    gameSetting.skierMapX += gameSetting.skierSpeed;
                    obstacle.placeNewObstacle(gameSetting.skierDirection);
                }
                else {
                    gameSetting.skierDirection++;
                }
                break;
            case 38: // up
                if (gameSetting.skierDirection === 1 || gameSetting.skierDirection === 5) {
                    gameSetting.skierMapY -= gameSetting.skierSpeed;
                    obstacle.placeNewObstacle(6);
                }
                break;
            case 40: // down
                gameSetting.skierDirection = 3;
                break;
            case 32: //spacebar
                pauseResume();
                break;

            case 70: //F for faster
                gameSetting.skierSpeed += 1;
                break;
            case 68: //d for slower
                gameSetting.skierSpeed -= 1;
                break;
            case 82: //R for reset of the game
                restart();
                break;
            case 74: //J for reset of the game
                jump.start();

                break;



        }
    }

    var setupKeyhandler = function () {

        $(window).keydown(function (event) {
            keyEventsHandler(event.which);
            event.preventDefault();
        });
    };

    var pauseResume = function () {
        gameSetting.gamePaused = !gameSetting.gamePaused;
    }

    var checkStatus =function(){
        if(gameSetting.gameEnded){
            var cname = prompt("Game Ended your score was " + gameSetting.skierScore + "\n\nKindly enter your name.");
            scores.saveScores(cname, gameSetting.skierScore);
            scores.showTopScores();
            gameSetting.gameEnded = false;
            restart();

            
        }
    }

    var clearCanvas = function () {
        ctx.clearRect(0, 0, gameSetting.gameWidth, gameSetting.gameHeight);
    };

    var displayDetails = function () {
        $("#scores span").html(gameSetting.skierScore);
        $("#speed span").html(gameSetting.skierSpeed);
        $("#collisions span").html(gameSetting.livesCount);
        $("#level span").html(gameSetting.skierLevel);
        $("#status span").html(gameSetting.gamePaused ? "Paused" : "Playing");
    }

    var initGame = function () {
        setupKeyhandler();
        asset.loadAssets().then(function () {
            obstacle.placeInitialObstacles();
            requestAnimationFrame(gameLoop);
        });
    };


    var restart = function () {
        console.log("reseting");
        window.location.reload();
    }



    scores.showTopScores();
    initGame(gameLoop);



}

$(document).ready(function () {
    var gmCtrl = gameControl();
    gmCtrl.startGame();

});

