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
    scoreForChase : 5000,
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