
var rhinoActions = function(gameSetting){

    var rhinoChase = function (skierScore,scoreForChase) {
        gameSetting.rhinoSpeed = gameSetting.skierSpeed;
        gameSetting.rhinoAttack = false;
        if (skierScore >= scoreForChase) {
            gameSetting.rhinoAttack = true;
        }

        return {attack: gameSetting.rhinoAttack, speed : gameSetting.rhinoSpeed};
    }

    var rhinoEating = function (eatingCount) {
        eat = 1;
        if (eatingCount <= 10) {
            eat = 1;
        }
        else if (eatingCount <= 20) {
            eat = 2;
        }

        else if (eatingCount <= 30) {
            eat = 3;
        }

        else if (eatingCount <= 40) {
            eat = 4;
        }
        else if (eatingCount > 40) {
            eat = 5;
        }

        return eat;

    }


    return {rhinoChase, rhinoEating}
}
var rhinoItem = function(gameSetting,canvas,ctx, assets,collision){
    var move = function () {

        if (!gameSetting.showRhino || gameSetting.gamePaused || !gameSetting.rhinoAttack)
            return;

            
        if (gameSetting.rhinoSkierCollide > 0) {
            eatValue = rhinoEating(gameSetting.rhinoSkierCollide);
            gameSetting.rhinoDirection = 6 + eatValue;
            if (eatValue > 4) {
               gameSetting.gameEnded=true;
            }
        }
        else if (gameSetting.rhinoDirection !== 0) {
            var collided = collision.rhinoSkierCollide();
            if (collided) {
                gameSetting.rhinoDirection = 5;
            } else {
                gameSetting.rhinoDirection = skierDirection;
            }
        }

        switch (gameSetting.rhinoDirection) {
            case 0:
            if (gameSetting.rMove <= 1) {
                gameSetting.rhinoRadius = (gameSetting.gameWidth/4)+(gameSetting.defaultSpeed*5);
                rhinoCenterCoordinates = {y:gameSetting.skY-gameSetting.rhinoRadius, x:gameSetting.skX}
                gameSetting.rhinoMapX= rhinoCenterCoordinates.x+gameSetting.rhinoRadius;
                var posRhino = rhinoPosition(gameSetting.rhinoMapX,gameSetting.rhinoCenterCoordinates,gameSetting.rhinoRadius,
                    gameSetting.skierSpeed)
                gameSetting.rhinoMapY = posRhino.y;
            } else {
                if (gameSetting.rhinoMapX < gameSetting.skX) {
                    gameSetting.rhinoMapX -= gameSetting.skX;
                    gameSetting.rhinoSkierCollide = 1;

                    gameSetting.skierCanMove = false;
                }else{
                    var posRhino = rhinoPosition(gameSetting.rhinoMapX,gameSetting.rhinoCenterCoordinates,gameSetting.rhinoRadius,gameSetting.skierSpeed)
                    gameSetting.rhinoMapY = posRhino.y;
                    gameSetting.rhinoMapX = posRhino.x;
                }
            }
            case 1:
                gameSetting.rhinoMapX -= gameSetting.rhinoSpeed;
                break;
            case 2:
                gameSetting.rhinoMapX -= Math.round(gameSetting.rhinoSpeed / 1.4142);
                gameSetting.rhinoMapY += Math.round(gameSetting.rhinoSpeed / 1.4142);
                break;
            case 3:
                gameSetting.rhinoMapY += gameSetting.rhinoSpeed;
                break;
            case 4:
                gameSetting.rhinoMapX += gameSetting.rhinoSpeed / 1.4142;
                gameSetting.rhinoMapY += gameSetting.rhinoSpeed / 1.4142;
                break;
            case 5:

            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                //Collide NO movement
                gameSetting.rhinoMapX = gameSetting.skX + 8;
                gameSetting.rhinoMapY = gameSetting.skY;
                break;
        }
        gameSetting.rMove++;

    }

    var rhinoPosition =function(x,centerxy,radius, speed){
        x-=speed;
        y = Math.sqrt(Math.pow(radius,2) - Math.pow(x-centerxy.x,2)) +centerxy.y
        console.log("RHino Pos : {"+x+","+y+"}");
        return {x,y};
    }
    var rhinoEating = function (eatingCount) {
        eat = 1;
        if (eatingCount <= 10) {
            eat = 1;
        }
        else if (eatingCount <= 20) {
            eat = 2;
        }

        else if (eatingCount <= 30) {
            eat = 3;
        }

        else if (eatingCount <= 40) {
            eat = 4;
        }
        else if (eatingCount > 40) {
            eat = 5;
        }

        return eat;

    }

    

    draw = function () {
        if (!gameSetting.rhinoAttack)
            return;

        var skierAssetName = assets.getRhinoAsset(gameSetting.rhinoDirection);
        var skierImage = assets.loadedAssets[skierAssetName];
        ctx.drawImage(skierImage, gameSetting.rhinoMapX, gameSetting.rhinoMapY, skierImage.width, skierImage.height);
    }

    var getRhinoRect = function (rhinoImage) {
        rhino = {
            left: rhinoImage.x,
            right: rhinoImage.x + rhinoImage.width,
            top: rhinoImage.y + rhinoImage.height - 5,
            bottom: rhinoImage.y + rhinoImage.height
        };
    }

    var rhinoPosition =function(x,centerxy,radius, speed){
        x-=speed;
        y = Math.sqrt(Math.pow(radius,2) - Math.pow(x-centerxy.x,2)) +centerxy.y
        console.log("RHino Pos : {"+x+","+y+"}");
        return {x,y};
    }

    var moveRhino = function () {
        if (!gameSetting.showRhino || gameSetting.gamePaused || !gameSetting.rhinoAttack)
            return;

        if (gameSetting.rhinoSkierCollide > 0) {
            eatValue = rhinoEating(gameSetting.rhinoSkierCollide);
            gameSetting.rhinoDirection = 6 + eatValue;
            if (eatValue > 4) {
                gameSetting.gameEnded;
            }
        }
        else if (gameSetting.rhinoDirection !== 0) {

            var collided = collision.rhinoSkierCollide();
            if (collided) {
                gameSetting.rhinoDirection = 5;
            } else {
                gameSetting.rhinoDirection = gameSetting.skierDirection;
            }

        }

        switch (gameSetting.rhinoDirection) {
            case 0:
                if (rMove <= 1) {
                    gameSetting.rhinoMapY = skY;
                    gameSetting.rhinoMapX = skX + Math.floor(gameWidth / 4);
                } else {
                    if (gameSetting.rhinoMapX < skX) {
                        gameSetting.rhinoMapX -= skX;
                        gameSetting.rhinoSkierCollide = 1;

                        gameSetting.skierCanMove = false;
                    }
                }
            case 1:
            gameSetting.rhinoMapX -= gameSetting.rhinoSpeed;
                break;
            case 2:
            gameSetting.rhinoMapX -= Math.round(gameSetting.rhinoSpeed / 1.4142);
            gameSetting.rhinoMapY += Math.round(gameSetting.rhinoSpeed / 1.4142);
                break;
            case 3:
            gameSetting.rhinoMapY += rhinoSpeed;
                break;
            case 4:
            gameSetting.rhinoMapX += gameSetting.rhinoSpeed / 1.4142;
            gameSetting.rhinoMapY += rgameSetting.hinoSpeed / 1.4142;
                break;
            case 5:

            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                //Collide NO movement
                gameSetting.rhinoMapX = gameSetting.skX + 8;
                gameSetting.rhinoMapY = gameSetting.skY;
                break;
        }
        rMove++;

    }

    return {moveRhino,getRhinoRect, draw, rhinoEating,move, rhinoPosition};


}

