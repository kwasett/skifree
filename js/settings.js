//list of all global gamesettings
var defaultSettings = {
    skierDirection : 5,
    skierMapX : 0,
    skierMapY : 0,

    skX:0, skY : 0,
    defaultSpeed : 5,
    skierSpeed : 5,
    skierLevel : 1,
    scorePerLevel : 4000,
    skierScore : 0,
    scoreForChase : 8000,
    showRhino : true,
    oldDirection : 1,


    rhinoSpeed : 5,
    rhinoMapX : 0,
    rhinoMapY : 0,
    rhinoRadius :0,
    rhinoAttack : false,
    rhinoDirection : 0,
    rhinoSkierCollide : 0,
    rhinoCenterCoordinates:{ x: 0, y: 0 },

    maxCollisions : 3,
    livesCount : 3,
    gamePaused : false,
    scoreItem : "",

    hasMoved : false,
    skierCanMove : true,
    skierJumping : false,
    skierJumpingCount : 0,
    rMove:0,

    obstacleTypes :[
        'tree',
        'treeCluster',
        'rock1',
        'rock2'
    ],

    obstacles :[],
    gameEnded: false
};

var gameControl = function () {
    startGame = function () {
        console.log("startGame Wow")
       
        skifree()

        console.log("startGame End")
    }

    return {startGame}
}

var gameHtml = function () {
    var canvas = $('<canvas></canvas>')
        .attr('width', gameSetting.gameWidth * window.devicePixelRatio)
        .attr('height', gameSetting.gameHeight * window.devicePixelRatio)
        .css({
            width: gameSetting.gameWidth + 'px',
            height: gameSetting.gameHeight + 'px',
            border: 'solid 2px #ddd',
            float: 'left'
        });

    var details = $('<div></div>')
        .attr("id", "details")
        .css({
            width: (0.18 * window.innerWidth) + 'px',
            height: gameSetting.gameHeight,
            float: 'right'
        }).append($("<div>Scores : <span></span></div>").attr("id", "scores"))
        .append($("<div>Speed : <span></span></div>").attr("id", "speed"))
        .append($("<div>Level : <span></span></div>").attr("id", "level"))
        .append($("<div>No of Lives : <span></span></div>").attr("id", "collisions"))
        .append($("<div>Status : <span></span></div>").attr("id", "status"))
        .append($("<div><em>* Down Arrow key to move down or start the game<br />* F key to move the skier faster increases the speed by 1.<br />* D key to move the skier slower decreases the speed by 1<br />* J key to jump<br />* R key to Reset/Restart the game <br />* Space bar for pause or resume game</em></div>").attr("id", "status"))
        
        
        .append($("<div><br /><br /><h3>Top Scores</h3><ol></ol></div>").attr("id", "topscores"));

        return {canvas, details}
}