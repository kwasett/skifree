/**
 * Speed functions
 * @param {*} gameSetting 
 */
var speedSetting = function (gameSetting) {
    /**
     * Increase the speed for the skier
     */
    var increaseSpeed = function(speed=1){
        gameSetting.skierSpeed+=speed;
    }

    /**
     * Decrease the speed of the skier. 
     */
    var decreaseSpeed = function(speed=1){
        gameSetting.skierSpeed-=speed;
        //if reduced below the defaultspeed set to defaultspeed
        if(gameSetting.skierSpeed<gameSetting.defaultSpeed)
            gameSetting.skierSpeed= gameSetting.defaultSpeed;
    }

    return {increaseSpeed, decreaseSpeed}
}