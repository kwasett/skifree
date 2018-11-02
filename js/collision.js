
/**
 * Collision function
 * @param {*} gameSetting 
 * @param {*} assets 
 * @param {*} scorecalc 
 * @param {*} obstacleItem 
 */
var collisions= function(gameSetting,assets,scorecalc,obstacleItem){
    /**
     * Check if skier and rhino colloded
     */
    var rhinoSkierCollide = function () {
        if (gameSetting.rhinoSkierCollide > 0)
            return rhinoSkierCollide;
        var skierImage = assets.getSkierImage(gameSetting.skierDirection);
        var skierRect = getSkierRect(skierImage);

        var rhinoImage = assets.getRhinoAsset(gameSetting.rhinoDirection);
        var rhonoRec = getRhinoRect(rhinoImage);
        var collision = intersectRect(skierRect, rhonoRec);
        if (collision) {
            gameSetting.rhinoSkierCollide = 1;
            gameSetting.skierCanMove = false;
        }
        return collision;
    }

    /**
     * ckecks if the skier collides with an obstacle
     */
    var skierHitObstacle = function () {
        var skierAssetName = assets.getSkierAsset(gameSetting.skierDirection);

        var skierImage = assets.loadedAssets[skierAssetName];

        //the rrectangle areas occupied by the skier
        var skierRect = {
            left: gameSetting.skierMapX + gameSetting.gameWidth / 2,
            right: gameSetting.skierMapX + skierImage.width + gameSetting.gameWidth / 2,
            top: gameSetting.skierMapY + skierImage.height - 5 + gameSetting.gameHeight / 2,
            bottom: gameSetting.skierMapY + skierImage.height + gameSetting.gameHeight / 2
        };

        var collision = _.find(gameSetting.obstacles, function (obstacle) {
            var obstacleImage = assets.loadedAssets[obstacle.type];
            //rectangle area occupied by the obstale
            var obstacleRect = {
                left: obstacle.x,
                right: obstacle.x + obstacleImage.width,
                top: obstacle.y + obstacleImage.height - 5,
                bottom: obstacle.y + obstacleImage.height
            };

            //check  if the 2 rectangles intersect
            return intersectRect(skierRect, obstacleRect);
        });

        //if collison is found it would not be null
        if (collision) {
            //If collison check the direction and 
            //Reduce the number of lives
            //deduct collision from the scores
            if (gameSetting.skierDirection !== 0) {
                gameSetting.livesCount--;
                scorecalc.addMoveScore("collide");

                //If lives is less than 0 end game
                if (gameSetting.livesCount <= 0) {
                    gameSetting.gameEnded = true;
                }
            }


            //Default directio
            gameSetting.skierDirection = 0;
        }
    };

    /**
 * checks if the  2 items intersects
     * @param {*} r1 
     * @param {*} r2 
     */
    var intersectRect = function (r1, r2) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };


    /**
     * get the rectangular  a skier occupies
     * @param {*} skierImage 
     */
    var getSkierRect = function (skierImage) {
        return {
            left: gameSetting.rskierMapX + gameSetting.gameWidth / 2,
            right: gameSetting.rskierMapX + skierImage.width + gameSetting.gameWidth / 2,
            top: gameSetting.rskierMapY + skierImage.height - 5 + gameSetting.gameHeight / 2,
            bottom: gameSetting.rskierMapY + skierImage.height + gameSetting.gameHeight / 2
        };
    }

        //Returns the rhino reactangle given a rhino image
        /**
         * 
         * @param {*} rhinoImage 
         */
    var getRhinoRect = function (rhinoImage) {
        rhino = {
            left: rhinoImage.x,
            right: rhinoImage.x + rhinoImage.width,
            top: rhinoImage.y + rhinoImage.height - 5,
            bottom: rhinoImage.y + rhinoImage.height
        };
    }

    return{rhinoSkierCollide,skierHitObstacle,intersectRect}
}