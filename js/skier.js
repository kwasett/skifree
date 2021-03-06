/**
 * skier function
 * @param {*} gameSetting 
 * @param {*} ctx 
 * @param {*} asset 
 * @param {*} jump 
 * @param {*} obstacle 
 * @param {*} scoreCal 
 */
var skierItem = function (gameSetting, ctx, asset, jump, obstacle,scoreCal) {
    /**
     * get the rectangle area occupied by the skier
     * @param {*} skierImage 
     */
    var getRect = function (skierImage) {
        return {
            left: gameSetting.skierMapX + gameSetting.gameWidth / 2,
            right: gameSetting.skierMapX + skierImage.width + gameSetting.gameWidth / 2,
            top: gameSetting.skierMapY + skierImage.height - 5 + gameSetting.gameHeight / 2,
            bottom: gameSetting.skierMapY + skierImage.height + gameSetting.gameHeight / 2
        };
    }


    
    /**
     * draws a skier per the direction
     */
    var draw = function () {
        var skierAssetName = asset.getSkierAsset(gameSetting.skierDirection);
        var skierImage = asset.loadedAssets[skierAssetName];
        var x = (gameSetting.gameWidth - skierImage.width) / 2;
        var y = (gameSetting.gameHeight - skierImage.height) / 2;
        //if jumping get coordinates from jump
        if (gameSetting.skierJumping) {
            var xy = jump.coordinate(gameSetting.skierJumpingCount, skierImage.width / 2, x, y)
            gameSetting.skX = xy.x;
            gameSetting.skY = xy.y;
        } else {
            gameSetting.skX = x;
            gameSetting.skY = y;
        }
        ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);

    };


  
    /**
     * moves the skier
     */
    var move = function () {
        //check if the skiercan move and game is not paused
        if (gameSetting.gamePaused || !gameSetting.skierCanMove)
            return;
        var oldx = gameSetting.skierMapX, oldy = gameSetting.skierMapY;
        switch (gameSetting.skierDirection) {
            case 1:
                gameSetting.skierMapX -= gameSetting.skierSpeed;

                obstacle.placeNewObstacle(gameSetting.skierDirection);
                break;
            case 2:
                gameSetting.skierMapX -= Math.round(gameSetting.skierSpeed / 1.4142);
                gameSetting.skierMapY += Math.round(gameSetting.skierSpeed / 1.4142);

                obstacle.placeNewObstacle(gameSetting.skierDirection);
                break;
            case 3:
                gameSetting.skierMapY += gameSetting.skierSpeed;

                obstacle.placeNewObstacle(gameSetting.skierDirection);
                break;
            case 4:
                gameSetting.skierMapX += gameSetting.skierSpeed / 1.4142;
                gameSetting.skierMapY += gameSetting.skierSpeed / 1.4142;

                obstacle.placeNewObstacle(gameSetting.skierDirection);
                break;
            case 6:

                var xy = jump.coordinate(gameSetting.skierJumpingCount, 16, gameSetting.skierMapX, gameSetting.skierMapY)
                gameSetting.skierMapX = xy.x;
                gameSetting.skierMapY = xy.y;

                obstacle.placeNewObstacle(gameSetting.skierDirection);
                break;
        }

        skierMoved(oldx, oldy);

    };


    /**
     * checks if the skier has moved or at the same position to help in calculating scores
     * @param {number} oldX 
     * @param {number} oldY 
     */
    var skierMoved = function (oldX, oldY) {

        scoreItem = "";
        if (oldX === gameSetting.skierMapX && oldY === gameSetting.skierMapY) {
            gameSetting.hasMoved = false;
        } else {
            gameSetting.scoreItem = "move";
            gameSetting.hasMoved = true;
            scoreCal.calculateScore("move");
        }
    }
    

    return {getRect,draw,move,skierMoved}
}