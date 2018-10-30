
var collisions= function(gameSetting,assets,scorecalc,obstacleItem){
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

    var skierHitObstacle = function () {
        var skierAssetName = assets.getSkierAsset(gameSetting.skierDirection);

        var skierImage = assets.loadedAssets[skierAssetName];


        var skierRect = {
            left: gameSetting.skierMapX + gameSetting.gameWidth / 2,
            right: gameSetting.skierMapX + skierImage.width + gameSetting.gameWidth / 2,
            top: gameSetting.skierMapY + skierImage.height - 5 + gameSetting.gameHeight / 2,
            bottom: gameSetting.skierMapY + skierImage.height + gameSetting.gameHeight / 2
        };



       
        var collision = _.find(obstacleItem.obstacles, function (obstacle) {
            var obstacleImage = assets.loadedAssets[obstacle.type];
            var obstacleRect = {
                left: obstacle.x,
                right: obstacle.x + obstacleImage.width,
                top: obstacle.y + obstacleImage.height - 5,
                bottom: obstacle.y + obstacleImage.height
            };


            console.log("skierRect : "+JSON.stringify(skierRect));
            console.log("obstacleRect : "+JSON.stringify(obstacleRect));

            return intersectRect(skierRect, obstacleRect);
        });

        if (collision) {
            if (gameSetting.skierDirection !== 0) {
                gameSetting.livesCount--;
                scorecalc.addMoveScore("collide");
                if (gameSetting.livesCount <= 0) {
                    console.log("Reached Max Collission")
                    //gameSetting.endGame()
                    gameSetting.gameEnded = true;
                }
            }
            gameSetting.skierDirection = 0;
        }
    };

    var intersectRect = function (r1, r2) {
        return !(r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
    };


    var getSkierRect = function (skierImage) {
        return {
            left: gameSetting.rskierMapX + gameSetting.gameWidth / 2,
            right: gameSetting.rskierMapX + skierImage.width + gameSetting.gameWidth / 2,
            top: gameSetting.rskierMapY + skierImage.height - 5 + gameSetting.gameHeight / 2,
            bottom: gameSetting.rskierMapY + skierImage.height + gameSetting.gameHeight / 2
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

    return{rhinoSkierCollide,skierHitObstacle,intersectRect}
}