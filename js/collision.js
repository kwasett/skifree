
var collisions= function(gameSetting,assets,scorecalc){
    var rhinoSkierCollide = function () {
        if (gameSetting.rhinoSkierCollide > 0)
            return rhinoSkierCollide;
        var skierImage = assets.getSkierImage(gameSetting.skierDirection);
        var skierRect = getSkierRect(skierImage);

        var rhinoImage = getRhinoAsset(gameSetting.rhinoDirection);
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

        var collision = _.find(obstacles, function (obstacle) {
            var obstacleImage = assets.loadedAssets[obstacle.type];
            var obstacleRect = {
                left: obstacle.x,
                right: obstacle.x + obstacleImage.width,
                top: obstacle.y + obstacleImage.height - 5,
                bottom: obstacle.y + obstacleImage.height
            };

            return intersectRect(skierRect, obstacleRect);
        });

        if (collision) {
            if (gameSetting.skierDirection !== 0) {
                gameSetting.livesCount--;
                scorecalc.addScore(actionScores["collide"]);
                if (livesCount <= 0) {
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


    return{rhinoSkierCollide,skierHitObstacle,intersectRect}
}