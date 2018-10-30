var obstacles = function(ctx,gameSetting,asset){

    var obstacleTypes = [
        'tree',
        'treeCluster',
        'rock1',
        'rock2'
    ];

    var obstacles = [];

    var reset = function(){
        obstacles = [];
    }

    var drawObstacles = function () {
        var newObstacles = [];

        _.each(obstacles, function (obstacle) {
            var obstacleImage = asset.loadedAssets[obstacle.type];
            var x = obstacle.x - gameSetting.skierMapX - obstacleImage.width / 2;
            var y = obstacle.y - gameSetting.skierMapY - obstacleImage.height / 2;

            if (x < -100 || x > gameSetting.gameWidth + 50 || y < -100 || y > gameSetting.gameHeight + 50) {
                return;
            }

            ctx.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);

            newObstacles.push(obstacle);
        });

        obstacles = newObstacles;
    };

    var placeInitialObstacles = function () {
        var numberObstacles = Math.ceil(_.random(5, 7) * (gameSetting.gameWidth / 800) * (gameSetting.gameHeight / 500));

        var minX = -50;
        var maxX = gameSetting.gameWidth + 50;
        var minY = gameSetting.gameHeight / 2 + 100;
        var maxY = gameSetting.gameHeight + 50;

        for (var i = 0; i < numberObstacles; i++) {
            placeRandomObstacle(minX, maxX, minY, maxY);
        }

        obstacles = _.sortBy(obstacles, function (obstacle) {
            var obstacleImage = asset.loadedAssets[obstacle.type];
            return obstacle.y + obstacleImage.height;
        });
    };

    var placeNewObstacle = function (direction) {
        var shouldPlaceObstacle = _.random(1, 8);
        if (shouldPlaceObstacle !== 8) {
            return;
        }
        var leftEdge = gameSetting.skierMapX;
        var rightEdge = gameSetting.skierMapX + gameSetting.gameWidth;
        var topEdge = gameSetting.skierMapY;
        var bottomEdge = gameSetting.skierMapY + gameSetting.gameHeight;

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

    return {reset,drawObstacles, placeInitialObstacles, placeNewObstacle, placeRandomObstacle, calculateOpenPosition, obstacles};
}