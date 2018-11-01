//rhino control action
var rhinoActions = function(gameSetting){

    //function determines whether its time to have a rhino chase
    var rhinoChase = function (skierScore,scoreForChase) {

        gameSetting.rhinoSpeed = gameSetting.skierSpeed;
        gameSetting.rhinoAttack = false;
        //checks if scores for chase is less than skierScore begin to attack
        if (skierScore >= scoreForChase) {
            gameSetting.rhinoAttack = true;
        }

        return {attack: gameSetting.rhinoAttack, speed : gameSetting.rhinoSpeed};
    }

    //the process of eating keeping track of the count
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

//function for rhino movement and drawing
var rhinoItem = function(gameSetting,canvas,ctx, assets,collision){
    //moves the rhino per the desired rhinodirection
    var move = function () {

        //check if the move should go on, the game must not be paused, rhino should he attacking , and showRhino must be true
        if (!gameSetting.showRhino || gameSetting.gamePaused || !gameSetting.rhinoAttack)
            return;

        //check if skier rhino has already collided
        //this is to begin the rhino eating     
        if (gameSetting.rhinoSkierCollide > 0) {
            //get the right eat index image to show
            eatValue = rhinoEating(gameSetting.rhinoSkierCollide);
            gameSetting.rhinoDirection = 6 + eatValue;
            //after a eatVALUE OF over 4 we end the game as the rhino would have finished eating
            if (eatValue > 4) {
               gameSetting.gameEnded=true;
            }
        }   
        //check if there is a collision
        else if (gameSetting.rhinoDirection !== 0) {
            var collided = collision.rhinoSkierCollide();
            if (collided) {
                gameSetting.rhinoDirection = 5;
            } else {
                gameSetting.rhinoDirection = gameSetting.skierDirection;
            }
        }

        //get rhino map position based on rhinoDirection
        switch (gameSetting.rhinoDirection) {
            case 0:
            //if rhino has just moved
            //calculate the radius which is gameWidth/4 +(defaultSpeed *5 )
            //the radius helps the rhino move in a semi circle
            if (gameSetting.rMove <= 1) {
                gameSetting.rhinoRadius = (gameSetting.gameWidth/4)+(gameSetting.defaultSpeed*5);
                rhinoCenterCoordinates = {y:gameSetting.skY-gameSetting.rhinoRadius, x:gameSetting.skX}
                gameSetting.rhinoMapX= rhinoCenterCoordinates.x+gameSetting.rhinoRadius;
                var posRhino = rhinoPosition(gameSetting.rhinoMapX,gameSetting.rhinoCenterCoordinates,gameSetting.rhinoRadius,
                    gameSetting.skierSpeed)
                gameSetting.rhinoMapY = posRhino.y;
            } else {
                //check if it has already moved before
                //check collision
                if (gameSetting.rhinoMapX < gameSetting.skX) {
                    gameSetting.rhinoMapX -= gameSetting.skX;
                    gameSetting.rhinoSkierCollide = 1;

                    gameSetting.skierCanMove = false;
                }else{
                    //get rhino position
                    var posRhino = rhinoPosition(gameSetting.rhinoMapX,gameSetting.rhinoCenterCoordinates,gameSetting.rhinoRadius,gameSetting.skierSpeed)
                    gameSetting.rhinoMapY = posRhino.y;
                    gameSetting.rhinoMapX = posRhino.x;
                }
            }
            case 1: 
            case 2:
            case 3:
            case 4:
              
                var posRhino = rhinoPosition(gameSetting.rhinoMapX,gameSetting.rhinoCenterCoordinates,gameSetting.rhinoRadius,gameSetting.skierSpeed)
                    gameSetting.rhinoMapY = posRhino.y;
                    gameSetting.rhinoMapX = posRhino.x;
                break
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


    //position of a rhino it uses a semi circle
    var rhinoPosition =function(x,centerxy,radius, speed){
        x-=speed;
        y = Math.sqrt(Math.pow(radius,2) - Math.pow(x-centerxy.x,2)) +centerxy.y
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

    

    //draws a skier on the vanvas
    draw = function () {
        if (!gameSetting.rhinoAttack)
            return;

        var skierAssetName = assets.getRhinoAsset(gameSetting.rhinoDirection);
        var skierImage = assets.loadedAssets[skierAssetName];
        ctx.drawImage(skierImage, gameSetting.rhinoMapX, gameSetting.rhinoMapY, skierImage.width, skierImage.height);
    }

    //the rhino rectangle
    var getRhinoRect = function (rhinoImage) {
        rhino = {
            left: rhinoImage.x,
            right: rhinoImage.x + rhinoImage.width,
            top: rhinoImage.y + rhinoImage.height - 5,
            bottom: rhinoImage.y + rhinoImage.height
        };
    }

    //get the rhino position
    var rhinoPosition =function(x,centerxy,radius, speed){
        x-=speed;
        y = Math.sqrt(Math.pow(radius,2) - Math.pow(x-centerxy.x,2)) +centerxy.y
        console.log("RHino Pos : {"+x+","+y+"}");
        return {x,y};
    }


    return {getRhinoRect, draw, rhinoEating,move, rhinoPosition};


}

