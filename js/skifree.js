//main skifree endpoint
/**
 * Main skifree endpint
 */
var skifree = function () {
    //set game settings
    gameSetting = defaultSettings;
    gameSetting.gameWidth = window.innerWidth * 0.8; //80% of the screen  /20% for  
    gameSetting.gameHeight = window.innerHeight;
    var html = gameHtml();

    var canvas = html.canvas; //canvas
    var details = html.details; //html details
    $('body').html("").append(details).append(canvas);

    var ctx = canvas[0].getContext('2d');
    var jump = jumper(gameSetting); //initialise jump
    var asset = assets(gameSetting,gameSetting.skierJumpingCount,jump); //initialise asset
    var level = levels(gameSetting); //initialise level
    var obstacle = obstacles(ctx, gameSetting,asset); //initialise obstacles
    var scores = higestScores(localStorage); //initialise higest scores
    var speed = speedSetting(gameSetting); //initialise higest scores
    var rhinoCtl = rhinoActions(gameSetting); //intialise rhino actions
    var scoreCalculation = scoreCal(gameSetting, rhinoCtl, level) //initialisation for scores calculator
    var collision = collisions(gameSetting, asset, scoreCalculation,obstacle); //collision initialisation
    var rhino = rhinoItem(gameSetting, canvas, ctx, asset, collision); //rhino initialisation
    var skier = skierItem(gameSetting, ctx, asset, jump, obstacle,scoreCalculation);//skier initialisation

 
    /**
     * the game loop flow
     */
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

        obstacle.draw();
    
        ctx.restore();

        requestAnimationFrame(gameLoop);

    };



    /**
     * handles all key events per the key pressed
     * @param {number} keypressed 
     */
    var keyEventsHandler = function (keypressed) {
       
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
                speed.increaseSpeed();
                break;
            case 68: //d for slower
                
            speed.decreaseSpeed();
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


    //pause or resume the game
    var pauseResume = function () {
        gameSetting.gamePaused = !gameSetting.gamePaused;
    }

    //check if the game has ended
    var checkStatus =function(){
        if(gameSetting.gameEnded){
            var cname = prompt("Game Ended your score was " + gameSetting.skierScore + "\n\nKindly enter your name.");
            scores.saveScores(cname, gameSetting.skierScore);
            scores.showTopScores();
            gameSetting.gameEnded = false;
            restart();

            
        }
    }

    //clears the canvas
    var clearCanvas = function () {
        ctx.clearRect(0, 0, gameSetting.gameWidth, gameSetting.gameHeight);
    };

    //display html for the scores level lives left status
    var displayDetails = function () {
        $("#scores span").html(gameSetting.skierScore);
        $("#speed span").html(gameSetting.skierSpeed);
        $("#collisions span").html(gameSetting.livesCount);
        $("#level span").html(gameSetting.skierLevel);
        $("#status span").html(gameSetting.gamePaused ? "Paused" : "Playing");
    }

    //init for the game main start endpoint
    var initGame = function () {
        setupKeyhandler();
        asset.loadAssets().then(function () {
            obstacle.placeInitialObstacles();
            requestAnimationFrame(gameLoop);
        });
    };


    //restart the game
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

